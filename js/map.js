'use strict';

var OFFER_AVATAR_INDEX_ARRAY = ['01', '02', '03', '04', '05', '06', '07', '08'];
var OFFER_TITLE_ARRAY = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE_ARRAY = ['flat', 'house', 'bungalo'];
var OFFER_CHECKIN_TIME_ARRAY = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT_TIME_ARRAY = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomNumber = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);
  randomNumber = Math.floor(randomNumber);

  return randomNumber;
};
var getRandomElementFromArray = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomElement = array[randomIndex];

  return randomElement;
};
var getUniqRandomElementFromArray = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomElement = array[randomIndex];

  array.splice(randomIndex, 1);

  return randomElement;
};
var shuffleArray = function (array) {
  var currentIndex = array.length;
  var randomIndex;
  var temp;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
};
var getRandomLengthArray = function (array) {
  var randomLength = Math.floor(array.length - Math.random() * array.length);
  var randomLengthArray = [];
  for (var j = 0; j <= randomLength; j++) {
    randomLengthArray[j] = array[j];
  }

  return randomLengthArray;
};

var createSimilarAd = function (offerAvatarIndexArray, offerTitleArray, offerTypeArray, offerCheckinTimeArray, offerCheckoutTimeArray, offerFeaturesArray, offerPhotosArray) {
  var avatarIndex = getUniqRandomElementFromArray(offerAvatarIndexArray);
  var avatar = 'img/avatars/user' + avatarIndex + '.png';
  var offerTitle = getUniqRandomElementFromArray(offerTitleArray);
  var offerPrice = getRandomNumber(1000, 1000000);
  var offerType = getRandomElementFromArray(offerTypeArray);
  var offerRooms = getRandomNumber(1, 5);
  var offerGuests = Math.floor(Math.random() * 10);
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(150, 500);
  var offerAddress = locationX + ', ' + locationY;
  var offerCheckinTime = getRandomElementFromArray(offerCheckinTimeArray);
  var offerCheckoutTime = getRandomElementFromArray(offerCheckoutTimeArray);
  var offerFeatures = getRandomLengthArray(offerFeaturesArray);
  var offerPhotos = shuffleArray(offerPhotosArray);

  var ad = {
    author: {
      avatar: avatar
    },

    offer: {
      title: offerTitle,
      address: offerAddress,
      price: offerPrice,
      type: offerType,
      rooms: offerRooms,
      guests: offerGuests,
      checkin: offerCheckinTime,
      checkout: offerCheckoutTime,
      features: offerFeatures,
      description: '',
      photos: offerPhotos
    },

    location: {
      x: locationX,
      y: locationY
    }
  };

  return ad;
};

var similarAdArray = [];
for (var i = 0; i < 8; i++) {
  similarAdArray[i] = createSimilarAd(OFFER_AVATAR_INDEX_ARRAY, OFFER_TITLE_ARRAY, OFFER_TYPE_ARRAY, OFFER_CHECKIN_TIME_ARRAY, OFFER_CHECKOUT_TIME_ARRAY, OFFER_FEATURES_ARRAY, OFFER_PHOTOS_ARRAY);
}

var mapWindow = document.querySelector('.map');

var mapTemplateContent = document.querySelector('template').content;

var renderPinButton = function (similarAd) {
  var pinButton = mapTemplateContent.querySelector('.map__pin').cloneNode(true);
  var pinAvatar = pinButton.querySelector('img');
  var x = similarAd.location.x - 50 / 2;
  var y = similarAd.location.y - 70;

  pinButton.style.left = x + 'px';
  pinButton.style.top = y + 'px';
  pinAvatar.src = similarAd.author.avatar;

  return pinButton;
};

