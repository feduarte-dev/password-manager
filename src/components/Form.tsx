type FormType = {
  formStatus: any
};
function Form({ formStatus }: FormType) {
  return (
    <form>
      <label>
        Nome do serviço
        <input type="text" name="serviceName" />
      </label>

      <label>
        Login
        <input type="text" name="login" />
      </label>

      <label>
        Senha
        <input type="password" name="password" id="Senha" />
      </label>

      <label>
        URL
        <input type="text" name="url" />
      </label>

      <button>Cadastrar</button>
      <button onClick={ () => formStatus() }>Cancelar</button>
    </form>
  );
}
export default Form;
