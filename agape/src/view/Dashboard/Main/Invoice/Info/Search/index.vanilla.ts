/**
 * https://stackoverflow.com/questions/26423335/elements-coordinates-relative-to-its-parent
 */
export const scrollToChild = (element: HTMLElement, index: number) => {
  const child = element.childNodes.item(index) as HTMLElement;

  if (!child) {
    return;
  }

  /**
   * Rect
   */
  const elementRect = element.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  /**
   * Calc
   */
  const spaceTop = elementRect.top - childRect.top;

  if (spaceTop > 0) {
    element.scrollTop = element.scrollTop - spaceTop;
  }

  const spaceBottom = childRect.bottom - elementRect.bottom;

  if (spaceBottom > 0) {
    element.scrollTop = element.scrollTop + spaceBottom;
  }
};

export const setHeight = (element: HTMLElement) => {
  /**
   * HTMLElements
   */
  const target = element.previousElementSibling as HTMLElement;
  const child = element.firstElementChild as HTMLElement;

  if (!target || !child) {
    return;
  }

  /**
   * Const
   */
  const amountChild = element.childElementCount;
  const targetTop = target.getBoundingClientRect().top;
  const childHeight = child.clientHeight;

  /**
   * Calc Height
   */
  const maxAmountItem = Math.round(targetTop / childHeight) - 1;
  const totalHeight = childHeight * amountChild;
  const maxHeight = childHeight * maxAmountItem;
  const height = totalHeight < maxHeight ? totalHeight : maxHeight;

  element.style.height = height + "px";
};
