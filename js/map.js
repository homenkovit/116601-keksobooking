'use strict';

var OFFER_TITLE_ARRAY = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE_ARRAY = ['flat', 'house', 'bungalo'];
var OFFER_CHECKIN_TIME_ARRAY = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT_TIME_ARRAY = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']

var getRandomInteger = function (min, max) {
  var randomInteger = min + Math.random() * (max + 1 - min);
  randomInteger = Math.floor(randomInteger);
  return randomInteger;
};
var getRandomAvatar = function (min, max) {
  var randomAvatar = getRandomInteger(min, max);
  randomAvatar = '0' + randomAvatar;
  return randomAvatar;
};
var getRandomElementFromArray = function (array) {
  var randomElement = Math.floor(Math.random() * array.length);
  return array[randomElement];
};
var compareRandom = function (a, b) {
  return 0.5 - Math.random();
}

var createSimilarAd = function (offerTitleArray, offerTypeArray, offerCheckinTimeArray, offerCheckoutTimeArray, offerPhotosArray, offerFeaturesArray) {
  var avatarIndex = getRandomAvatar(1, 8);
  var avatar = 'img/avatars/user' + avatarIndex + '.png';
  var offerTitle = getRandomElementFromArray(offerTitleArray);
  var offerPrice = getRandomInteger(1000, 1000000);
  var offerType = getRandomElementFromArray(offerTypeArray);
  var offerRooms = getRandomInteger(1, 5);
  var offerGuests = Math.floor(Math.random() * 10);
  var locationX = getRandomInteger(300, 900);
  var locationY = getRandomInteger(150, 500);
  var offerAddress = locationX + ', ' + locationY;
  var offerCheckinTime = getRandomElementFromArray(offerCheckinTimeArray);
  var offerCheckoutTime = getRandomElementFromArray(offerCheckoutTimeArray);
  var offerPhotos = offerPhotosArray.sort(compareRandom);
  var offerFeatures = offerFeaturesArray;

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

for (var i = 0; i < 8; i++) {
  console.log(createSimilarAd(OFFER_TITLE_ARRAY, OFFER_TYPE_ARRAY, OFFER_CHECKIN_TIME_ARRAY, OFFER_CHECKOUT_TIME_ARRAY, OFFER_PHOTOS_ARRAY, OFFER_FEATURES_ARRAY));
}
