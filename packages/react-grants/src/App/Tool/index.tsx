import React from "react";
import { type } from "App/state";
import { useGrants } from "App/Context";
import Loading from "./Loading";
import Opportunitys from "./Opportunitys";
import Detail from "./Detail";

export default function () {
  const [state] = useGrants();

  switch (state.current) {
    case type.LOADING:
      return <Loading />;
    case type.OPPORTUNITYS:
      return <Opportunitys />;
    case type.DETAIL:
    case type.NOTIFICATION:
      return <Detail />;

    default:
      return process.env.NODE_ENV === "development" ? (
        <div>{`unknown type ${state.current}`}</div>
      ) : null;
  }
}
