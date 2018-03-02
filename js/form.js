'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  var typeInput = noticeForm.querySelector('#type');
  var priceInput = noticeForm.querySelector('#price');
  var typeInputSelectedValue = typeInput.options[typeInput.selectedIndex].value;

  if (typeInputSelectedValue === 'flat') {
    priceInput.setAttribute('min', '1000');
  } else if (typeInputSelectedValue === 'bungalo') {
    priceInput.setAttribute('min', '0');
  } else if (typeInputSelectedValue === 'house') {
    priceInput.setAttribute('min', '5000');
  } else if (typeInputSelectedValue === 'palace') {
    priceInput.setAttribute('min', '10000');
  }

  var changePriceInputMin = function () {
    if (typeInput.value === 'flat') {
      priceInput.setAttribute('min', '1000');
    } else if (typeInput.value === 'bungalo') {
      priceInput.setAttribute('min', '0');
    } else if (typeInput.value === 'house') {
      priceInput.setAttribute('min', '5000');
    } else if (typeInput.value === 'palace') {
      priceInput.setAttribute('min', '10000');
    }
  };
  typeInput.addEventListener('input', changePriceInputMin);

  var timeInInput = noticeForm.querySelector('#timein');
  var timeOutInput = noticeForm.querySelector('#timeout');

  var changeTimeValue = function (firstSelect, secondSelect) {
    if (firstSelect.value === '12:00') {
      secondSelect.selectedIndex = 0;
    } else if (firstSelect.value === '13:00') {
      secondSelect.selectedIndex = 1;
    } else if (firstSelect.value === '14:00') {
      secondSelect.selectedIndex = 2;
    }
  };
  timeInInput.addEventListener('input', function () {
    changeTimeValue(timeInInput, timeOutInput);
  });
  timeOutInput.addEventListener('input', function () {
    changeTimeValue(timeOutInput, timeInInput);
  });

  var roomNumberInput = noticeForm.querySelector('#room_number');
  var capacityInput = noticeForm.querySelector('#capacity');

  var onRoomNumberInputChange = function () {
    var capacityInputOptions = capacityInput.options;
    if (roomNumberInput.value === '100') {
      for (var u = 0; u < capacityInputOptions.length; u++) {
        capacityInput.selectedIndex = 3;
        if (capacityInputOptions[u].value !== '0') {
          capacityInputOptions[u].disabled = true;
        } else {
          capacityInputOptions[u].disabled = false;
        }
      }
    }
    if (roomNumberInput.value === '1') {
      for (u = 0; u < capacityInputOptions.length; u++) {
        capacityInput.selectedIndex = 2;
        if (capacityInputOptions[u].value !== '1') {
          capacityInputOptions[u].disabled = true;
        } else {
          capacityInputOptions[u].disabled = false;
        }
      }
    }
    if (roomNumberInput.value === '2') {
      for (u = 0; u < capacityInputOptions.length; u++) {
        if (capacityInputOptions[u].value === '0' || capacityInputOptions[u].value === '3') {
          capacityInputOptions[u].disabled = true;
        } else {
          capacityInputOptions[u].disabled = false;
        }
      }
    }
    if (roomNumberInput.value === '3') {
      for (u = 0; u < capacityInputOptions.length; u++) {
        if (capacityInputOptions[u].value === '0') {
          capacityInputOptions[u].disabled = true;
        } else {
          capacityInputOptions[u].disabled = false;
        }
      }
    }
  };

  roomNumberInput.addEventListener('input', onRoomNumberInputChange);
  capacityInput.addEventListener('input', onRoomNumberInputChange);

  window.form = {
    form: noticeForm,
    fieldsets: noticeFormFieldsets,
    onRoomNumberInputChange: onRoomNumberInputChange
  };
})();
