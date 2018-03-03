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

  var removeAllPins = function () {
    var pins = mapPinList.querySelectorAll('.map__pin');
    pins.forEach(function (el) {
      if (!el.classList.contains('map__pin--main')) {
        el.parentElement.removeChild(el);
      }
    });
  };

  var renderAllPins = function () {
    var pinButtonFragment = document.createDocumentFragment();
    window.data.forEach(function (el) {
      var pin = window.pin(el);
      var card = window.card(el);
      onPinButtonClickHandler(pin, card);
      pinButtonFragment.appendChild(pin);
    });
    mapPinList.appendChild(pinButtonFragment);
  };

  // Activate page - start
  var getActiveState = function () {
    renderAllPins();
    window.map.mapWindow.classList.remove('map--faded');
    window.map.setAddress(window.map.mainPinButton, true);
    for (var n = 0; n < window.form.fieldsets.length; n++) {
      window.form.fieldsets[n].removeAttribute('disabled');
    }
    window.form.form.classList.remove('notice__form--disabled');
    window.form.onRoomNumberInputChange();

    var housingTypeFilter = mapFiltersBlock.querySelector('#housing-type');
    housingTypeFilter.addEventListener('input', function () {
      var filterRenderFunction = function (value) {
        removeAllPins();
        var fragment = document.createDocumentFragment();
        window.data.filter(function (el) {
          return el.offer.type + '' === value;
        }).forEach(function (it) {
          var pinButton = window.pin(it);
          var pinCard = window.card(it);
          onPinButtonClickHandler(pinButton, pinCard);
          fragment.appendChild(pinButton);
        });
        mapPinList.appendChild(fragment);
      };
      var inputValue = housingTypeFilter.value;
      switch (inputValue) {
        case 'flat':
          filterRenderFunction('flat');
          break;
        case 'house':
          filterRenderFunction('house');
          break;
        case 'bungalo':
          filterRenderFunction('bungalo');
          break;
        default: renderAllPins();
      }
    });
    var housingRoomsFilter = mapFiltersBlock.querySelector('#housing-rooms');
    housingRoomsFilter.addEventListener('input', function () {
      var filterRenderFunction = function (value) {
        removeAllPins();
        var fragment = document.createDocumentFragment();
        window.data.filter(function (el) {
          return el.offer.rooms + '' === value;
        }).forEach(function (it) {
          var pinButton = window.pin(it);
          var pinCard = window.card(it);
          onPinButtonClickHandler(pinButton, pinCard);
          fragment.appendChild(pinButton);
        });
        mapPinList.appendChild(fragment);
      };
      var inputValue = housingRoomsFilter.value;
      switch (inputValue) {
        case '1':
          filterRenderFunction('1');
          break;
        case '2':
          filterRenderFunction('2');
          break;
        case '3':
          filterRenderFunction('3');
          break;
        default: renderAllPins();
      }
    });
    var housingPriceFilter = mapFiltersBlock.querySelector('#housing-price');
    housingPriceFilter.addEventListener('input', function () {
      var fragment = document.createDocumentFragment();
      var inputValue = housingPriceFilter.value;
      if (inputValue === 'low') {
        removeAllPins();
        window.data.filter(function (el) {
          return el.offer.price < 10000;
        }).forEach(function (it) {
          var pinButton = window.pin(it);
          var pinCard = window.card(it);
          onPinButtonClickHandler(pinButton, pinCard);
          fragment.appendChild(pinButton);
        });
      } else if (inputValue === 'high') {
        removeAllPins();
        window.data.filter(function (el) {
          return el.offer.price > 50000;
        }).forEach(function (it) {
          var pinButton = window.pin(it);
          var pinCard = window.card(it);
          onPinButtonClickHandler(pinButton, pinCard);
          fragment.appendChild(pinButton);
        });
      } else if (inputValue === 'middle') {
        removeAllPins();
        window.data.filter(function (el) {
          return el.offer.price >= 10000 && el.offer.price <= 50000;
        }).forEach(function (it) {
          var pinButton = window.pin(it);
          var pinCard = window.card(it);
          onPinButtonClickHandler(pinButton, pinCard);
          fragment.appendChild(pinButton);
        });

        mapPinList.appendChild(fragment);
      }
    });
    var housingGuestsFilter = mapFiltersBlock.querySelector('#housing-guests');
    housingGuestsFilter.addEventListener('input', function () {
      var filterRenderFunction = function (value) {
        removeAllPins();
        var fragment = document.createDocumentFragment();
        window.data.filter(function (el) {
          return el.offer.guests + '' === value;
        }).forEach(function (it) {
          var pinButton = window.pin(it);
          var pinCard = window.card(it);
          onPinButtonClickHandler(pinButton, pinCard);
          fragment.appendChild(pinButton);
        });
        removeAllPins();
        mapPinList.appendChild(fragment);
      };
      var inputValue = housingGuestsFilter.value;
      switch (inputValue) {
        case '1':
          filterRenderFunction('1');
          break;
        case '2':
          filterRenderFunction('2');
          removeAllPins();
          break;
        default: renderAllPins();
      }
    });
  };
  window.map.mainPinButton.addEventListener('mouseup', getActiveState);
  // Activate page - end

  // Reset page - start
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
    removeAllPins();
    window.form.form.classList.add('notice__form--disabled');
    window.map.mainPinButton.style.top = window.map.defaultMainPinButtonPosition.top + 'px';
    window.map.mainPinButton.style.left = window.map.defaultMainPinButtonPosition.left + 'px';
    window.map.setAddress(window.map.mainPinButton, false);
    window.map.mapWindow.classList.add('map--faded');
  };
  resetFormButton.addEventListener('click', resetPage);
  // Reset page - end

  // Submit form - start
  var errorFormUploadHandler = function () {
    var errorWindow = document.querySelector('.error-overlay');

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
  // Submit form - end
})();
