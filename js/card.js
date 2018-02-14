'use strict';

(function () {
  var mapTemplateContent = document.querySelector('template').content;

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

  window.card = renderMapCard;
})();
