"use strict";

var product = {};

function showImagesGallery(array) {
  var htmlContentToAppend = "";

  for (var i = 0; i < array.length; i++) {
    var imageSrc = array[i];
    htmlContentToAppend += "\n        <div class=\"col-lg-3 col-md-4 col-6\">\n            <div class=\"d-block mb-4 h-100\">\n                <img class=\"img-fluid img-thumbnail\" src=\"" + imageSrc + "\" alt=\"\">\n            </div>\n        </div>\n        ";
  }

  document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
} //funcion encargada de mostrar los comentarios


function showListComent(comentArray) {
  for (var i = 0; i < comentArray.length; i++) {
    var comentario = comentArray[i];
    htmlComentToAppend += "\n            \n                <div class=\"row\">\n                    \n                    <div class=\"col\">\n                        \n                        <p class=\"mb-1\">" + comentario.user + "</p>                        \n                                             \n                    </div>                    \n                </div>\n            \n            ";
  }

  document.getElementById("listComent").innerHTML = htmlComentToAppend;
} //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;
      var productNameHTML = document.getElementById("productName");
      var productDescriptionHTML = document.getElementById("productDescription");
      var productCountHTML = document.getElementById("productCount");
      var productCostHTML = document.getElementById("productCost");
      var productCurrencyHTML = document.getElementById("productCurrency");
      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCountHTML.innerHTML = product.soldCount;
      productCostHTML.innerHTML = product.currency + ": " + product.cost; //Muestro las imagenes en forma de galería

      showImagesGallery(product.images);
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj2) {
    if (resultObj2.status === "ok") {
      showListComent(resultObj2.data);
    }
  });
});