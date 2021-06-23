import prod from "./client";
import dev from "../development/http";

export default process.env.NODE_ENV === "development" ? dev : prod;
