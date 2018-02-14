'use strict';

(function () {
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

  window.data = similarAdArray;
})();
