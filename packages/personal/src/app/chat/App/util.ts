export class View {
  private rect: DOMRect = null as any;

  remove() {
    if (!this.ref.style.height) return;

    this.ref.style.height = "";

    if (!this.needResize()) return;

    this.apply();
  }

  apply() {
    const height = this.rect.height + this.rect.top;
    this.ref.style.height = height + "px";
  }

  needResize() {
    this.rect = this.ref.getBoundingClientRect();

    return this.rect.top < 0;
  }

  constructor(private ref: HTMLElement) {}
}
