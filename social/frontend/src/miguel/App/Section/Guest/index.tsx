import React from "react";
import { useSize } from "../../Layout";
import { useDispatch, useSelector } from "../../Store/hook";
import style from "./index.module.scss";

import type { Guest as Model } from "@model/Guest";

export function Guest({ model }: { model: Model }) {
  return (
    <li
      className={`d-inline-flex flex-column border m-3 p-3 rounded ${style.row}`}
    >
      <div title={model.id}>
        <label>ID:</label>
        <span>{model.id}</span>
      </div>
      <div>
        <label>Nombre:</label>
        <span>{model.fullName}</span>
      </div>
      <div>
        <label>Demo:</label>
        <span>{model.demo}</span>
      </div>
      <div>
        <label>Origen:</label>
        <span>{model.origin}</span>
      </div>
      <div>
        <label>Online:</label>
        <span>{model.isOnline}</span>
      </div>
      <div>
        <label>Address:</label>
        <span>{model.address}</span>
      </div>
      <div>
        <label>UserAgent:</label>
        <span>{model.userAgent}</span>
      </div>
      <div>
        <label>Origen:</label>
        <span>{model.origin}</span>
      </div>
      <div>
        <label>Creado:</label>
        <span>{(model as any).createdAt}</span>
      </div>
      <div>
        <label>Actualizado:</label>
        <span>{(model as any).updatedAt}</span>
      </div>
    </li>
  );
}

export default function Guests() {
  const records = useSelector(({guest}) => guest.records);
  const isSync = useSelector(({ guest }) => guest.sync);
  const canFetch = useSelector(({ guest }) => guest.canFetch && !guest.loading);
  const { guest } = useDispatch();
  const ref = useSize<HTMLUListElement>();

  const canSync = !isSync && canFetch;

  React.useEffect(() => {
    if (!canSync) {
      return;
    }

    guest.sync();
  }, [canSync, guest]);

  return (
    <ul
      ref={ref}
      className={`app-main d-flex justify-content-around flex-wrap p-1 ${style._}`}
      onScroll={
        canFetch
          ? ({ currentTarget }) => {
              const { scrollTop, scrollHeight, clientHeight } = currentTarget;

              const limitToFetch = scrollHeight / 5;

              const total = scrollTop + clientHeight;

              const available = scrollHeight - total;

              if (limitToFetch < available) {
                return;
              }
            }
          : undefined
      }
    >
      {records.map((guest, index) => (
        <Guest model={guest} key={index} />
      ))}
    </ul>
  );
}