'use strict';

(function () {
  var similarAdArray = [];

  var succesHandler = function (similarAd) {
    for (var i = 0; i < 8; i++) {
      similarAdArray[i] = similarAd[i];
    }
  };
  var errorHandler = function () {
    var errorWindow = document.querySelector('.error-overlay');

    errorWindow.classList.remove('hidden');
    errorWindow.addEventListener('click', function () {
      errorWindow.classList.add('hidden');
    });
  };

  window.backend.load(succesHandler, errorHandler);

  window.data = similarAdArray;
  console.log(similarAdArray);
})();
