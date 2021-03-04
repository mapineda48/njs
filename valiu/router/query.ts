const query = {
  select() {
    return 'SELECT * from "valiu"."tags" ORDER BY "id" ASC;';
  },

  insert(tag: any) {
    return `INSERT INTO "valiu"."tags"("name","color") VALUES('${tag.name}','${tag.color}') RETURNING *`;
  },

  update(tag: any) {
    return `UPDATE "valiu"."tags" SET "name" = '${tag.name}' WHERE "id" = ${tag.id} RETURNING *`;
  },

  delete(id: number) {
    return `DELETE FROM "valiu"."tags" WHERE "id" = ${id} RETURNING *`;
  },
};

export default query;
