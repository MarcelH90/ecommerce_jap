var porcientoEnvio = 0.15;
var articles;
var subtotal = 0;


function showCart(articles) {

    var tblBody = document.getElementById("listaCompra");
    //contador de elementos del carrito
    var cont = 0;
    for (let i of articles) {


        const fila = document.createElement("tr");

        /*//Colocar x para eliminar el producto
        let celdaCancelar = document.createElement("td");
        var botonCancelar = document.createElement("a");
        botonCancelar.id="btn"+cont;
        botonCancelar.text = "X";
        botonCancelar.onclick = elimCompra;
        celdaCancelar.appendChild(botonCancelar);
        fila.appendChild(celdaCancelar);*/

        //imagen de los productos del carrito
        let celdaImagen = document.createElement("td");
        var img = document.createElement('img');
        img.src = i.src;
        img.height = 75;
        celdaImagen.appendChild(img);
        fila.appendChild(celdaImagen);

        //nombre de los productos del carrito
        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = i.name;
        fila.appendChild(celdaNombre);

        //costo de los productos del carrito
        let celdaCosto = document.createElement("td");
        celdaCosto.id = "costo" + cont;
        celdaCosto.textContent = i.currency + " " + i.unitCost;
        fila.appendChild(celdaCosto);


        //cantidad de los productos del carrito
        let celdaCantidad = document.createElement("td");
        let inputCantidad = document.createElement("input");
        inputCantidad.id = cont;
        inputCantidad.type = "number";
        inputCantidad.step = "1";
        inputCantidad.min = "0";
        inputCantidad.max = "";
        inputCantidad.value = i.count;
        inputCantidad.size = "1";
        inputCantidad.pattern = "[0-9]*";
        inputCantidad.style.width = "50px";
        inputCantidad.onclick = updateValue;
        inputCantidad.onkeyup = updateValue;
        celdaCantidad.appendChild(inputCantidad);
        fila.appendChild(celdaCantidad);

        //subtotal de los productos del carrito
        let celdaSubtotal = document.createElement("td");
        celdaSubtotal.id = "subtotal" + cont;
        celdaSubtotal.textContent = i.currency + " " + (i.count * i.unitCost);
        fila.appendChild(celdaSubtotal);


        if (i.currency == "UYU") {
            subtotal += i.unitCost * i.count;
        } else {
            subtotal += i.unitCost * 40 * i.count;
        }
        tblBody.appendChild(fila);
        cont++;
    }
    document.getElementById("productCostText").innerHTML = "UYU " + subtotal;
    document.getElementById("comissionText").innerHTML = "UYU " + subtotal * porcientoEnvio;
    document.getElementById("totalCostText").innerHTML = "UYU " + (subtotal + (subtotal * porcientoEnvio));

}

//para capturar el evento de los input de cantidad

function updateValue() {
    var cantNueva = document.getElementById("0").value;
    var moneda = document.getElementById("costo0").textContent;
    var denominacion = moneda.substring(0, 3);
    moneda = moneda.slice(3);
    document.getElementById("subtotal0").innerHTML = denominacion + " " + (cantNueva * moneda);


    var cantNueva = document.getElementById("1").value;
    var moneda = document.getElementById("costo1").textContent;
    var denominacion = moneda.substring(0, 3);
    moneda = moneda.slice(3);
    document.getElementById("subtotal1").innerHTML = denominacion + " " + (cantNueva * moneda);

    var a = document.getElementById("subtotal0").textContent;
    a = parseInt(a.slice(3));
    var b = document.getElementById("subtotal1").textContent;
    b = parseInt(b.slice(3)) * 40;
    var sub = a + b;

    var porCiento = sub * porcientoEnvio;
    document.getElementById("productCostText").innerHTML = "UYU " + sub;
    document.getElementById("comissionText").innerHTML = "UYU " + porCiento;
    document.getElementById("totalCostText").innerHTML = "UYU " + (sub + porCiento);
}


//para actualizar los valores dado el tipo de envio
function porcientEnvio(envio) {
    porcientoEnvio = envio;

    if (document.getElementById("productCostText").textContent != "UYU 0") {
        document.getElementById("comissionText").innerHTML = "UYU " + subtotal * porcientoEnvio;
        document.getElementById("totalCostText").innerHTML = "UYU " + (subtotal + (subtotal * porcientoEnvio));
    }


}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            articles = resultObj.data.articles;
            showCart(articles);
        }
    });



});