'use strict';

/**
 * findFirstPosition finds which position is the first one when passed two positions
 * @param {Number} positionOne
 * @param {Number} positionTwo
 */
function findFirstPosition(positionOne, positionTwo) {
  if (positionOne !== -1 && positionTwo !== -1) {
    return positionOne > positionTwo ? positionTwo : positionOne;
  } else if (positionOne !== -1) {
    return positionOne;
  } else if (positionTwo !== -1) {
    return positionTwo;
  }
}

module.exports = findFirstPosition;
