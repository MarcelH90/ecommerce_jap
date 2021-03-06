const ORDER_ASC_BY_COST = "MinMax";
const ORDER_DESC_BY_COST = "MaxMin";
const ORDER_BY_PROD_REL = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;



function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_REL) {
        result = array.sort(function(a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if (aRel > bRel) { return -1; }
            if (aRel < bRel) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        //prueba
        let product2 = currentProductsArray[i + 1];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {


            htmlContentToAppend += `
                
                   <div class=" col-sm" >
                        <a href="product-info.html" class="list-group-item list-group-item-action">                
                            <div class="row">                        
                                <div >
                                    <img class="autos" src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail" >
                                </div>
                                <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h4 class="mb-1" >` + product.name + `</h4>
                                        <small class="text-muted">` + product.soldCount + ` Vendidos</small>
                                    </div>
                                    <p class="mb-1" >` + product.description + `</p>                        
                                    <p class="mb-1" >` + product.currency + ": " + product.cost + `</p>                       
                                </div>                       
                            </div>
                        </a> 
                   </div>`

        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}


//Funcion para el buscador
function searching() {

    //tomo el valor que se está introduciendo y lo convierto en mayúscula para que sea más fácil el matcheo
    var letra = document.getElementById("buscador").value.toUpperCase();

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        //saco el nombre del auto y lo convierto en mayúscula para que sea más fácil el matcheo
        var nombre = product.name.toUpperCase();
        var descrip = product.description.toUpperCase();
        //verifica si está contenido en el nombre o la descripción 
        if (nombre.includes(letra) || descrip.includes(letra)) {

            htmlContentToAppend += ` <
                    a href = "product-info.html"
                class = "list-group-item list-group-item-action" >
                    <
                    div class = "row" >
                    <
                    div class = "col-3" >
                    <
                    img src = "` + product.imgSrc + `"
                alt = "` + product.description + `"
                class = "img-thumbnail" >
                    <
                    /div> <
                    div class = "col" >
                    <
                    div class = "d-flex w-100 justify-content-between" >
                    <
                    h4 class = "mb-1" > ` + product.name + ` < /h4> <
                    small class = "text-muted" > ` + product.soldCount + `
                Vendidos < /small> <
                    /div> <
                    p class = "mb-1" > ` + product.description + ` < /p>                         <
                    p class = "mb-1" > ` + product.currency + ": " + product.cost + ` < /p>                        <
                    /div>                     <
                    /div> <
                    /a>
                `
        }
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {


    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCost").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";
        var bus = document.getElementById("buscador");
        bus.value = "";
        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });




    document.getElementById("rangeFilterCost").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por costo de producto.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }

        showProductsList();
    });


});