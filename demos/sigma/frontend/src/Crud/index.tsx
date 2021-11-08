import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiEdit, BiSearchAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { initAction } from "mp48-react/useState";
import { amountResults } from "@model/type";
import { person as api } from "api";
import { usePortalBody } from "components/Portals";
import { useConfirm } from "components/Confirm";
import PersonCRUD from "components/Person";

import type { FindOpt, Record } from "@model/person";

const useState = initAction({
  query(state: State, query: FindOpt): State {
    return { ...init(), query };
  },
  loading(state: State, loading = true): State {
    return { ...state, loading };
  },
  message(state: State, message: string): State {
    return { ...state, message };
  },
  addData(state: State, records: Record[]): State {
    if (!records.length) {
      return { ...state, message: "Sin Registros", canFetch: false };
    }

    const data = Object.fromEntries(
      records.map((record) => [record.id, record])
    );

    const { query } = state;

    const startRow =
      query.offset === undefined ? 0 : query.offset + amountResults;

    return {
      ...state,
      query: {
        ...state.query,
        offset: startRow,
      },
      canFetch: records.length === amountResults,
      data: { ...state.data, ...data },
    };
  },
  delete(state: State, id: number): State {
    if (!state.data[id]) return state;

    const data = { ...state.data };

    delete data[id];

    return { ...state, data };
  },

  update(state: State, record: Record): State {
    if (!state.data[record.id]) return state;

    return { ...state, data: { ...state.data, [record.id]: { ...record } } };
  },
});

let isMount = false;

export default function CRUD() {
  React.useEffect(() => {
    isMount = true;
    return () => {
      isMount = false;
    };
  }, []);

  const appendToBody = usePortalBody();

  const confirm = useConfirm();

  const [state, , model] = useState(init);

  const records = React.useMemo(() => Object.values(state.data), [state.data]);

  const enabledFetch = state.canFetch && !state.loading && !state.message;

  React.useEffect(() => {
    if (!enabledFetch) return;

    const onScrollEnd = (e: ScrollNative) => {
      const { scrollingElement } = document;

      if (!scrollingElement) return;

      const { scrollHeight, scrollTop } = scrollingElement;

      /**
       * https://stackoverflow.com/questions/3898130/check-if-a-user-has-scrolled-to-the-bottom/3898152
       */
      const shouldFetch = scrollHeight - scrollTop <= window.innerHeight + 50;

      if (!shouldFetch) return;

      model.loading();

      api
        .select(state.query)
        .then((records) => isMount && model.addData(records))
        .catch(console.error)
        .finally(() => isMount && model.loading(false));

      document.removeEventListener("scroll", onScrollEnd);
    };

    document.addEventListener("scroll", onScrollEnd);

    return () => document.removeEventListener("scroll", onScrollEnd);
  }, [enabledFetch, model, state.query]);

  const existsData = Boolean(records.length);

  React.useEffect(() => {
    if (existsData || !enabledFetch) return;

    model.loading();

    api
      .select(state.query)
      .then((records) => isMount && model.addData(records))
      .catch((err) => isMount && model.message(err.message))
      .finally(() => isMount && model.loading(false));
  }, [enabledFetch, existsData, model, state.query]);

  return (
    <div className="crud">
      <div className="header">
        <div className="title">
          <h2>Sigma CRUD</h2>
        </div>
        <div className="action">
          <button
            title="Agregar Persona"
            onClick={() => {
              appendToBody((portal) => (
                <div className="overlay" style={portal.style}>
                  <PersonCRUD
                    panel
                    label="Agregar"
                    onRequired={(person) => {
                      confirm({
                        message: `Agregar a ${person.fullName}`,
                        async onConfirm() {
                          try {
                            const record = await api.insert(person);

                            const message = record.fullName + " registrado";

                            confirm({
                              message,
                            });
                          } catch (error) {
                            confirm({ error });
                          }
                        },
                        onCancel() {},
                        onFinally() {
                          portal.remove();
                        },
                      });
                    }}
                    onClose={portal.remove}
                  />
                </div>
              ));
            }}
          >
            <AiOutlineUserAdd />
          </button>
          <button
            title="Buscar Persona"
            onClick={() => {
              appendToBody((portal) => (
                <div className="overlay" style={portal.style}>
                  <PersonCRUD
                    label="Buscar"
                    panel
                    onClose={portal.remove}
                    onPartial={(person) => {
                      portal.remove();
                      if (!isMount) return;
                      model.query({ offset: 0, where: person });
                    }}
                  />
                </div>
              ));
            }}
          >
            <BiSearchAlt />
          </button>
        </div>
      </div>
      {!existsData && state.loading && (
        <div className="notification">loading...</div>
      )}
      {!existsData && state.message && (
        <div className="notification">{state.message}</div>
      )}
      {existsData && (
        <div className="records">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Ciudad</th>
                <th>Departamento</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <button
                        title={`editar a ${record.fullName}`}
                        onClick={() => {
                          appendToBody((portal) => {
                            return (
                              <div className="overlay" style={portal.style}>
                                <PersonCRUD
                                  panel
                                  person={record}
                                  label="Editar"
                                  onClose={() => {
                                    portal.remove();
                                  }}
                                  onRequired={(person) => {
                                    confirm({
                                      message: `Actualizar ${record.fullName}`,
                                      async onConfirm() {
                                        try {
                                          const current = await api.update({
                                            ...record,
                                            ...person,
                                          });

                                          confirm({
                                            message:
                                              current.fullName + " Actualizado",
                                            onConfirm() {
                                              if (!isMount) return;
                                              model.update(current);
                                            },
                                          });
                                        } catch (error) {
                                          confirm({ error });
                                        } finally {
                                          portal.remove();
                                        }
                                      },
                                      onCancel() {},
                                    });
                                  }}
                                />
                              </div>
                            );
                          });
                        }}
                      >
                        <BiEdit />
                      </button>

                      <button
                        title={`eliminar a ${record.fullName}`}
                        onClick={() => {
                          confirm({
                            message: `eliminar a ${record.fullName}`,
                            async onConfirm() {
                              try {
                                await api.delete(record.id);
                                confirm({
                                  message: record.fullName + " Elimando",
                                  onConfirm() {
                                    if (!isMount) return;
                                    model.delete(record.id);
                                  },
                                });
                              } catch (error: any) {
                                confirm({ error });
                              }
                            },
                            onCancel() {},
                          });
                        }}
                      >
                        <MdDelete />
                      </button>
                    </td>
                    <td title={record.fullName}>{record.fullName}</td>
                    <td title={record.email}>{record.email}</td>
                    <td title={record.city}>{record.city}</td>
                    <td title={record.department}>{record.department}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function init(): State {
  return {
    query: { offset: 0 },
    loading: false,
    message: "",
    data: {},
    canFetch: true,
  };
}

/**
 * Types
 */
interface State {
  query: FindOpt;
  loading: boolean;
  message: string;
  canFetch: boolean;
  data: {
    [K: number]: Record;
  };
}

type ScrollNative = DocumentEventMap["scroll"];
