

/**
 * THIS OBJECT WILL ONLY WORK IF your target is positioned relative or absolute,
 * or anything that works with the top and left css properties (not static).
 *
 * Howto
 * ============
 *
 * document.getElementById('my_target').sdrag();
 *
 * onDrag, onStop
 * -------------------
 * document.getElementById('my_target').sdrag(onDrag, null);
 * document.getElementById('my_target').sdrag(null, onStop);
 * document.getElementById('my_target').sdrag(onDrag, onStop);
 *
 * Both onDrag and onStop callback take the following arguments:
 *
 * - el, the currentTarget element (#my_target in the above examples)
 * - pageX: the mouse event's pageX property (horizontal position of the mouse compared to the viewport)
 * - startX: the distance from the element's left property to the horizontal mouse position in the viewport.
 *                  Usually, you don't need to use that property; it is internally used to fix the undesirable
 *                  offset that naturally occurs when you don't drag the element by its top left corner
 *                  (for instance if you drag the element from its center).
 * - pageY: the mouse event's pageX property (horizontal position of the mouse compared to the viewport)
 * - startY: same as startX, but for the vertical axis (and element's top property)
 *
 *
 *
 * The onDrag callback accepts an extra argument: fix.
 *
 * fix is an array used to fix the coordinates applied to the target.
 *
 * It can be used to constrain the movement of the target inside of a virtual rectangle area for instance.
 * Put a variable in the fix array to override it.
 * The possible keys are:
 *
 * - pageX
 * - startX
 * - pageY
 * - startY
 * - skipX
 * - skipY
 *
 * skipX and skipY let you skip the updating of the target's left property.
 * This might be required in some cases where the positioning of the target
 * is automatically done by the means of other css properties.
 *
 * 
 *
 *
 *
 *
 * Direction
 * -------------
 * With direction, you can constrain the drag to one direction only: horizontal or vertical.
 * Accepted values are:
 *
 * - <undefined> (the default)
 * - vertical
 * - horizontal
 *
 *
 *
 *
 */

export type SDragableElement = HTMLElement | SVGElement ;

// The callback types for the drag and stop actions
export type DragCallback = (
  el: HTMLElement | SVGElement,
  pageX: number,
  startX: number,
  pageY: number,
  startY: number,
  fix: Record<string, any>
) => void;
  
export type StopCallback = (
  el: HTMLElement | SVGElement,
  pageX: number,
  startX: number,
  pageY: number,
  startY: number
) => void;

export function makeDragalbe(
  self: HTMLElement | SVGElement,
  onDrag?: DragCallback,
  onStop?: StopCallback,
  direction?: 'vertical' | 'horizontal'
): void {
  let startX: number = 0;
  let startY: number = 0;
  let dragging: boolean = false;

  const move = (e: MouseEvent): void => {
    const fix: Record<string, any> = {};
    onDrag?.(self, e.pageX, startX, e.pageY, startY, fix);

    if (direction !== 'vertical') {
      const pageX: number = 'pageX' in fix ? fix.pageX : e.pageX;
      if ('startX' in fix) {
        startX = fix.startX;
      }
      if (!('skipX' in fix)) {
          self.style.left = `${pageX - startX}px`;
      }
    }
    if (direction !== 'horizontal') {
      const pageY: number = 'pageY' in fix ? fix.pageY : e.pageY;
      if ('startY' in fix) {
        startY = fix.startY;
      }
      if (!('skipY' in fix)) {
          self.style.top = `${pageY - startY}px`;
      }
    }
  };

  const startDragging = (e: MouseEvent): void => {
    if (e.currentTarget instanceof HTMLElement || e.currentTarget instanceof SVGElement) {
      dragging = true;
      const left = self.style.left ? parseInt(self.style.left) : 0;
      const top = self.style.top ? parseInt(self.style.top) : 0;
      // const rect = self.getBoundingClientRect();
      // const left  = rect.left;
      // const top = rect.top;
      startX = e.pageX - left;
      startY = e.pageY - top;
      window.addEventListener('mousemove', move);
    } else {
      throw new Error("Your target must be an HTML or SVG element");
    }
  };

  self.addEventListener('mousedown', startDragging as EventListenerOrEventListenerObject);
  window.addEventListener('mouseup', (e: MouseEvent): void => {
    if (dragging) {
      dragging = false;
      window.removeEventListener('mousemove', move);
      onStop?.(self, e.pageX, startX, e.pageY, startY);
    }
  });
}
  
// (typeof window != 'undefined') && (function () {
// })();