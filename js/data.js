'use strict';

(function () {
  var similarAdArray = [];

  var succesHandler = function (similarAd) {
    for (var i = 0; i < 8; i++) {
      similarAdArray[i] = similarAd[i];
    }
  };
  var errorHandler = function (error) {
    console.log(error);
  };

  window.backend.load(succesHandler, errorHandler);

  window.data = similarAdArray;
})();
