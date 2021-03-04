import query from "./query";

describe("postgres querys", () => {
  it("SELECT", () => {
    const result = query.select();

    const dml = 'SELECT * from "valiu"."tags" ORDER BY "id" ASC;';

    expect(result).toBe(dml);
  });

  it("INSERT", () => {
    const name = "foo";
    const color = "bar";

    const result = query.insert({ name, color });

    const dml = `INSERT INTO "valiu"."tags"("name","color") VALUES('${name}','${color}') RETURNING *`;

    expect(result).toBe(dml);
  });

  it("UPDATE", () => {
    const name = "foo";
    const id = 0;

    const result = query.update({ name, id });

    const dml = `UPDATE "valiu"."tags" SET "name" = '${name}' WHERE "id" = ${id} RETURNING *`;

    expect(result).toBe(dml);
  });

  it("DELETE", () => {
    const id = 0;

    const result = query.delete(id);

    const dml = `DELETE FROM "valiu"."tags" WHERE "id" = ${id} RETURNING *`;

    expect(result).toBe(dml);
  });
});
