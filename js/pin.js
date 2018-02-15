'use strict';

(function () {
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

  window.pin = renderPinButton;
})();
