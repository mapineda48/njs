// import DocumentType from "./DocumentType";

// export default function Setting() {
//   return <DocumentType />;
// }

import Router, { Redirect } from "Router";
import Menu from "./Menu";
import DocumentType from "./DocumentType";
import User from "./User";

const Setting = Router(Menu);

Setting.use("/document-type", DocumentType);
Setting.use("/user", User);
Setting.use("*", () => <Redirect relative to="/document-type" />);

export default Setting;
