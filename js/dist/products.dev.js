"use strict";

var ORDER_ASC_BY_COST = "MinMax";
var ORDER_DESC_BY_COST = "MaxMin";
var ORDER_BY_PROD_REL = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array) {
  var result = [];

  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }

      if (a.cost > b.cost) {
        return 1;
      }

      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }

      if (a.cost < b.cost) {
        return 1;
      }

      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_REL) {
    result = array.sort(function (a, b) {
      var aRel = parseInt(a.soldCount);
      var bRel = parseInt(b.soldCount);

      if (aRel > bRel) {
        return -1;
      }

      if (aRel < bRel) {
        return 1;
      }

      return 0;
    });
  }

  return result;
}

function showProductsList() {
  var htmlContentToAppend = "";

  for (var i = 0; i < currentProductsArray.length; i++) {
    var product = currentProductsArray[i];

    if ((minCost == undefined || minCost != undefined && parseInt(product.cost) >= minCost) && (maxCost == undefined || maxCost != undefined && parseInt(product.cost) <= maxCost)) {
      htmlContentToAppend += "\n            <a href=\"product-info.html\" class=\"list-group-item list-group-item-action\">\n                <div class=\"row\">\n                    <div class=\"col-3\">\n                        <img src=\"" + product.imgSrc + "\" alt=\"" + product.description + "\" class=\"img-thumbnail\">\n                    </div>\n                    <div class=\"col\">\n                        <div class=\"d-flex w-100 justify-content-between\">\n                            <h4 class=\"mb-1\">" + product.name + "</h4>\n                            <small class=\"text-muted\">" + product.soldCount + " Vendidos</small>\n                        </div>\n                        <p class=\"mb-1\">" + product.description + "</p>                        \n                        <p class=\"mb-1\">" + product.currency + ": " + product.cost + "</p>                       \n                    </div>                    \n                </div>\n            </a>\n            ";
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
  }
}

function sortAndShowProducts(sortCriteria, categoriesArray) {
  currentSortCriteria = sortCriteria;

  if (categoriesArray != undefined) {
    currentProductsArray = categoriesArray;
  }

  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray); //Muestro las categorías ordenadas

  showProductsList();
} //Funcion para el buscador


function searching() {
  //tomo el valor que se está introduciendo y lo convierto en mayúscula para que sea más fácil el matcheo
  var letra = document.getElementById("buscador").value.toUpperCase();
  var htmlContentToAppend = "";

  for (var i = 0; i < currentProductsArray.length; i++) {
    var product = currentProductsArray[i]; //saco el nombre del auto y lo convierto en mayúscula para que sea más fácil el matcheo

    var nombre = product.name.toUpperCase();
    var descrip = product.description.toUpperCase(); //verifica si está contenido en el nombre o la descripción 

    if (nombre.includes(letra) || descrip.includes(letra)) {
      htmlContentToAppend += "\n            <a href=\"product-info.html\" class=\"list-group-item list-group-item-action\">\n                <div class=\"row\">\n                    <div class=\"col-3\">\n                        <img src=\"" + product.imgSrc + "\" alt=\"" + product.description + "\" class=\"img-thumbnail\">\n                    </div>\n                    <div class=\"col\">\n                        <div class=\"d-flex w-100 justify-content-between\">\n                            <h4 class=\"mb-1\">" + product.name + "</h4>\n                            <small class=\"text-muted\">" + product.soldCount + " Vendidos</small>\n                        </div>\n                        <p class=\"mb-1\">" + product.description + "</p>                        \n                        <p class=\"mb-1\">" + product.currency + ": " + product.cost + "</p>                       \n                    </div>                    \n                </div>\n            </a>\n            ";
    }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
  }
} //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
    }
  });
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
  });
  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST);
  });
  document.getElementById("sortByCost").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_PROD_REL);
  });
  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";
    var bus = document.getElementById("buscador");
    bus.value = "";
    minCost = undefined;
    maxCost = undefined;
    showProductsList();
  });
  document.getElementById("rangeFilterCost").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por costo de producto.
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
      minCost = parseInt(minCost);
    } else {
      minCost = undefined;
    }

    if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
      maxCost = parseInt(maxCost);
    } else {
      maxCost = undefined;
    }

    showProductsList();
  });
});