import { create, State } from ".";

export function fullName(state: State, fullName: string): State {
  return { ...state, full_name: fullName };
}

export function email(state: State, email: string): State {
  return { ...state, email, message: "" };
}

export function city(state: State, city: string): State {
  return { ...state, city };
}

export function department(state: State, department: string): State {
  return { ...state, department };
}

/**
 * https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
 */
function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function check(state: State): State {
  const err = 'Correo Invalido';

  if (state.allFields) {
    if (validateEmail(state.email)) {
      return { ...state, ready: true };
    }
    return { ...state, message: err };
  }

  if (state.email) {
    if (!validateEmail(state.email)) {
      return { ...state, message: err };
    }
  }

  return { ...state, ready: true };
}

export function clearMessage(state: State): State {
  return { ...state, message: "" };
}

export function init(state: State): State {
  return create();
}
