import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';

function App() {
  const [productList, setproductList] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  function formStatusTrue() {
    setShowForm(true);
  }
  function formStatusFalse() {
    setShowForm(false);
  }
  const handleSubmit = (formValues: any): void => {
    setproductList([
      ...productList,
      formValues,
    ]);
    console.log(productList);
  };
  return (
    <div>

      <Header />
      {showForm ? <Form
        formStatus={ () => formStatusFalse() }
        handleSubmit={ handleSubmit }
      />
        : <button onClick={ formStatusTrue }>Cadastrar nova senha</button>}

      {productList.length === 0 && <h2>Nenhuma senha cadastrada</h2>}
      {productList.map((item) => (
        <div key={ item.serviceName }>
          <a href={ item.url }>{item.serviceName}</a>
          <p>{item.login}</p>
          <p>{item.password}</p>
          <button data-testid="remove-btn">x</button>
        </div>
      ))}

    </div>
  );
}

export default App;
// Corrigir o tipo do formStatus
// Por que o onChange nao funcionou no buttonEnable do Form.tsx
// Na primeira vez que adicionou item a lista, nao aparece renderizado
