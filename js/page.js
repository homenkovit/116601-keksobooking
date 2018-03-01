'use strict';

(function () {
  var onPinButtonClickHandler = function (button, card) {
    button.addEventListener('click', function () {
      if (button.querySelector('img').src === card.querySelector('img').src) {
        window.map.mapWindow.insertBefore(card, mapFiltersBlock);
      }
    });
  };
  var mapPinList = window.map.mapWindow.querySelector('.map__pins');

  var mapFiltersBlock = window.map.mapWindow.querySelector('.map__filters-container');
  var getActiveState = function () {
    var pinButtonFragment = document.createDocumentFragment();
    for (var o = 0; o < window.data.length; o++) {
      var pin = window.pin(window.data[o]);
      var card = window.card(window.data[o]);
      onPinButtonClickHandler(pin, card);
      pinButtonFragment.appendChild(pin);
    }
    mapPinList.appendChild(pinButtonFragment);
    window.map.mapWindow.classList.remove('map--faded');
    window.map.setAddress(window.map.mainPinButton, true);
    for (var n = 0; n < window.form.fieldsets.length; n++) {
      window.form.fieldsets[n].removeAttribute('disabled');
    }
    window.form.form.classList.remove('notice__form--disabled');
    window.form.onRoomNumberInputChange();
  };
  window.map.mainPinButton.addEventListener('mouseup', getActiveState);

  var resetFormButton = window.form.form.querySelector('.form__reset');
  var resetPage = function () {
    var formFieldsets = window.form.form.querySelectorAll('fieldset');
    for (var w = 0; w < formFieldsets.length; w++) {
      formFieldsets[w].disabled = 'disabled';
    }
    var formInputs = window.form.form.querySelectorAll('input');
    for (var e = 0; e < formInputs.length; e++) {
      formInputs[e].value = '';
    }
    var formSelects = window.form.form.querySelectorAll('select');
    for (var q = 0; q < formSelects.length; q++) {
      formSelects[q].selectedIndex = 0;
    }
    var pinButtons = mapPinList.querySelectorAll('.map__pin');
    for (var r = 0; r < pinButtons.length; r++) {
      if (!pinButtons[r].classList.contains('map__pin--main')) {
        pinButtons[r].parentElement.removeChild(pinButtons[r]);
      }
    }
    window.form.form.classList.add('notice__form--disabled');
    window.map.mainPinButton.style.top = window.map.defaultMainPinButtonPosition.top + 'px';
    window.map.mainPinButton.style.left = window.map.defaultMainPinButtonPosition.left + 'px';
    window.map.setAddress(window.map.mainPinButton, false);
    window.map.mapWindow.classList.add('map--faded');
  };
  resetFormButton.addEventListener('click', resetPage);

  var errorFormUploadHandler = function (error) {
    var errorWindow = document.querySelector('.error-overlay');
    var errorText = errorWindow.querySelector('.error-text');

    errorText.textContent = 'Ошибка ' + error;
    errorWindow.classList.remove('hidden');
    errorWindow.addEventListener('click', function () {
      errorWindow.classList.add('hidden');
    });
  };
  var submitFormHandler = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(window.form.form), resetPage, errorFormUploadHandler);
  };

  window.form.form.addEventListener('submit', submitFormHandler);
})();
