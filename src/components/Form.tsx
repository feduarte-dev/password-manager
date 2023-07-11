import { useState } from 'react';

type FormType = {
  formStatus: any
};

const INITIAL_STATE = {
  serviceName: '',
  login: '',
  password: '',
  url: '',
};
function Form({ formStatus }: FormType) {
  const [btnStatus, setBtnStatus] = useState(true);
  const [formValues, setFormValues] = useState(INITIAL_STATE);
  const { serviceName, login, password, url } = formValues;

  function handleChange(event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  function buttonEnable() {
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    if (serviceName.length > 0
        && login.length > 0
        && password.length > 8 && password.length < 16
        && /\d/.test(password)
        && specialChars.test(password)
        && password.match(/[a-zA-Z]/)) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }

  return (

    <form onKeyUpCapture={ buttonEnable }>
      <label>
        Nome do serviço
        <input
          type="text"
          name="serviceName"
          value={ serviceName }
          onChange={ handleChange }
        />
      </label>

      <label>
        Login
        <input
          type="text"
          name="login"
          value={ login }
          onChange={ handleChange }
        />
      </label>

      <label>
        Senha
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ handleChange }
        />
      </label>

      <label>
        URL
        <input
          type="text"
          name="url"
          value={ url }
          onChange={ handleChange }
        />
      </label>

      <button disabled={ btnStatus }>Cadastrar</button>
      <button onClick={ () => formStatus() }>Cancelar</button>
    </form>
  );
}
export default Form;
