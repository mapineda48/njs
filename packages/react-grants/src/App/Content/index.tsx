import React from "react";
import { type } from "App/state";
import { useGrants } from "App/Context";
import Loading from "./Loading";
import Opportunitys from "./Opportunitys";
import Detail from "./Detail";
import Notify from "./Notify";

export default function () {
  const [state] = useGrants();

  switch (state.current) {
    case type.LOADING:
      return <Loading />;
    case type.OPPORTUNITYS:
      return <Opportunitys />;
    case type.DETAIL:
      return <Detail />;
    case type.NOTIFICATION:
      return <Notify />;

    default:
      return process.env.NODE_ENV === "development" ? (
        <div>{`unknown type ${state.current}`}</div>
      ) : null;
  }
}
