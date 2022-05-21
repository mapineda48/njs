import { useHistory } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BsTable } from "react-icons/bs";
import { route } from "@api";

export default function Home() {
  const history = useHistory();

  return (
    <div className="home">
      <div className="item panel" onClick={() => history.push(route.landing)}>
        <h1 className="icon">
          <FaRegUserCircle />
        </h1>
        <h2>Landing</h2>
        <p>
          A beautiful landing that allows the user to request some type of
          service, validates the form data and also through modal notifies the
          user if the registration was done correctly or if an error occurred.
        </p>
      </div>
      <div className="item panel" onClick={() => history.push(route.crud)}>
        <h1 className="icon">
          <BsTable />
        </h1>
        <h2>Crud</h2>
        <p>
          What is the use of collecting if you do not have an appropriate
          interface, easy to use because some official of the company that needs
          this information can manage it.
        </p>
      </div>
    </div>
  );
}
