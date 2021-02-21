const { pathname } = document.location;

export const isAdmin = /admin$/.test(pathname) || /admin\/$/.test(pathname);
