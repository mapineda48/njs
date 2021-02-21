import React from "react";
import Colombia from "../Colombia";
import Landing from "../Landing";
import Admin from "../Admin";
import { isAdmin } from "../../router";

function Current() {
  if (isAdmin) {
    return <Admin />;
  }

  return <Landing />;
}

export default function () {
  return (
    <Colombia>
      <Current />
    </Colombia>
  );
}
