import { useState } from 'react';
import Swal from 'sweetalert2';
import { FormStatusType } from '../types';

type FormType = {
  formStatus: () => void,
  handleSubmit: (formValues: FormStatusType) => void
};

const INITIAL_STATE = {
  serviceName: '',
  login: '',
  password: '',
  url: '',
};

function Form({ formStatus, handleSubmit }: FormType) {
  const [formValues, setFormValues] = useState<FormStatusType>(INITIAL_STATE);
  const [btnStatus, setBtnStatus] = useState<boolean>(true);
  const [moreChar, setMoreChar] = useState<boolean>(true);
  const [lesserChar, setLesserChar] = useState<boolean>(false);
  const [letterNumber, setLetterNumber] = useState<boolean>(false);
  const [specialChar, setSpecialChar] = useState<boolean>(false);
  const [passType, setpassType] = useState<string>('password');

  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const valid = 'valid-password-check';
  const invalid = 'invalid-password-check';

  const { serviceName, login, password, url } = formValues;

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = target;
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

  function swalAlert() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Serviço cadastrado com sucesso',
      showConfirmButton: false,
      timer: 1500,
    });
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

  function passCheck() {
    lesserCharCheck();
    moreCharCheck();
    letterNumberCheck();
    specialCharCheck();
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formStatus();
    handleSubmit(formValues);
    setFormValues(INITIAL_STATE);
    swalAlert();
  };

  function changePassType(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    return passType === 'password' ? setpassType('text') : setpassType('password');
  }

  return (
    <form onChange={ buttonEnable } onSubmit={ onSubmit }>
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
          type={ passType }
          name="password"
          value={ password }
          onChange={ (event) => { handleChange(event); passCheck(); } }
        />
      </label>

      <div>
        <p className={ lesserChar ? valid : invalid }>
          Possuir 8 ou mais caracteres
        </p>
        <p className={ moreChar ? valid : invalid }>
          Possuir até 16 caracteres
        </p>
        <p className={ letterNumber ? valid : invalid }>
          Possuir letras e números
        </p>
        <p className={ specialChar ? valid : invalid }>
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
        data-testid="show-hide-form-password"
        onClick={ (event) => changePassType(event) }
      >
        esconder/mostrar senha
      </button>

      <button type="submit" disabled={ btnStatus }>Cadastrar</button>
      <button type="button" onClick={ formStatus }>Cancelar</button>
    </form>
  );
}
export default Form;
