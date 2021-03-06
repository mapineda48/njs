import React from "react";
import { useParams } from "react-router-dom";
import { title } from "../../shared";
import { useContext } from "../Context";
import parse from "./parse";

export function Detail(props: Prop) {
  const { fields } = props;

  return (
    <div className="detail flex-full">
      <fieldset>
        <legend>General Information</legend>
        <div className="two">
          {fields.map(([label, value], index) => {
            return (
              <div key={index}>
                <div className="two">
                  <div>
                    <label>
                      <strong>{label}</strong>
                    </label>
                  </div>
                  <div>
                    <p>{value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export default function DetailInContext() {
  const [state, grants, http] = useContext();

  const { id } = useParams<Params>();

  const detail = state.detail[id];

  React.useEffect(() => {
    window.document.title = title.detail(id);

    if (detail) return;

    const normalize = parseInt(id);

    if (isNaN(normalize)) {
      grants.showMessage(`invalid id "${id}"`);
      return;
    }

    http.fetchDetail(normalize);
  });

  if (!detail) return null;

  try {
    const pairs = parse(detail);

    return <Detail fields={pairs} />;
  } catch (error) {
    console.log(error);

    grants.showMessage(error.message);

    return null;
  }
}

/**
 * Types
 */
interface Prop {
  fields: string[][];
}

interface Params {
  id: string;
}
