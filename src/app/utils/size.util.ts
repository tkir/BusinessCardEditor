import {CardField} from "../data/interfaces";
import {Background} from "../data/Background";
export function getCoords(item, elem: Element) {
  return {
    left: elem.getBoundingClientRect().left + pageXOffset,
    top: elem.getBoundingClientRect().top + pageYOffset,
    right: elem.getBoundingClientRect().left + pageXOffset + item.width,
    bottom: elem.getBoundingClientRect().top + pageYOffset+ item.height
  }
}

export interface MovEl {
  item: CardField;
  elem: Element;
  dev: { x: number, y: number };
  max: { x: number, y: number };
  min: { x: number, y: number };
}

export function updateOffset(it: MovEl, event) {

  let pageX = event.pageX - it.dev.x;
  let pageY = event.pageY - it.dev.y;

  if (pageX < it.min.x || pageX > it.max.x) {
    pageX = pageX < it.min.x ? it.min.x : it.max.x;
  }

  if (pageY < it.min.y || pageY > it.max.y) {
    pageY = pageY < it.min.y ? it.min.y : it.max.y;
  }

  if (it.item.left != pageX) it.item.left = pageX;
  if (it.item.top != pageY) it.item.top = pageY;
}

//return min & max element position
export function getMax(item: CardField, element, background:Background): { x: number, y: number } {
  switch (item.instanceOf) {
    case 'Logo':
    case 'Text':
      return {
        x: background.width - background.indent - parseInt(getComputedStyle(element).width),
        y: background.height - background.indent - parseInt(getComputedStyle(element).height)
      };
    case 'Line':
      return {
        x: background.width - parseInt(getComputedStyle(element).width),
        y: background.height - parseInt(getComputedStyle(element).height)
      }
  }
}


export function getMin(item: CardField, element, background:Background): { x: number, y: number } {
  switch (item.instanceOf) {
    case 'Logo':
    case 'Text':
      return {
        x: background.indent,
        y: background.indent
      };
    case 'Line':
      return {
        x: 0,
        y: 0
      }
  }
}
