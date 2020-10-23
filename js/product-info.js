var product = {};
var mensajes;
var estrellas = 0;
var estrellitas = [
    `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    `,
    `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    `,
    `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star "></span>
                    <span class="fa fa-star "></span>
                    `,
    `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star "></span>
                    `,
    `
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    `


];
//muestra la imagenes del producto
function showImagesGallery(array) {

    //Inicio las variables en la primera posicion para activar esta posicion
    let htmlContentToAppend = `<div div class="carousel-item active"><img src="` + array[0] + `" class="d-block w-100" alt=""></div>`;
    let htmlContentSlide = `<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`;

    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentSlide += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `" class="active"></li>`

        htmlContentToAppend += `
          <div class="carousel-item">
           <img src="` + imageSrc + `" class="d-block w-100" alt="">
          </div>    
       `
    }
    document.getElementById("slides").innerHTML = htmlContentSlide;
    document.getElementById("carrusel").innerHTML = htmlContentToAppend;


}



//funcion encargada de mostrar los comentarios
function showListComent(comentArray) {
    var htmlComentToAppend = '';

    for (let i = 0; i < comentArray.length; i++) {
        comentario = comentArray[i];

        htmlComentToAppend += `
            
                <div class="row">
                    
                    <div class="col">
                        
                        <p class="mb-1"> <strong>` + comentario.user + `</strong> ` + " - " + comentario.dateTime + " - " + estrellitas[comentario.score - 1] + `</p>                        
                        <p class="mb-1">` + comentario.description + `</p>     
                        <hr>                 
                    </div>                                        
                </div>            
            `
    }
    document.getElementById("listComent").innerHTML = htmlComentToAppend;
}

//funcion para colocar el mensaje nuevo
function sendMessenge() {
    if (estrellas == 0 || document.getElementById("mensaje").value == "") {
        alert("Debe escribir mensaje y colocar puntuación al producto");
    } else {
        var mess = document.getElementById("mensaje").value;
        //var estrellas = document.getElementById("selectStar").value;
        var fecha = new Date().toISOString().replace(/T/, " ");
        fecha = fecha.replace(/Z/, "");
        fecha = fecha.slice(0, -4);
        var usuario = sessionStorage.getItem("0");

        mensajes.push({ user: usuario, dateTime: fecha, score: estrellas, description: mess });
        showListComent(mensajes);
        document.getElementById("mensaje").value = "";
        estrellas = 0;
        document.getElementById("selectStar").innerHTML = `
            <input class="selectStar" id="radio1" type="radio" name="estrellas" value="5" onclick="chekStar(5)">
            <!--
            --><label class="selectStar" for="radio1">★</label>
            <!--
            --><input class="selectStar" id="radio2" type="radio" name="estrellas" value="4" onclick="chekStar(4)">
            <!--
            --><label class="selectStar" for="radio2">★</label>
            <!--
            --><input class="selectStar" id="radio3" type="radio" name="estrellas" value="3" onclick="chekStar(3)">
            <!--
            --><label class="selectStar" for="radio3">★</label>
            <!--
            --><input class="selectStar" id="radio4" type="radio" name="estrellas" value="2" onclick="chekStar(2)">
            <!--
            --><label class="selectStar" for="radio4">★</label>
            <!--
            --><input class="selectStar" id="radio5" type="radio" name="estrellas" value="1" onclick="chekStar(1)">
            <!--
            --><label class="selectStar" for="radio5">★</label>`;
    }
}

//para colocar la cantidad de estrellas marcadas
function chekStar(numstar) {
    estrellas = numstar;
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCostHTML.innerHTML = product.currency + ": " + product.cost;


            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj2) {
        if (resultObj2.status === "ok") {
            mensajes = resultObj2.data;
            showListComent(mensajes);
        }
    });

    //productos relacionado
    getJSONData(PRODUCTS_URL).then(function(resultObj3) {
        if (resultObj3.status === "ok") {
            productos = resultObj3.data;
            var htmlContentToRelated = "";
            for (let i = 0; i < product.relatedProducts.length; i++) {

                htmlContentToRelated += `                  
                <div class="col-lg-3 col-md-4 col-6 ">
                     <div class="d-block mb-4 h-100  ">
                        <img class="img-fluid img-thumbnail" src="` + productos[product.relatedProducts[i]].imgSrc + `" alt="">                        
                        <a href="products.html">` + productos[product.relatedProducts[i]].name + `</a>
                     </div>
                    </div>
                  `
            }
            document.getElementById("productrelated").innerHTML = htmlContentToRelated;
        }
    });


});