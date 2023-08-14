import Router, { Redirect } from "Router";
import HomeShop from "./Home";
import DetailShop from "./Detail";
import Products from "./Products";

const Shop = Router();

Shop.use("/", HomeShop);
Shop.use("/products", Products);
Shop.use("/detail/:id", DetailShop);
Shop.use("*", () => <Redirect relative to="/" />);

export default Shop;
