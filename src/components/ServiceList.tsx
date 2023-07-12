import { useState } from 'react';
import { FormStatusType } from '../types';

type ServiceListProps = {
  serviceList:FormStatusType[],
  handleDelete(event:any): void
};

function ServiceList({ serviceList, handleDelete }: ServiceListProps) {
  const [hidePass, setHidePass] = useState<boolean>(false);

  function checkPassDisplay() {
    return hidePass ? setHidePass(false) : setHidePass(true);
  }

  return (
    <>
      {serviceList.map((service: any) => (
        <div key={ service.serviceName }>
          <a href={ service.url }>{service.serviceName}</a>
          <p>{service.login}</p>
          {hidePass ? <p>******</p> : <p>{service.password}</p>}

          <button
            id={ service.serviceName }
            onClick={ (event) => handleDelete(event) }
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
          onChange={ checkPassDisplay }
        />
      </label>
    </>
  );
}

export default ServiceList;
