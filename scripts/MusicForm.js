import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import Piano from 'react-piano';
import 'react-piano/dist/styles.css';
import Soundfont from 'soundfont-player'; // Biblioteca para reprodução de áudio

const { TextArea } = Input;
const { Option } = Select;

// Defina as notas que o teclado virtual exibirá
const noteRange = {
  first: Piano.MidiNumbers.fromNote('c3'),
  last: Piano.MidiNumbers.fromNote('c5'),
};

// Mapeie as notas do seu backend para números MIDI
const noteMapping = {
  'C': Piano.MidiNumbers.fromNote('c4'),
  'D': Piano.MidiNumbers.fromNote('d4'),
  'E': Piano.MidiNumbers.fromNote('e4'),
  'F': Piano.MidiNumbers.fromNote('f4'),
  'G': Piano.MidiNumbers.fromNote('g4'),
  'A': Piano.MidiNumbers.fromNote('a4'),
  'B': Piano.MidiNumbers.fromNote('b4'),
  'c': Piano.MidiNumbers.fromNote('c3'), // Para notas graves no estilo gregoriano
  'd': Piano.MidiNumbers.fromNote('d3'),
  'e': Piano.MidiNumbers.fromNote('e3'),
  'f': Piano.MidiNumbers.fromNote('f3'),
  'g': Piano.MidiNumbers.fromNote('g3'),
  'a': Piano.MidiNumbers.fromNote('a3'),
  'b': Piano.MidiNumbers.fromNote('b3'),
};

function MusicForm() {
    const [letra, setLetra] = useState('');
    const [estilo, setEstilo] = useState('gregoriano');
    const [melodia, setMelodia] = useState([]); // Estado para armazenar a melodia gerada
    const [acordes, setAcordes] = useState([]); // Estado para armazenar os acordes gerados
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
    const [bpm, setBpm] = useState(120); // Estado para o BPM (opcional)
    const [instrument, setInstrument] = useState(null); // Para o Soundfont player

    useEffect(() => {
      // Carregar o instrumento Soundfont (opcional)
      Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano') // Ou outro instrumento
        .then((instr) => setInstrument(instr))
        .catch((error) => console.error('Erro ao carregar instrumento:', error));
  
      return () => {
        if (instrument) {
          instrument.stop(); // Parar o instrumento ao desmontar o componente
        }
      };
    }, []);
  
    useEffect(() => {
      // Lógica para tocar a melodia automaticamente
      let intervalId;
      if (isPlaying && melodia.length > 0 && instrument) {
        intervalId = setInterval(() => {
          if (currentNoteIndex < melodia.length) {
            const [nota, duracao] = melodia[currentNoteIndex];
            const noteMidi = noteMapping[nota];
            instrument.play(noteMidi).stop(60 / bpm * duracao); // Reproduzir a nota
            setCurrentNoteIndex(currentNoteIndex + 1);
          } else {
            setIsPlaying(false);
            setCurrentNoteIndex(0);
            clearInterval(intervalId);
          }
        }, 60000 / bpm * 4); // Intervalo baseado no BPM e na duração das notas (semibreve = 4 tempos)
      }
  
      return () => clearInterval(intervalId);
    }, [isPlaying, currentNoteIndex, melodia, bpm, instrument]);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('/generate-music', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ letra, estilo }),
          });
    
          if (response.ok) {
            const data = await response.json();
            setMelodia(data.melodia);
            setAcordes(data.acordes);
    
            // Update bpm if it's in the response
            if (data.bpm) {
              setBpm(data.bpm);
            }
    
            console.log('Melodia:', melodia);
            console.log('Acordes:', acordes);
    
            setIsPlaying(false);
            setCurrentNoteIndex(0);
    
            // (Optional) Auto-play after generation
            // setIsPlaying(true); 
          } else {
            // Handle server errors with user-friendly messages
            const errorData = await response.json();
            message.error(errorData.detail || 'Erro ao gerar música. Por favor, tente novamente.'); 
          }
        } catch (error) {
          // Handle network or other request errors with user-friendly messages
          console.error('Erro na requisição:', error);
          message.error('Erro na requisição. Verifique sua conexão com a internet.'); 
        }
      };
    
      const handlePlay = () => {
        setIsPlaying(true);
      };
    
      const handleStop = () => {
        setIsPlaying(false);
        setCurrentNoteIndex(0);
      };

    const activeNotes = isPlaying ? [noteMapping[melodia[currentNoteIndex][0]]] : [];
  
    // Create a ref to store the Soundfont instance
    const soundfontPlayer = useRef(null);
  
    useEffect(() => {
      // Load the Soundfont instrument when the component mounts
      Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano')
        .then(instrument => {
          setInstrument(instrument);
          soundfontPlayer.current = instrument; // Store the instrument in the ref
        })
        .catch(error => console.error('Error loading instrument:', error));
  
      // Cleanup: Stop the instrument when the component unmounts
      return () => {
        if (soundfontPlayer.current) {
          soundfontPlayer.current.stop();
        }
      };
    }, []);
  
    useEffect(() => {
      // Play the melody when isPlaying is true
      if (isPlaying && melodia.length > 0 && soundfontPlayer.current) {
        const playMelody = async () => {
          for (let i = 0; i < melodia.length; i++) {
            if (!isPlaying) break; // Stop if isPlaying becomes false
  
            const [nota, duracao] = melodia[i];
            const noteMidi = noteMapping[nota];
            setActiveNotes([noteMidi]); // Highlight the current note on the piano
  
            await soundfontPlayer.current.play(noteMidi).stop(60 / bpm * duracao); // Play the note
  
            setActiveNotes([]); // Clear the active notes after the note is played
          }
  
          setIsPlaying(false);
          setCurrentNoteIndex(0);
        };
  
        playMelody();
      }
    }, [isPlaying, melodia, bpm, soundfontPlayer]);
    

  return (
    <Form onSubmit={handleSubmit} layout="vertical"> {/* Layout vertical para melhor organização */}
      <Form.Item label="Letra da Música" required>
        <TextArea rows={4} value={letra} onChange={(e) => setLetra(e.target.value)} />
      </Form.Item>

      <Form.Item label="Estilo Musical" required>
        <Select value={estilo} onChange={(value) => setEstilo(value)}>
          <Option value="gregoriano">Gregoriano</Option>
          {/* Adicione mais opções de estilo conforme necessário */}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Gerar Música
        </Button>
      </Form.Item>

      <Piano
        noteRange={noteRange}
        width={600}
        playNote={(midiNumber) => {
          if (soundfontPlayer.current) {
            soundfontPlayer.current.play(midiNumber);
          }
        }}
        stopNote={(midiNumber) => {
          if (soundfontPlayer.current) {
            soundfontPlayer.current.stop(midiNumber);
          }
        }}
        activeNotes={activeNotes}
      />

      <Button type="primary" onClick={handlePlay} disabled={isPlaying || melodia.length === 0}>
        Tocar
      </Button>
      <Button onClick={handleStop} disabled={!isPlaying}>
        Parar
      </Button>
    </Form>
  );
}

export default MusicForm;