import { useModal } from "Component/Modal/useModal";
import { Props, usePortalToBody } from "Component/Portal";
import Form from "Component/Form";
import { buildSearchParams } from "api/util";
import { Op, User } from "backend/integration";
import { useNavigate } from "react-router-dom";
import { Filters } from "Component/Form/Filter";

const filters = [{ label: "Correo", name: "email", type: "email" }];

export function useSearchUser() {
  return usePortalToBody(Search);
}

export default function Search(props: Props) {
  const { remove } = props;
  const ref = useModal<HTMLDivElement>(remove);
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <Form
          stopPropagation
          preventDefault
          onSubmit={(data: any) => {
//            console.log(data);

            const PageSize = 20;

            const now = new Date();

            const params = buildSearchParams<User.IRecord>({
              where: {
                ...data,
                createdAt: {
                  [Op.gte]: now.addDays(-60),
                },
              },
              order: [["createdAt", "DESC"]],
              limit: PageSize,
              offset: 0,
            });

            const url = window.location.pathname + params;

            navigate(url);
          }}
          className="modal-content"
        >
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Buscar Usuario
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <Filters filters={filters} />
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Buscar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

/**
 * Types
 */
