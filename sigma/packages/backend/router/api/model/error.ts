import { ValidationError } from "sequelize";
import FriendlyError from "../../error";

export function parseErrorModel(val: unknown): [number, string] {
    if (val instanceof ValidationError) {
        const message = val.errors.map(err => err.message).join("\n");
        return [400, message];
    }

    if (val instanceof FriendlyError) {
        return [val.code, val.message];
    }

    console.error(val);

    return [500, "unhandler error"];
}


/**
 * Types
 */
interface ErrorInterface<T extends Error = Error> {
    new(name: string): T;
}