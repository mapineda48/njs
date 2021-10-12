import React from "react";
import { mountChat } from "@mapineda48/social/browser";
import Person from "components/Person";
import { useConfirm } from "components/Confirm";
import { person as api } from "api";
import image from "./image";

mountChat();

export default function Landing() {
  const [loading, setLoading] = React.useState(false);

  const confirm = useConfirm();

  React.useEffect(() => {
    window.document.title = "Landing";
  }, []);

  return (
    <div className="landing">
      <div className="app">
        <div>
          <img src={image.logo} alt="" />
        </div>

        <div className="title">
          <h1>Prueba de Desarrollo Sigma</h1>
        </div>

        <div className="text">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero vel
            sed reiciendis officia, illo atque numquam alias non dolore incidunt
            excepturi consequuntur aut omnis assumenda nesciunt. Quis nulla
            omnis neque.
          </p>
        </div>

        <div className="main">
          <div>
            <img width={400} height={400} src={image.extra} alt="" />
          </div>
          <div>
            <Person
              disabled={loading}
              onRequired={async (person, form) => {
                setLoading(true);
                try {
                  const { message } = await api.insert(person);

                  confirm({
                    message,
                    onConfirm() {
                      form.reset();
                      setLoading(false);
                    },
                  });
                } catch (error: any) {
                  confirm({
                    error,
                  });
                } finally {
                  setLoading(false);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Types
 */
interface State {
  loading: boolean;
  message: string;
}
