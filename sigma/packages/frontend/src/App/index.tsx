import { createBrowserRouter, RouterProvider } from "react-router-dom";
import route from "./Router";

export default function Router() {
  return <RouterProvider router={createBrowserRouter([route])} />;
}
