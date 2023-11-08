export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { sync } = await import("@/models");
    await sync();

    const { default: Storage } = await import("@/storage");
    await Storage.Init();
  }
}
