export async function wait(time = 100) {
  return new Promise((res, rej) => {
    setTimeout(res, time);
  });
}

export async function getGreet() {
  await wait();

  return "Hello world";
}
