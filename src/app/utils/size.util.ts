export function getCoords(item, elem: Element) {
  return {
    left: elem.getBoundingClientRect().left + pageXOffset,
    top: elem.getBoundingClientRect().top + pageYOffset,
    right: elem.getBoundingClientRect().left + pageXOffset + item.width,
    bottom: elem.getBoundingClientRect().top + pageYOffset+ item.height
  }
}
