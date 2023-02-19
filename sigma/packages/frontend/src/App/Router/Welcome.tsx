import { RouteObject } from "react-router-dom";

const route: RouteObject = {
  path: "/",
  element: <Welcome />,
};

export function Welcome() {
  return (
    <div className="d-flex text-center text-bg-dark h-100">
      <div
        style={{ maxWidth: 600, justifyContent: "center" }}
        className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column"
      >
        <div className="px-3">
          <h1>Welcome!!!</h1>
          <p className="lead">
            As a seller after promoting new ones through social media, you can
            now manage all registered users to access the new product review
            before anyone else
          </p>
          <p className="lead">
            <a
              target="_blank"
              rel="norefe noreferrer"
              href="https://github.com/mapineda48"
              className="btn btn-lg btn-light fw-bold border-white bg-white"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default route;
