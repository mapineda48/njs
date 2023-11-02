import Input from "form/Input";
import useForm from "./state";

export default function Home() {
  const form = useForm();

  return (
    <div className="container">
      <h3 className="my-3">Producto</h3>
      <form className="row g-3">
        <div className="col-md-10">
          <label htmlFor="fullName" className="form-label">
            Nombre:
          </label>
          <Input.String className="form-control" proxy={form} id="fullName" />
        </div>
        <div className="col-md-2">
          <label htmlFor="isEnabled" className="form-label">
            Disponible
          </label>
          <select
            value={form.isEnabled + ""}
            id="isEnabled"
            className="form-select"
            onChange={(e) => {
              form.isEnabled = e.currentTarget.value === "true";
            }}
          >
            <option value="false">No</option>
            <option value="true">Si</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="categories" className="form-label">
            Categoria
          </label>
          <select
            onChange={form.updateCategory}
            value={form.categoryId}
            id="categories"
            required
            className="form-select"
          >
            <option value="0">Seleccionar</option>
            {form.categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputState" className="form-label">
            Subcategoria
          </label>
          <select
            value={form.subcategoryId}
            required
            onChange={(e) => {
              form.subcategoryId = parseInt(e.currentTarget.value);
            }}
            id="inputState"
            className="form-select"
          >
            <option value="0">Seleccionar</option>
            {form.subcategories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Example textarea
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
          ></textarea>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
