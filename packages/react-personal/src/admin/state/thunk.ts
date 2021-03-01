import http from "../http";
import type { Admin } from ".";

export async function fetchState(admin: Admin) {
  admin.maps.loading();
  try {
    const state = await http.fetchState();
    admin.maps.setActive(state.maps);
  } catch (error) {
    admin.maps.setMessage("fail sync with server", () => {
      admin.maps.setMessage("");
    });
  } finally {
    admin.maps.loading(false);
  }
}

export async function setMaps(admin: Admin, state: boolean) {
  admin.maps.loading();
  try {
    await http.setMaps(state);
  } catch (error) {
    admin.maps.setMessage(error.message, () => {
      admin.maps.setMessage("");
    });
  } finally {
    admin.maps.loading(false);
  }
}
