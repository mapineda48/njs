import { Sequelize } from "sequelize";
import createModel from "../lib/model";

const seq = new Sequelize(process.env.DATABASE_URL || "unknwon");

(async () => {
  const model = await createModel(seq);

  const page = 3;

  const amount = 10;

  const offset = amount * (page - 1);

  const res = await model.message.findAll({
    limit: amount,
    offset,
  });

  const msg = res.map((msg) => msg.get());

  console.log(msg.length);
})().catch(console.error);
