import React from "react";
import { mountChat } from "@mapineda48/social/browser";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiEdit, BiSearchAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { initAction } from "mp48-react/useAction";
import { amountResults } from "@model";
import { person as api } from "api";
import { usePortalBody } from "components/Portals";
import { useConfirm } from "components/Confirm";
import PersonCRUD from "components/Person";

import type { Select, Record } from "@model";

mountChat();

const useState = initAction({
  query(state: State, query: Select): State {
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

    const startRow =
      state.query.startRow === undefined ? 0 : state.query.startRow + 20;

    return {
      ...state,
      query: {
        ...state.query,
        startRow,
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

export default function CRUD() {
  const appendToBody = usePortalBody();

  const confirm = useConfirm();

  const [state, , model] = useState(init);

  const records = React.useMemo(() => Object.values(state.data), [state.data]);

  React.useEffect(() => {
    if (!state.canFetch || state.loading || state.message) return;

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
        .then((records) => {
          model.addData(records);
        })
        .catch(console.error)
        .finally(() => model.loading(false));

      document.removeEventListener("scroll", onScrollEnd);
    };

    document.addEventListener("scroll", onScrollEnd);

    return () => document.removeEventListener("scroll", onScrollEnd);
  }, [state.canFetch, state.loading,state.message, model]);

  const existsData = Boolean(records.length);

  if (!existsData && !state.loading && !state.message && state.canFetch) {
    model.loading();

    api
      .select(state.query)
      .then((records) => model.addData(records))
      .catch((err) => model.message(err.message))
      .finally(() => model.loading(false));
  }

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
                        message: `Agregar a ${person.full_name}`,
                        async onConfirm() {
                          try {
                            const { message } = await api.insert(person);
                            confirm({ message });
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
                      model.query({ startRow: 0, ...person });
                      portal.remove();
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
                        title={`editar a ${record.full_name}`}
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
                                      message: `Actualizar ${record.full_name}`,
                                      async onConfirm() {
                                        try {
                                          const data = {
                                            id: record.id,
                                            ...person,
                                          };
                                          const { message } = await api.update(
                                            data
                                          );

                                          confirm({
                                            message,
                                            onConfirm() {
                                              model.update(data);
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
                        title={`eliminar a ${record.full_name}`}
                        onClick={() => {
                          confirm({
                            message: `eliminar a ${record.full_name}`,
                            async onConfirm() {
                              try {
                                const { message } = await api.delete(record.id);
                                confirm({
                                  message,
                                  onConfirm() {
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
                    <td title={record.full_name}>{record.full_name}</td>
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
    query: { startRow: 0 },
    loading: false,
    message: "",
    data: {},
    canFetch: true,
  };
}

/**
 * Types
 */
type ScrollEvent = React.UIEvent<HTMLDivElement, UIEvent>;

interface State {
  query: Select;
  loading: boolean;
  message: string;
  canFetch: boolean;
  data: {
    [K: number]: Record;
  };
}

type ScrollNative = DocumentEventMap["scroll"];
