import Person from "admin/Person";
import createView from "admin/View";
import { useState } from "admin/state/Context";

function Create() {
  const [, , http] = useState();

  return (
    <div className="space-center">
      <Person
        label="Crear"
        cacheOnKey="form-create"
        onRequired={(person, form, cache) => {
          http.insertPerson(person);
          cache.clear();
        }}
        onClose={(form) => {
          form.clear();
        }}
      />
    </div>
  );
}

export default createView({
  Component: Create,
  isLoading: (state) => state.create.isLoading,
  confirm: (state) => state.create.confirm,
});
