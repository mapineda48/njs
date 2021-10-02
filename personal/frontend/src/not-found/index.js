import { mountChat } from "@mapineda48/social/frontend/lib";
import "./index.scss";

mountChat();

const id = "pageNotFound";

let pathname = document.location.pathname;

pathname = pathname.length > 10 ? pathname.substr(0, 15) + "..." : pathname;

const span = document.getElementById(id);

const msg = span.innerText.replace("page", pathname);

span.innerText = msg;

document.title = `not found path ${pathname}`;
