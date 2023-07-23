import { useApi, useSubmit } from "Agape/Session";
import Form from "Form";
import Input from "Form/Input";
import setPaginate, { useRef, Ref } from "Agape/Paginate.v2";
import { useEffect } from "react";

export default function Configuration() {
  const table = useRef();

  return (
    <div className="container">
      <DocumentType table={table} />
      <Records onRef={table} />
    </div>
  );
}

function DocumentType(props: { table: Ref }) {
  return (
    <fieldset className="border p-2">
      <legend>Tipos de Documento</legend>
      <Form>
        <div className="row">
          <div className="col">
            <Input.Text
              fieldName="fullName"
              className="form-control"
              placeholder="Documento"
            />
          </div>
          <div className="col">
            <Input.Text
              fieldName="code"
              maxLength={2}
              className="form-control"
              placeholder="Código"
            />
          </div>
          <div className="col">
            <div className="form-check form-check-inline">
              <Input.CheckBox
                fieldName="isEnabled"
                className="form-check-input"
                id="inlineCheckbox1"
              />
              Habilitado
              <label
                className="form-check-label"
                htmlFor="inlineCheckbox1"
              ></label>
            </div>
          </div>
          <SaveDocumentType table={props.table} />
        </div>
      </Form>
    </fieldset>
  );
}

function SaveDocumentType(props: { table: Ref }) {
  const task = useSubmit((api) => api.model.documentType.create);

  useEffect(() => {
    if (!task.result || !props.table) {
      return;
    }

    props.table.refresh();
  });

  return (
    <div className="col">
      <button type="submit" className="btn btn-primary">
        Agregar
      </button>
    </div>
  );
}

function DeleteDocumentType(props: { id: number; onDelete: () => void }) {
  const [task, destroy] = useApi((api) => api.model.documentType.destroy);

  const { onDelete } = props;

  useEffect(() => {
    if (!task.result) {
      return;
    }

    onDelete();
  }, [onDelete, task.result]);

  return (
    <button
      disabled={task.loading}
      onClick={() => {
        destroy({
          where: props,
        });
      }}
    >
      X
    </button>
  );
}

const Records = setPaginate({
  size: 20,
  source: (api) => api.model.documentType,
  OnResult(props) {
    if (!props.rows.length) {
      return <div>Sin Registros</div>;
    }

    return (
      <>
        <table className="border p1">
          <thead>
            <tr>
              <td>Id</td>
              <td>Nombre Documento</td>
              <td>Código</td>
              <td>Habilitado</td>
              <td>Fecha Modificación</td>
              <td>
                <button onClick={props.reload} type="button">
                  refresh
                </button>
              </td>
            </tr>
          </thead>
          <tbody>
            {props.rows.map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.fullName}</td>
                  <td>{row.code}</td>
                  <td>
                    <input
                      type="checkbox"
                      disabled
                      defaultChecked={row.isEnabled}
                    />
                  </td>
                  <td>{row.updatedAt.toLocaleTimeString()}</td>
                  <td>
                    <DeleteDocumentType id={row.id} onDelete={props.refresh} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  },
});