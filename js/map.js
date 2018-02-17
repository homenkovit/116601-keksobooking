'use strict';

(function () {
  var mapWindow = document.querySelector('.map');

  var mainMapPinButton = mapWindow.querySelector('.map__pin--main');
  var mapPinsPanel = mapWindow.querySelector('.map__pins');
  var mainMapPinButtonWidth = 62;
  var mainMapPinButtonHeight = 62;
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
        top: pinButtonDefaultCoordinate.top + (mainMapPinButtonHeight / 2),
        left: pinButtonDefaultCoordinate.left + (mainMapPinButtonWidth / 2)
      };
    } else {
      pinButtonCoordinate = {
        top: pinButtonDefaultCoordinate.top + (mainMapPinButtonHeight + 22),
        left: pinButtonDefaultCoordinate.left + (mainMapPinButtonWidth / 2)
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

      if ((startCoords.y + mainMapPinButtonHeight + 22) < 150 || (startCoords.y + mainMapPinButtonHeight + 22) > 500) {
        mapPinsPanel.removeEventListener('mousemove', onMouseMove);
        setAddress(mainMapPinButton, true);
      }

      mainMapPinButton.style.top = (mainMapPinButton.offsetTop - shift.y) + 'px';
      mainMapPinButton.style.left = (mainMapPinButton.offsetLeft - shift.x) + 'px';
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
