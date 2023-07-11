import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';

function App() {
  const [showForm, setshowForm] = useState(false);
  function formStatusTrue() {
    setshowForm(true);
  }
  function formStatusFalse() {
    setshowForm(false);
  }
  return (
    <>
      <Header />
      {showForm ? <Form formStatus={ () => formStatusFalse() } />
        : <button onClick={ formStatusTrue }>Cadastrar nova senha</button>}
    </>

  );
}

export default App;
// Corrigir o tipo do formStatus
