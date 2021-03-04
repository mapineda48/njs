import * as client from "./client";
import * as supplier from "./supplier";
import * as employee from "./employee";
import * as sell from "./sell";
import * as buy from "./buy";
import * as product from "./product";

import { Input as BaseInput } from "./common";

export default { client, supplier, employee, sell, buy, product };

export type Input = BaseInput;
