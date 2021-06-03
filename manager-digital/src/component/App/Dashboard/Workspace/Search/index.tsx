import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Person from "component/Person";
import Confirm from "component/App/Confirm";
import createView from "component/App/View";
import { useState, useHttp } from "component/App/state/Context";
import * as view from "component/App/state/view";
import style from "./index.module.scss";

import type { Record } from "service";

export function Filter() {
  const http = useHttp();

  return (
    <div className="space-center">
      <Person
        onSearch={(query, form) => {
          http.fetchPersons(query);
          form.clear();
        }}
        onCancel={(form) => {
          form.clear();
        }}
      />
    </div>
  );
}

export function Results(props: Props) {
  const { onScrollEnd } = props;

  const _onScrollEnd = React.useMemo(() => {
    if (!onScrollEnd) return;

    return (event: ScrollEvent) => {
      const { offsetHeight, scrollHeight, scrollTop } = event.currentTarget;

      const scrolled = ((offsetHeight + scrollTop) * 100) / scrollHeight;

      if (scrolled < 85) return;

      onScrollEnd();
      //console.log({ scrolled, offsetHeight, scrollHeight, scrollTop });
    };
  }, [onScrollEnd]);

  return (
    <div className={"flex-full " + style._} onScroll={_onScrollEnd}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Direccion</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {props.results.map((result, index) => {
            return (
              <tr key={index}>
                <td>
                  <button
                    title={`editar a ${result.full_name}`}
                    onClick={() => props.onEdit(result, index)}
                  >
                    <BiEdit />
                  </button>

                  <button
                    title={`eliminar a ${result.full_name}`}
                    onClick={() => props.onDelete(result, index)}
                  >
                    <MdDelete />
                  </button>
                </td>
                <td>{result.full_name}</td>
                <td>{result.dni}</td>
                <td>{result.address}</td>
                <td>{result.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const Search = createView({
  selector: (state) => state.search.current,
  isLoading: (state) => state.search.isLoading,
  confirm: (state) => state.search.confirm,
});

Search.set(view.search.FILTER, Filter);

Search.set(view.search.RESULTS, function ViewResult() {
  const [state, admin, http] = useState();

  const onScrollEnd =
    state.search.scroll.canFetch && !state.search.scroll.isLoading
      ? http.fetchPersonWithScroll
      : undefined;

  console.log(state);

  return (
    <Results
      results={state.search.results}
      onDelete={(person, index) => {
        admin.modal.push((props) => {
          return (
            <Confirm
              message={`Eliminar a "${person.full_name}"`}
              onConfirm={() => {
                http.removePerson(person.id, index);
                props.close();
              }}
              onCancel={props.close}
            />
          );
        });
      }}
      onEdit={(current, index) => {
        admin.modal.push(function EditPerson(propsForm) {
          return (
            <Person
              record={current}
              onEdit={(next) => {
                admin.modal.push(function ConfirmEditPerson(props) {
                  return (
                    <Confirm
                      message={`Aplicar cambiar a ${current.full_name}`}
                      onConfirm={() => {
                        http.editPerson({ ...current, ...next }, index);
                        props.close();
                        propsForm.close();
                      }}
                      onCancel={() => {
                        props.close();
                        propsForm.close();
                      }}
                    />
                  );
                });
              }}
              onCancel={() => {
                propsForm.close();
              }}
            />
          );
        });
      }}
      onScrollEnd={onScrollEnd}
    />
  );
});

export default Search;

/**
 * Types
 */
type ScrollEvent = React.UIEvent<HTMLDivElement, UIEvent>;

interface Props {
  results: Record[];
  onEdit: (record: Record, index: number) => void;
  onDelete: (record: Record, index: number) => void;
  onScrollEnd?: () => void;
}
