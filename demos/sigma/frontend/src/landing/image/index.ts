import extra from "../../../public/image/image.png";
import logo from "../../../public/image/logo.png";

const isDev = process.env.NODE_ENV === "development";

const image = { extra: isDev ? extra : "../image/image.png", logo };

export default image;
