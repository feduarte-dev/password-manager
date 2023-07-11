import { useState } from 'react';

type FormType = {
  formStatus: any,
  handleSubmit: any
};

const INITIAL_STATE = {
  serviceName: '',
  login: '',
  password: '',
  url: '',
};
function Form({ formStatus, handleSubmit }: FormType) {
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const [btnStatus, setBtnStatus] = useState(true);
  const [formValues, setFormValues] = useState(INITIAL_STATE);
  const { serviceName, login, password, url } = formValues;
  const [lesserChar, setLesserChar] = useState(false);
  const [moreChar, setMoreChar] = useState(true);
  const [letterNumber, setLetterNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';
  function handleChange(event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  function buttonEnable() {
    return serviceName.length > 0
    && login.length > 0
    && lesserChar && moreChar
    && letterNumber
    && specialChar
      ? setBtnStatus(false)
      : setBtnStatus(true);
  }

  function lesserCharCheck() {
    return password.length > 7 ? setLesserChar(true) : setLesserChar(false);
  }
  function moreCharCheck() {
    return password.length < 15 ? setMoreChar(true) : setMoreChar(false);
  }
  function letterNumberCheck() {
    return password.match(/[a-zA-Z]/) && /\d/.test(password) ? setLetterNumber(true) : setLetterNumber(false);
  }
  function specialCharCheck() {
    return specialChars.test(password) ? setSpecialChar(true) : setSpecialChar(false);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formStatus();
    handleSubmit(formValues);
    setFormValues(INITIAL_STATE);
  };
  return (
    <form onKeyUpCapture={ buttonEnable } onSubmit={ onSubmit }>
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
          onChange={ (e) => {
            handleChange(e);
            lesserCharCheck(); moreCharCheck(); letterNumberCheck(); specialCharCheck();
          } }

        />
      </label>
      <div>
        <p
          className={ lesserChar
            ? valid : invalid }
        >
          Possuir 8 ou mais caracteres

        </p>
        <p
          className={ moreChar
            ? valid : invalid }
        >
          Possuir até 16 caracteres

        </p>
        <p
          className={ letterNumber
            ? valid : invalid }
        >
          Possuir letras e números

        </p>
        <p
          className={ specialChar
            ? valid : invalid }
        >
          Possuir algum caractere especial

        </p>
      </div>
      <label>
        URL
        <input
          type="text"
          name="url"
          value={ url }
          onChange={ handleChange }
        />
      </label>

      <button
        type="submit"
        disabled={ btnStatus }

      >
        Cadastrar

      </button>
      <button type="button" onClick={ () => formStatus() }>Cancelar</button>
    </form>
  );
}
export default Form;
