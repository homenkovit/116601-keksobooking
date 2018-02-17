'use strict';

(function () {
  var MAIN_MAP_PIN_BUTTON_WIDTH = 62;
  var MAIN_MAP_PIN_BUTTON_HEIGHT = 62;
  var MAIN_MAP_PIN_BUTTON_POINTER = 22;
  var MAP_MIN_HEIGHT = 150;
  var MAP_MAX_HEIGHT = 500;

  var mapWindow = document.querySelector('.map');
  var mainMapPinButton = mapWindow.querySelector('.map__pin--main');
  var mapPinsPanel = mapWindow.querySelector('.map__pins');
  var getPosition = function (elem) {
    var position = {
      top: elem.offsetTop,
      left: elem.offsetLeft
    };

    return position;
  };
  var defaultMainPinButtonPosition = getPosition(mainMapPinButton);

  var getPinButtonCoordinate = function (pinButton, defaultState) {
    var pinButtonDefaultCoordinate = getPosition(pinButton);
    var pinButtonCoordinate = {};
    if (defaultState === true) {
      pinButtonCoordinate = {
        top: pinButtonDefaultCoordinate.top + (MAIN_MAP_PIN_BUTTON_HEIGHT / 2),
        left: pinButtonDefaultCoordinate.left + (MAIN_MAP_PIN_BUTTON_WIDTH / 2)
      };
    } else {
      pinButtonCoordinate = {
        top: pinButtonDefaultCoordinate.top + (MAIN_MAP_PIN_BUTTON_HEIGHT + MAIN_MAP_PIN_BUTTON_POINTER),
        left: pinButtonDefaultCoordinate.left + (MAIN_MAP_PIN_BUTTON_WIDTH / 2)
      };
    }

    return pinButtonCoordinate;
  };

  var setAddress = function (pinButton, activeState) {
    var coordinate = {};
    var addressInput = window.form.form.querySelector('#address');
    if (activeState === true) {
      coordinate = getPinButtonCoordinate(pinButton, false);
    } else {
      coordinate = getPinButtonCoordinate(pinButton, true);
    }
    var address = coordinate.left + ', ' + coordinate.top;
    addressInput.value = address;

    return coordinate;
  };
  setAddress(mainMapPinButton, false);

  mainMapPinButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainMapPinButton.style.top = (mainMapPinButton.offsetTop - shift.y) + 'px';
      mainMapPinButton.style.left = (mainMapPinButton.offsetLeft - shift.x) + 'px';

      if ((startCoords.y + MAIN_MAP_PIN_BUTTON_HEIGHT + MAIN_MAP_PIN_BUTTON_POINTER) < MAP_MIN_HEIGHT) {
        mainMapPinButton.style.top = MAP_MIN_HEIGHT - MAIN_MAP_PIN_BUTTON_HEIGHT - MAIN_MAP_PIN_BUTTON_POINTER + 'px';
        setAddress(mainMapPinButton, true);
      } else if ((startCoords.y + MAIN_MAP_PIN_BUTTON_HEIGHT + MAIN_MAP_PIN_BUTTON_POINTER) > MAP_MAX_HEIGHT) {
        mainMapPinButton.style.top = MAP_MAX_HEIGHT - MAIN_MAP_PIN_BUTTON_HEIGHT - MAIN_MAP_PIN_BUTTON_POINTER + 'px';
        setAddress(mainMapPinButton, true);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      mapPinsPanel.removeEventListener('mousemove', onMouseMove);
      mapPinsPanel.removeEventListener('mouseup', onMouseUp);
    };

    mapPinsPanel.addEventListener('mousemove', onMouseMove);
    mapPinsPanel.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    mapWindow: mapWindow,
    mainPinButton: mainMapPinButton,
    defaultMainPinButtonPosition: defaultMainPinButtonPosition,
    setAddress: setAddress
  };
})();
