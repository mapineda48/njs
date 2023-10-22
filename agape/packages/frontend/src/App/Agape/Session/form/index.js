import { initForm, isForm } from "form";
import { useSession } from "..";

export default class SessionForm {
  static createHook(log) {
    const prototype = new this();

    if (!isForm(prototype, SessionForm)) {
      throw new Error("unsopport form");
    }

    const useForm = initForm(prototype, log);

    return function useFormSession(init) {
      const session = useSession();

      return useForm(init, session);
    };
  }
}
