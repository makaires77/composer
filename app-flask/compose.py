import random
from mingus.containers import Track, Bar, Note
from mingus.midi import fluidsynth
from mingus.core import chords, progressions
import subprocess  # Para executar o Lilypond
import librosa
import librosa.display
import matplotlib.pyplot as plt
from py2neo import Graph


def criar_melodia(letra, estilo):
    """
    Cria uma representação simplificada de uma melodia baseada na letra e no estilo.

    Args:
        letra: A letra da música.
        estilo: Uma string representando o estilo desejado (ex: 'gregoriano').

    Returns:
        Uma lista de notas musicais (representadas por strings) e suas durações relativas.
    """

    notas = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    duracoes = [4, 2, 1]  # Durações relativas (semibreve, mínima, semínima)

    melodia = []
    for palavra in letra.split():
        nota = random.choice(notas)
        duracao = random.choice(duracoes)
        melodia.append((nota, duracao))

    if estilo == 'gregoriano':
        melodia = [(nota.lower(), duracao * 2) for nota, duracao in melodia]

    return melodia

def gerar_acordes(melodia):
    """
    Gera uma progressão de acordes simples baseada na melodia.

    Args:
        melodia: A melodia gerada pela função `criar_melodia`.

    Returns:
        Uma lista de acordes (representados por strings).
    """

    acordes_basicos = ['C', 'G', 'Am', 'F']
    progressao = []
    for nota, _ in melodia:
        # Lógica simples para escolher um acorde compatível com a nota (pode ser aprimorada)
        acorde = random.choice([acorde for acorde in acordes_basicos if nota in acorde])
        progressao.append(acorde)
    return progressao

def tocar_melodia(melodia, bpm=60):
    """
    Sintetiza o áudio da melodia usando FluidSynth.

    Args:
        melodia: A melodia gerada pela função `criar_melodia`.
        bpm: O andamento da música em batidas por minuto (opcional).
    """

    fluidsynth.init('/usr/share/sounds/sf2/FluidR3_GM.sf2')  # ou outro arquivo SoundFont disponível

    t = Track()
    b = Bar()
    for nota, duracao in melodia:
        n = Note(nota)
        n.quarterLength = duracao
        b.add_notes(n)

    t.add_bar(b)
    fluidsynth.play_Track(t, bpm=bpm)

def gerar_partitura(melodia, acordes, nome_arquivo='partitura.pdf'):
    """
    Gera uma partitura em PDF usando Lilypond.

    Args:
        melodia: A melodia gerada pela função `criar_melodia`.
        acordes: A progressão de acordes gerada pela função `gerar_acordes`.
        nome_arquivo: O nome do arquivo PDF a ser gerado (opcional).
    """

    partitura = '\\version "2.20"\n\n'
    partitura += '\\score {\n'
    partitura += '  \\new PianoStaff << \n'
    partitura += '    \\new Staff { \\clef "treble" \n'

    for nota, duracao in melodia:
        partitura += f'      {nota}{duracao} '

    partitura += '\n    }\n'
    partitura += '    \\new Staff { \\clef "bass" \n'

    for acorde in acordes:
        partitura += f'      \\chordmode {{ {acorde}1 }} '

    partitura += '\n    }\n'
    partitura += '  >>\n'
    partitura += '  \\layout { }\n'
    partitura += '  \\midi { }\n'
    partitura += '}\n'

    with open('partitura.ly', 'w') as f:
        f.write(partitura)

    subprocess.call(['lilypond', '-o', nome_arquivo[:-4], 'partitura.ly'])

def analisar_audio(arquivo_audio):
    """
    Analisa um arquivo de áudio e extrai informações como tempo e chroma.

    Args:
        arquivo_audio: O caminho para o arquivo de áudio.
    """

    y, sr = librosa.load(arquivo_audio)
    tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)

    print(f"Tempo estimado: {tempo} BPM")

    # Visualizar chroma
    plt.figure(figsize=(10, 4))
    librosa.display.specshow(chroma, y_axis='chroma', x_axis='time')
    plt.colorbar()
    plt.title('Chromagram')
    plt.tight_layout()
    plt.show()

def persistir_no_neo4j(melodia, acordes):
    """
    Persiste a melodia e os acordes no banco de dados Neo4j.

    Args:
        melodia: A melodia gerada.
        acordes: Os acordes gerados.
    """

    graph = Graph("bolt://localhost:7687", auth=("neo4j", "your_password"))  # Substitua com suas credenciais

    # Construir consultas Cypher para criar nós e relações
    # (Implementação detalhada depende da sua modelagem no Neo4j)
    cypher_query = """
    // Exemplo de consulta (adapte à sua modelagem)
    CREATE (musica:Música {titulo: 'Música Gerada', compositor: 'Python Music Generator'})
    // ... criar nós para compassos, notas e acordes ...
    // ... criar relações entre os nós ...
    """

    try:
        graph.run(cypher_query)
        print("Dados persistidos no Neo4j com sucesso!")
    except Exception as e:
        print(f"Erro ao persistir no Neo4j: {e}")


def criar_musica(letra, estilo, bpm=60):
    """
    Função principal que cria a melodia, os acordes e a partitura.

    Args:
        letra: A letra da música.
        estilo: Uma string representando o estilo desejado (ex: 'gregoriano').
        bpm: O andamento da música em batidas por minuto (opcional).
    """

    melodia = criar_melodia(letra, estilo)
    acordes = gerar_acordes(melodia)
    tocar_melodia(melodia, bpm)
    gerar_partitura(melodia, acordes)

    return melodia, acordes