import React from "react";
import NavBar from "./NavBar";
import Routers from "./Main";
import { Router } from "view/Router";

import style from "./index.module.scss";

const animation = { in: style.in, out: style.out };

export default () => {
  return (
    <Router
      className={style.app}
      animation={animation}
      onOutEnd={({ app, invoice, management }) => {
        app.reset();
        invoice.reset();
        management.reset();
      }}
    >
      <NavBar />
      <main className={style.main}>
        <Routers />
      </main>
      <footer className={style.footer}>
        <p>
          <strong>This Demo</strong> by{" "}
          <a href="https://twitter.com/@MiguelPinedaTec">Miguel Pineda</a>. The
          source code is licensed{" "}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed{" "}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </a>
          .
        </p>
      </footer>
    </Router>
  );
};
