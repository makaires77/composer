import React from 'react';
import MusicForm from './components/MusicForm';
import './App.css'; // Certifique-se de que o App.css está sendo importado

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Você pode remover o logo e o link se não forem necessários */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>Compor melodia e música a partir da letra de música</h1> 
      </header>
      <MusicForm /> 
    </div>
  );
}

export default App;
