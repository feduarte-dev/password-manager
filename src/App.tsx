import './App.css';
import { useState } from 'react';
import { FormStatusType } from './types';
import Header from './components/Header';
import Form from './components/Form';
import ServiceList from './components/ServiceList';

function App() {
  const [serviceList, setServiceList] = useState<FormStatusType[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

  function formStatus() {
    return showForm ? setShowForm(false) : setShowForm(true);
  }

  const handleSubmit = (formValues: FormStatusType): void => {
    setServiceList([
      ...serviceList,
      formValues,
    ]);
  };

  function handleDelete(event: any): void {
    const newServiceList = serviceList
      .filter((service) => service.serviceName !== event.target.id);
    setServiceList(newServiceList);
  }

  return (
    <>
      <Header />
      {showForm ? <Form
        formStatus={ () => formStatus() }
        handleSubmit={ handleSubmit }
      />
        : <button onClick={ formStatus }>Cadastrar nova senha</button>}

      {serviceList.length === 0 && <h2>Nenhuma senha cadastrada</h2>}
      <ServiceList
        serviceList={ serviceList }
        handleDelete={ (event) => handleDelete(event) }
      />

    </>
  );
}

export default App;
// erro de tipagem no id (linha 23)
// sou obrigado a fazer funcao anonima e usar parentesis (linha 121 do form)
// Arrumar tipagem serviceList (linha 6)
