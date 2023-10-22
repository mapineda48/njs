import Form from "../Session/form";
import { IRecord } from "backend/api/model/user";

class Foo extends Form {
  rows: IRecord[] = [];

  async fetch() {
    this.rows = await this.model.user.findAll({});
  }
}

const useForm = Foo.createHook();

export default function Home() {
  const form = useForm();

  return (
    <div>
      <div>Welcome!!!</div>
      <button disabled={form.isLoading} onClick={form.fetch}>
        Fetch
      </button>
      {form.rows.map((row) => (
        <div>
          <div>
            <strong>id:</strong>
            {row.id}
          </div>
          <div>
            <strong>fullName:</strong>
            {row.fullName}
          </div>
          <div>
            <strong>email:</strong>
            {row.email}
          </div>
          <div>
            <strong>createdAt:</strong>
            {row.createdAt.toAppDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
