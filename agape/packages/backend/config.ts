export const isDev = !(process.env.NODE_ENV === "production");

export const agapeApp = isDev ? "../frontend/build" : "frontend";
