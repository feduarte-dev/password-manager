import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';

function App() {
  const [showForm, setShowForm] = useState(false);
  function formStatusTrue() {
    setShowForm(true);
  }
  function formStatusFalse() {
    setShowForm(false);
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
// Por que o onChange nao funcionou no buttonEnable do Form.tsx
