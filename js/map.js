'use strict';

(function () {
  var mapWindow = document.querySelector('.map');

  var mainMapPinButton = mapWindow.querySelector('.map__pin--main');
  var mainMapPinButtonWidth = mainMapPinButton.offsetWidth;
  var mainMapPinButtonHeight = mainMapPinButton.offsetHeight;

  var getMainMapPinButtonDefaultCoordinate = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };
  var getPinButtonCoordinate = function (pinButton, defaultState) {
    var pinButtonDefaultCoordinate = getMainMapPinButtonDefaultCoordinate(pinButton);
    var pinButtonCoordinate = {};
    if (defaultState === true) {
      pinButtonCoordinate = {
        top: pinButtonDefaultCoordinate.top + mainMapPinButtonHeight / 2,
        left: pinButtonDefaultCoordinate.left + mainMapPinButtonWidth / 2
      };
    } else {
      pinButtonCoordinate = {
        top: pinButtonDefaultCoordinate.top + mainMapPinButtonHeight + 22,
        left: pinButtonDefaultCoordinate.left + mainMapPinButtonWidth / 2
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
  };
  setAddress(mainMapPinButton, false);

  window.map = {
    mapWindow: mapWindow,
    mainPinButton: mainMapPinButton,
    setAddress: setAddress
  };
})();
