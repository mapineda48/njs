import React from "react";
import Form from "Component/Form";
import Input from "Component/Form/Input";
import Select from "Component/Form/Select";
import { RouteObject } from "react-router-dom";
import useApi from "App/Api/Protected/useApi";
import { useConfirmModal } from "Component/Modal/Confirm";
import colombia from "./colombia.json";

const departments: Departments = Object.keys(colombia) as any;

const route: RouteObject = {
  path: "user/create",
  element: <CreatePerson />,
};

export function CreatePerson() {
  const [create, state, clear] = useApi((api) => api.user.create);
  const showConfirm = useConfirmModal();

  const [department, setDepartment] = React.useState(departments[0]);

  React.useEffect(() => {
    if (state.error) {
      showConfirm({
        title: "Error",
        message: "No fue posible crear el usuario",
        label: "Cerrar",
      });
    }
  }, [clear, showConfirm, state.error, state.result]);

  const disabledInput = Boolean(state.result);

  return (
    <div className="mt-3 container">
      {state.result && (
        <div className="alert alert-success alert-dismissible" role="alert">
          <div>
            Usuario creado con UserId <strong>{state.result.userId}</strong>
          </div>
          <button
            onClick={clear}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
      )}
      <Form
        stopPropagation
        preventDefault
        resetForm={!state.result}
        defaultValues={state.result}
        onSubmit={(data: any, event) => {
          create(data);
        }}
        onInvalid={(errors) => {}}
      >
        <fieldset>
          <legend>Crear Nuevo Usuario</legend>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Nombre
            </label>
            <Input
              name="fullName"
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Miguel Pineda"
              disabled={disabledInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <Input
              name="email"
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              disabled={disabledInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Departamento
            </label>
            <Select
              id="department"
              name="department"
              className="form-select"
              aria-label="Default select example"
              disabled={disabledInput}
              onChange={({ currentTarget }) => {
                setDepartment(currentTarget.value as any);
              }}
            >
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              Ciudad
            </label>
            <Select
              id="city"
              name="city"
              className="form-select"
              aria-label="Default select example"
              disabled={disabledInput}
            >
              {colombia[department].map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </div>
          <div className="mb-3">
            <label htmlFor="birthday" className="form-label">
              Fecha Nacimiento:
            </label>
            <Input
              name="birthday"
              valueAsDate
              type="datetime-local"
              className="form-control"
              id="birthday"
              disabled={disabledInput}
            />
          </div>
          {!disabledInput && (
            <button type="submit" className="btn btn-primary">
              Continuar
            </button>
          )}
        </fieldset>
      </Form>
    </div>
  );
}

export default route;

/**
 * Types
 */

type Departments = (keyof typeof colombia)[];
