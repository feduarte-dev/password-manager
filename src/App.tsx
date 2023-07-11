import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Form from './components/Form';

function App() {
  const [productList, setproductList] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  function formStatus() {
    return showForm ? setShowForm(false) : setShowForm(true);
  }

  const handleSubmit = (formValues: any): void => {
    setproductList([
      ...productList,
      formValues,
    ]);
    console.log(productList);
  };
  function handleDelete(e:any):void {
    const newList = productList.filter((product) => product.serviceName !== e.target.id);
    setproductList(newList);
    console.log(e.target.id);
  }
  const [isChecked, setisChecked] = useState(false);
  function checkChange() {
    return isChecked ? setisChecked(false) : setisChecked(true);
  }

  return (
    <div>

      <Header />
      {showForm ? <Form
        formStatus={ () => formStatus() }
        handleSubmit={ handleSubmit }
      />
        : <button onClick={ formStatus }>Cadastrar nova senha</button>}

      {productList.length === 0 && <h2>Nenhuma senha cadastrada</h2>}
      {productList.map((item) => (
        <div key={ item.serviceName }>
          <a href={ item.url }>{item.serviceName}</a>
          <p>{item.login}</p>
          {isChecked ? <p>******</p> : <p>{item.password}</p>}

          <button
            id={ item.serviceName }
            onClick={ (e) => handleDelete(e) }
            data-testid="remove-btn"
          >
            x

          </button>
        </div>
      ))}
      <label>
        Esconder senhas
        <input
          type="checkbox"
          name="showPass"
          id="showPass"
          onChange={ checkChange }
        />
      </label>
    </div>

  );
}

export default App;
// Corrigir o tipo do formStatus
// Por que o onChange nao funcionou no buttonEnable do Form.tsx
// Na primeira vez que adicionou item a lista, nao aparece renderizado
