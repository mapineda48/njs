export const server = {
  /**
   * Handlers Events
   */
  pairs: {} as Listeners,
  /**
   * Emit Events
   */
  emit(event: string, ...args: any[]) {
    if (!this.pairs[event]) {
      console.log(this.pairs);
      throw new Error(`missing event "${event}"`);
    }

    console.log({
      action: "emit",
      event,
      args,
      handlers: this.pairs[event],
    });
    this.pairs[event].forEach((handler: any) => handler(...args));
  },
  /**
   * Set Handler Events
   */
  on(event: string, ...args: any[]) {
    console.log(`add listener to event "${event}"`);

    if (!this.pairs[event]) {
      this.pairs[event] = [];
    }

    const [handler] = args;

    if (typeof handler === "function") {
      this.pairs[event].push(handler);
    }
  },

  off(event: string, ...args: any[]) {
    console.log(`remove listener to event "${event}"`);

    const [handler] = args;

    this.pairs[event] = this.pairs[event].filter((cb: any) => cb === handler);
  },
};

interface Listeners {
  [K: string]: ((...args: any[]) => void)[];
}
