import React from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { buildSearchParams } from "api/util";
import useApi from "App/Api/Protected/useApi";
import PaginateParams, { ResultProps } from "App/Api/Protected/FindQueryParams";
import { useConfirmModal } from "Component/Modal/Confirm";
import * as ai from "react-icons/ai";
import { Op, User } from "backend/integration";
import useSize from "hook/useSize";
import { useSearchUser } from "./Search";

const PageSize = 20;

const defaultParams = buildSearchParams<User.Record>({
  where: {
    createdAt: {
      [Op.gte]: new Date().addDays(-60),
    },
  },
  order: [["createdAt", "DESC"]],
  limit: PageSize,
  offset: 0,
});

const route: RouteObject = {
  path: "user",
  element: (
    <PaginateParams
      pageSize={PageSize}
      defaultParams={defaultParams}
      onChangePage={(api) => api.user.getSearch}
      onFindAndCountAll={(api) => api.user.getFindAndCountAll}
      OnResult={Person}
    />
  ),
};

export function Person(props: Props) {
  const navigate = useNavigate();
  const showSearchModal = useSearchUser();

  return (
    <>
      {props.pages.length > 1 && (
        <Pagination page={props.page} pages={props.pages} />
      )}
      <table className="table" style={{ marginBottom: "3.5em" }}>
        <thead style={{ position: "sticky", top: 0 }}>
          <tr className="bg-secondary">
            <td style={{ borderBottomWidth: 0 }} colSpan={10}>
              <div
                style={{ position: "sticky", left: 0 }}
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  onClick={() => navigate("create")}
                  type="button"
                  className="btn btn-secondary"
                >
                  <ai.AiOutlineUserAdd />
                </button>
                {/* <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={showSearchModal}
                >
                  <ai.AiOutlineFileSearch />
                </button> */}
              </div>
            </td>
          </tr>
          <tr className="bg-light">
            <th scope="col">UserId</th>
            <th scope="col">Nombre</th>
            <th scope="col">Departamento</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Correo</th>
            <th scope="col">Fecha Nacimiento</th>
            <th scope="col">Creado</th>
            <th scope="col">Actualizado</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {props.rows.map((record, index) => (
            <tr key={index}>
              <td>{record.userId}</td>
              <td>{record.fullName}</td>
              <td>{record.department}</td>
              <td>{record.city}</td>
              <td>{record.email}</td>
              <td>{record.birthday.toAppDateString()}</td>
              <td>{record.createdAt.toAppDateString()}</td>
              <td>{record.updatedAt.toAppDateString()}</td>
              <td>
                <button type="button" className="btn btn-primary">
                  <ai.AiFillEdit />
                </button>
              </td>
              <td>
                <DestroyPerson {...record} onRemove={props.refreshPage} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function DestroyPerson(props: User.Record & { onRemove: () => void }) {
  const [destroy, state, clear] = useApi((api) => api.user.destroy);
  const showConfirm = useConfirmModal();

  React.useEffect(() => {
    if (state.error) {
      console.log(state.error);
    }
  }, [state.error]);

  const onRemove = Boolean(state.result) && props.onRemove;

  React.useEffect(() => {
    if (onRemove) {
      onRemove();
      clear();
    }
  }, [onRemove, clear]);

  return (
    <button
      type="button"
      className="btn btn-danger"
      disabled={state.isLoading}
      onClick={() => {
        showConfirm({
          title: "¿Eliminar?",
          message: `Esta seguro de remover a "${props.fullName}"`,
          label: "Continuar",
          onConfirm() {
            destroy({
              where: {
                userId: props.userId,
              },
            });
          },
        });
      }}
    >
      <ai.AiFillDelete />
    </button>
  );
}

export function Pagination(props: { page: string; pages: string[] }) {
  const navigate = useNavigate();
  const ref = useSize(({ style, parentElement }) => {
    if (!parentElement) {
      return;
    }
    style.width = `${parentElement.clientWidth}px`;
  });

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        background: "white",
      }}
    >
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {/* <li className="page-item">
            <span className="page-link">Previous</span>
          </li> */}
          {props.pages.map((pathname, index) => (
            <li
              key={pathname}
              className={clsx("page-item", props.page === pathname && "active")}
              style={{ cursor: "pointer" }}
            >
              <span onClick={() => navigate(pathname)} className="page-link">
                {index + 1}
              </span>
            </li>
          ))}
          {/* <li className="page-item">
            <span className="page-link">Next</span>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

export default route;

/**
 * Types
 */
type Props = ResultProps<User.Record[]>;
