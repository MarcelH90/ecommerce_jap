var porcientoEnvio = 0.15;
var articles;
var subtotal = 0;
let SUCCESS_MSG = "¡Has comprado con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
var modPagoTrue = false;
var primera = true;


function showCart(articles) {

    var tblBody = document.getElementById("listaCompra");
    //contador de elementos del carrito
    var cont = 0;
    for (let i of articles) {


        const fila = document.createElement("tr");
        fila.id = "fila" + cont;

        //Colocar x para eliminar el producto
        let celdaCancelar = document.createElement("td");
        celdaCancelar.class = "product-remove";
        var botonCancelar = document.createElement("input");
        botonCancelar.id = "btn" + cont;
        botonCancelar.value = "X";
        botonCancelar.type = "button";
        botonCancelar.addEventListener("click", function() {
            deleteFila("fila" + cont);
        }, false);
        celdaCancelar.appendChild(botonCancelar);
        fila.appendChild(celdaCancelar);


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
    showCostoFinal(subtotal);

}

//para llenar la tabla de costo final 
function showCostoFinal(subT) {
    document.getElementById("productCostText").innerHTML = "UYU " + subT;
    document.getElementById("comissionText").innerHTML = "UYU " + subT * porcientoEnvio;
    document.getElementById("totalCostText").innerHTML = "UYU " + (subT + (subT * porcientoEnvio));
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
    subtotal = a + b;

    showCostoFinal(subtotal);
}

//elminiar la fila
$(function() {
    $(document).on('click', 'input[type="button"]', function(event) {
        let id = this.id;
        var bTabla = document.getElementById("listaCompra");

        if (primera) {

            var ident = "fila" + id.slice(3);
            primera = false;
            var elemento = "subtotal" + id.slice(3);
            var valor = document.getElementById(elemento).textContent;
            var cost = parseInt(valor.slice(3));
            if (valor.slice(0, 3) === "USD") {
                cost = cost * 40;
            }
            subtotal -= cost;
            showCostoFinal(subtotal);
            bTabla.deleteRow(id.slice(3));
        } else {
            var ident = "fila" + id.slice(3);
            var elemento = "subtotal" + id.slice(3);
            var valor = document.getElementById(elemento).textContent;
            var cost = valor.slice(3);
            if (valor.slice(0, 3) === "USD") {
                cost = cost * 40;
            }
            subtotal = subtotal - cost;
            showCostoFinal(subtotal);
            bTabla.deleteRow(ident);
        }
        //articles = articles.splice(id, 1);
        //showCart(articles);*/

    });
});


//para actualizar los valores dado el tipo de envio
function porcientEnvio(envio) {
    porcientoEnvio = envio;

    if (document.getElementById("productCostText").textContent != "UYU 0") {
        showCostoFinal(subtotal);
    }


}

//Para validar la forma de pago 
function controlPago() {

    let numTarj = document.getElementById("numTarjeta");
    let codTarj = document.getElementById("codTarj");
    let venTarj = document.getElementById("vencimiento");

    let numCuent = document.getElementById("numCuenta");

    //Chequea si paga con tarjeta de crédito
    if (document.getElementById("checkTCredito").checked == true) {

        //para quitar el marcado del campo de numero cuenta

        numCuent.classList.remove('is-invalid');


        let allcheck = false;

        //Quito las clases que marcan como inválidos
        numTarj.classList.remove('is-invalid');
        codTarj.classList.remove('is-invalid');
        venTarj.classList.remove('is-invalid');


        //Consulto por si los datos de la tarjeta de crédito están ingresados
        if (numTarj.value === "") {
            numTarj.classList.add('is-invalid');
            allcheck = true;
        }

        //Consulto por el número de puerta
        if (codTarj.value === "") {
            codTarj.classList.add('is-invalid');
            allcheck = true;
        }

        //Consulto por la esquina
        if (venTarj.value === "") {
            venTarj.classList.add('is-invalid');
            allcheck = true;
        }

        if (allcheck == false) {
            modPagoTrue = true;

            let msgCheck = document.getElementById("formaPago");
            msgCheck.style.display = 'none';
            $('#seleccionPago').modal('hide');
        }
    }

    //chequea si paga con transferencia
    if (document.getElementById("checkCuenta").checked == true) {

        //para quitar la marca de los campos de tarjeta de credito
        numTarj.classList.remove('is-invalid');
        codTarj.classList.remove('is-invalid');
        venTarj.classList.remove('is-invalid');


        let allcheck = false;

        //Quito las clases que marcan como inválidos
        numCuent.classList.remove('is-invalid');



        //Consulto si los datos de la transferencia fueron completados
        if (numCuent.value === "") {
            numCuent.classList.add('is-invalid');
            allcheck = true;
        }



        if (allcheck == false) {
            modPagoTrue = true;

            let msgCheck = document.getElementById("formaPago");
            msgCheck.style.display = 'none';
            $('#seleccionPago').modal('hide');
        }
    }
}

//función que realiza la compra validando que todos los campos estén llenos
function comprar() {


    let calleInput = document.getElementById("calle");
    let puertaInput = document.getElementById("numPuerta");
    let esquinaInput = document.getElementById("esquina");
    let chequeoTarjeta = document.getElementById("formaPago");
    let infoMissing = false;


    //Quito las clases que marcan como inválidos
    calleInput.classList.remove('is-invalid');
    puertaInput.classList.remove('is-invalid');
    esquinaInput.classList.remove('is-invalid');
    chequeoTarjeta.classList.remove('is-invalid');

    //Se realizan los controles necesarios,
    //En este caso se controla que se haya ingresado calle, número y esquina
    //Consulto por el nombre de la calle
    if (calleInput.value === "") {
        calleInput.classList.add('is-invalid');
        infoMissing = true;
    }

    //Consulto por el número de puerta
    if (puertaInput.value === "") {
        puertaInput.classList.add('is-invalid');
        infoMissing = true;
    }

    //Consulto por la esquina
    if (esquinaInput.value === "") {
        esquinaInput.classList.add('is-invalid');
        infoMissing = true;
    }

    if (modPagoTrue == false) {
        chequeoTarjeta.removeAttribute("hidden");
        infoMissing = true;
    }

    if (!infoMissing) {
        //Aquí ingresa si pasó los controles, irá a enviar
        //la solicitud para crear la publicación.

        getJSONData(CART_BUY_URL).then(function(resultObj) {
            let msgToShowHTML = document.getElementById("resultSpan");
            let msgToShow = "";

            //Si la publicación fue exitosa, devolverá mensaje de éxito,
            //de lo contrario, devolverá mensaje de error.
            if (resultObj.status === 'ok') {
                msgToShow = resultObj.data.msg;
                document.getElementById("alertResult").classList.add('alert-success');
            } else if (resultObj.status === 'error') {
                msgToShow = ERROR_MSG;
                document.getElementById("alertResult").classList.add('alert-danger');
            }

            msgToShowHTML.innerHTML = msgToShow;
            //Si el carrito está vacio lo informa
            if (subtotal == 0) {
                msgToShowHTML.innerHTML = "El carrito está vacio, no se ha comprado nada";
            }

            document.getElementById("alertResult").classList.add("show");

            //borrar los elementos del carrito
            var bTabla = document.getElementById("listaCompra");
            bTabla.remove();

            //borrar la direccion
            document.getElementById("calle").value = "";
            document.getElementById("numPuerta").value = "";
            document.getElementById("esquina").value = "";
            //borrar la tabla de costos generales
            subtotal = 0;
            showCostoFinal(subtotal);
        });
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