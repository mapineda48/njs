export const env = {
  inNode: false,
};

/**
 * Cache
 * when I implemented that I was thinking that it
 * would work the same as sessionStorage (I'm just improvising a bit).
 */
export class Cache<T = any> {
  private data: string = "";

  set(state: Partial<T>) {
    this.data = JSON.stringify(state);
  }
  get(): Partial<T> {
    if (!this.data) return {};

    try {
      const state = JSON.parse(this.data);

      return state;
    } catch (error) {
      this.data = "";
      return {};
    }
  }
}

export default Cache;