var renderMapCard = function (similarAd) {
  var mapCard = mapTemplateContent.querySelector('.map__card').cloneNode(true);
  var mapCardCloseButton = mapCard.querySelector('.popup__close');
  var mapCardAvatar = mapCard.querySelector('.popup__avatar');
  var mapCardTitle = mapCard.querySelector('h3');
  var mapCardAddress = mapCardTitle.nextElementSibling.querySelector('small');
  var mapCardPrice = mapCard.querySelector('.popup__price');
  var mapCardType = mapCard.querySelector('h4');
  var mapCardRooms = mapCardType.nextElementSibling;
  var mapCardCheckInOut = mapCardRooms.nextElementSibling;
  var mapCardFeatures = mapCard.querySelector('.popup__features');
  var mapCardDescription = mapCardFeatures.nextElementSibling;
  var mapCardPhotos = mapCard.querySelector('.popup__pictures');

  var closePopup = function () {
    mapCard.parentElement.removeChild(mapCard);
  };
  mapCardCloseButton.addEventListener('click', closePopup);

  var renderFeatures = function (feature) {
    var mapCardFeaturesLi = mapCardFeatures.querySelector('li').cloneNode(true);
    mapCardFeaturesLi.className = 'feature';

    mapCardFeaturesLi.classList.add('feature--' + feature);

    return mapCardFeaturesLi;
  };

  var renderPhotos = function (photo) {
    var mapCardPhotosLi = mapCardPhotos.querySelector('li').cloneNode(true);
    var mapCardPhotosImg = mapCardPhotosLi.querySelector('img');

    mapCardPhotosImg.src = photo;
    mapCardPhotosImg.width = '65';
    mapCardPhotosImg.height = '65';

    return mapCardPhotosLi;
  };

  mapCardAvatar.src = similarAd.author.avatar;
  mapCardTitle.textContent = similarAd.offer.title;
  mapCardAddress.textContent = similarAd.offer.address;
  mapCardPrice.textContent = similarAd.offer.price + ' \u20bd/ночь';

  if (similarAd.offer.type === 'flat') {
    mapCardType.textContent = 'Квартира';
  } else {
    if (similarAd.offer.type === 'house') {
      mapCardType.textContent = 'Дом';
    } else {
      mapCardType.textContent = 'Бунгало';
    }
  }

  mapCardRooms.textContent = similarAd.offer.rooms + ' комнаты для ' + similarAd.offer.guests + ' гостей';
  mapCardCheckInOut.textContent = 'Заезд после ' + similarAd.offer.checkin + ', выезд до ' + similarAd.offer.checkout;
  mapCardDescription.textContent = similarAd.offer.description;

  var mapCardFeaturesFragment = document.createDocumentFragment();
  for (var k = 0; k < similarAd.offer.features.length; k++) {
    mapCardFeaturesFragment.appendChild(renderFeatures(similarAd.offer.features[k]));
  }
  while (mapCardFeatures.firstChild) {
    mapCardFeatures.removeChild(mapCardFeatures.firstChild);
  }
  mapCardFeatures.appendChild(mapCardFeaturesFragment);

  var mapCardPhotosFragment = document.createDocumentFragment();
  for (var l = 0; l < similarAd.offer.photos.length; l++) {
    mapCardPhotosFragment.appendChild(renderPhotos(similarAd.offer.photos[l]));
  }
  while (mapCardPhotos.firstChild) {
    mapCardPhotos.removeChild(mapCardPhotos.firstChild);
  }
  mapCardPhotos.appendChild(mapCardPhotosFragment);

  return mapCard;
};
var onPinButtonClickHandler = function (button, card) {
  button.addEventListener('click', function () {
    if (button.querySelector('img').src === card.querySelector('img').src) {
      mapWindow.insertBefore(card, mapFiltersBlock);
    }
  });
};
var pinButtonFragment = document.createDocumentFragment();
for (var o = 0; o < similarAdArray.length; o++) {
  var pin = renderPinButton(similarAdArray[o]);
  var card = renderMapCard(similarAdArray[o]);
  onPinButtonClickHandler(pin, card);
  pinButtonFragment.appendChild(pin);
}
var mapPinList = mapWindow.querySelector('.map__pins');

var mapFiltersBlock = mapWindow.querySelector('.map__filters-container');

var mainMapPinButton = mapWindow.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');

var MAIN_MAP_PIN_BUTTON_WIDTH = mainMapPinButton.offsetWidth;
var MAIN_MAP_PIN_BUTTON_HEIGHT = mainMapPinButton.offsetHeight;

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
      top: pinButtonDefaultCoordinate.top + MAIN_MAP_PIN_BUTTON_HEIGHT / 2,
      left: pinButtonDefaultCoordinate.left + MAIN_MAP_PIN_BUTTON_WIDTH / 2
    };
  } else {
    pinButtonCoordinate = {
      top: pinButtonDefaultCoordinate.top + MAIN_MAP_PIN_BUTTON_HEIGHT + 22,
      left: pinButtonDefaultCoordinate.left + MAIN_MAP_PIN_BUTTON_WIDTH / 2
    };
  }

  return pinButtonCoordinate;
};

var setAddress = function (pinButton, activeState) {
  var coordinate = {};
  var addressInput = noticeForm.querySelector('#address');
  if (activeState === true) {
    coordinate = getPinButtonCoordinate(pinButton, false);
  } else {
    coordinate = getPinButtonCoordinate(pinButton, true);
  }
  var address = coordinate.left + ', ' + coordinate.top;
  addressInput.value = address;
};
setAddress(mainMapPinButton, false);

var getActiveState = function () {
  mapPinList.appendChild(pinButtonFragment);
  mapWindow.classList.remove('map--faded');
  setAddress(mainMapPinButton, true);
  for (var n = 0; n < noticeFormFieldsets.length; n++) {
    noticeFormFieldsets[n].removeAttribute('disabled');
  }
  noticeForm.classList.remove('notice__form--disabled');
};
mainMapPinButton.addEventListener('mouseup', getActiveState);
