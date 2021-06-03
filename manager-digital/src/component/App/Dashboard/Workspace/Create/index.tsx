import Person from "component/Person";
import createView from "component/App/View";
import { useState } from "component/App/state/Context";

function Create() {
  const [, , http] = useState();

  return (
    <div className="space-center">
      <Person
        onCreate={(person) => http.insertPerson(person)}
        onCancel={(form) => form.clear()}
      />
    </div>
  );
}

export default createView({
  Component: Create,
  isLoading: (state) => state.create.isLoading,
  confirm: (state) => state.create.confirm,
});
