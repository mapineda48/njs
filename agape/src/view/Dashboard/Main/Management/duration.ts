export const setDuration = (input: Input) => {
  const duration = input.short ? ".5s" : ".8s";

  return input.name + " " + duration;
};

interface Input {
  name: string;
  short: boolean;
}
