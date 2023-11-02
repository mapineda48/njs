import Loading from "App/Loading";
import useForm from "./state";
import { useEffect } from "react";
import { useApi } from "App/Agape/Session";
import Input from "form/Input";

export default function DocumentType() {
  const form = useForm();

  if (!form.records.length) {
    if (form.isLoading) {
      return <Loading />;
    }

    return <div>Sin registros...</div>;
  }

  return (
    <div className="container">
      <form
        onSubmit={form.submit}
        ref={(ref) => {
          if (!ref) {
            return;
          }

          const rect = ref.parentElement?.getBoundingClientRect();

          if (!rect) {
            return;
          }

          ref.style.width = rect.width + "px";
        }}
        className="row g-3 align-items-center container"
        style={{ position: "fixed", bottom: 0, backgroundColor: "white" }}
      >
        <div className="col-auto">
          <label htmlFor="fullName" className="col-form-label">
            Nombre:
          </label>
        </div>
        <div className="col-auto" style={{ flexGrow: 1 }}>
          <Input.String
            proxy={form}
            id="fullName"
            className="form-control"
            aria-describedby="Nombre tipo documento"
          />
        </div>
        <div className="col-auto">
          <label htmlFor="code" className="col-form-label">
            Código:
          </label>
        </div>
        <div className="col-auto">
          <Input.String
            proxy={form}
            id="code"
            className="form-control"
            aria-describedby="Código"
          />
        </div>
        <div className="col-auto">
          <div className="form-check">
            <Input.CheckBox
              className="form-check-input"
              proxy={form}
              id="isEnabled"
            />
            <label className="form-check-label" htmlFor="isEnabled">
              Habilitado
            </label>
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Agregar
          </button>
        </div>
      </form>

      <table
        style={{
          cursor: form.isLoading ? "progress" : undefined,
          pointerEvents: form.isLoading ? "none" : undefined,
        }}
        className="table"
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre Documento</th>
            <th scope="col">Código</th>
            <th scope="col">Habilitado</th>
            <th scope="col">Fecha Modificación</th>
            <th scope="col">
              <span onClick={form.refresh} style={{ cursor: "pointer" }}>
                <i className="bi bi-arrow-clockwise"></i>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {form.records.map((row, index) => {
            return (
              <tr key={index}>
                <th scope="row">{row.id}</th>
                <td>{row.fullName}</td>
                <td>{row.code}</td>
                <td>
                  <input
                    type="checkbox"
                    disabled
                    checked={row.isEnabled}
                    onChange={() => {}}
                  />
                </td>
                <td>{row.updatedAt.toLocaleTimeString()}</td>
                <td>
                  <DeleteDocumentType id={row.id} onDelete={form.refresh} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function DeleteDocumentType(props: { id: number; onDelete: () => void }) {
  const [task, destroy] = useApi((api) => api.models.documentType.destroy);

  const { onDelete } = props;

  useEffect(() => {
    if (!task.result) {
      return;
    }

    onDelete();
  }, [onDelete, task.result]);

  return (
    <span
      onClick={() => {
        if (task.loading) {
          return;
        }

        destroy({
          where: props,
        });
      }}
      style={{ cursor: task.loading ? "progress" : "pointer" }}
      className="text-danger"
    >
      <i className="bi bi-x-circle-fill"></i>
    </span>
  );
}
