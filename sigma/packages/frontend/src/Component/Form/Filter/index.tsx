import Op from "backend/integration/Op.json";
import { useState } from "react";
import Input from "../Input";

export function Filters(props: { filters: FilterProps[] }) {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<JSX.Element[]>([]);

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
        <div className="col-sm-2">
          <button
            className="btn btn-secondary"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();

              const filterProps = props.filters[index];
            }}
          >
            +
          </button>
        </div>
      </div>
      {state}
    </>
  );
}

export default function Filter(props: InternalProps) {
  const [filter, setFilter] = useState("Op::eq");

  const nameFinal = props.name + "." + filter;
  console.log(nameFinal);

  return (
    <div className="mb-3 row">
      <label htmlFor={nameFinal} className="col-sm-12 col-form-label">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onRemove();
          }}
          className="btn btn-secondary"
        >
          X
        </button>
        {props.label}
      </label>
      <div className="col-sm-4">
        <select
          id="department"
          name="department"
          className="form-select"
          aria-label="Default select example"
          onChange={({ currentTarget }) => setFilter(currentTarget.value)}
        >
          <option value={Op.eq}>Igual</option>
          <option value={Op.contains}>Tenga</option>
          <option value={Op.ne}>No igual</option>
        </select>
      </div>
      <div className="col-sm-8">
        <Input
          name={nameFinal}
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
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
