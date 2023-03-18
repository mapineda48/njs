import { FcAddRow } from "react-icons/fc";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Op from "backend/integration/Op.json";
import { useState } from "react";
import Input from "../Input";

export function Filters(props: { filters: FilterProps[] }) {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<FilterProps[]>([]);

  return (
    <>
      <div className="mb-3 row">
        <label htmlFor="filters" className="col-sm-3 col-form-label">
          Filtro
        </label>
        <div className="col-sm-7">
          <select
            id="filters"
            name="filters"
            className="form-select"
            aria-label="Default select filters"
            onChange={({ currentTarget }) =>
              setIndex(parseInt(currentTarget.value))
            }
          >
            {props.filters.map((filter, index) => (
              <option key={index} value={index}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-2" style={{ fontSize: "1.5em" }}>
          <span
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              const filterProps = props.filters[index];

              setState((state) => [...state, { ...filterProps }]);
            }}
          >
            <FcAddRow />
          </span>
        </div>
      </div>
      {state.map((props, index) => (
        <Filter
          {...props}
          onRemove={() => {
            setState((state) => {
              const next = [...state];

              next.splice(index, 1);

              return next;
            });
          }}
          key={index}
        />
      ))}
    </>
  );
}

export default function Filter(props: InternalProps) {
  const [filter, setFilter] = useState("Op::eq");

  const nameFinal = props.name + "." + filter;
  //  console.log(nameFinal);

  return (
    <div className="mb-3 row">
      <label htmlFor={nameFinal} className="col-sm-12 col-form-label">
        <span
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onRemove();
          }}
        >
          <IoMdCloseCircleOutline />
        </span>
        {props.label}
      </label>
      <div className="col-sm-4">
        <select
          id="filterOption"
          name="filterOption"
          className="form-select"
          aria-label="Default select example"
          onChange={({ currentTarget }) => setFilter(currentTarget.value)}
        >
          <option value={Op.eq}>Igual</option>
          <option value={Op.ne}>No igual</option>
        </select>
      </div>
      <div className="col-sm-8">
        <Input
          name={nameFinal}
          type={props.type}
          className="form-control"
          id={nameFinal}
        />
      </div>
    </div>
  );
}

/**
 * Types
 */
interface FilterProps {
  label: string;
  name: string;
  type: string;
}

interface InternalProps extends FilterProps {
  onRemove: () => void;
}
