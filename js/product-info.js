var product = {};
var mensajes;
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

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
    }
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
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

    var mess = document.getElementById("mensaje").value;
    var estrellas = document.getElementById("selectStar").value;
    var fecha = new Date().toISOString().replace(/T/, " ");
    fecha = fecha.replace(/Z/, "");
    fecha = fecha.slice(0, -4);
    var usuario = sessionStorage.getItem("0");

    mensajes.push({ user: usuario, dateTime: fecha, score: estrellas, description: mess });
    showListComent(mensajes);
    document.getElementById("mensaje").value = "";
    document.getElementById("selectStar").value = "5";

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


});


document.addEventListener("DOMContentLoaded", function(e) {
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