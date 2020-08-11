const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}


function validarIngreso(correo, pass) {


    if ((correo == undefine) || (pass == undefine)) { //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        return false;
    }
    document.getElementById("btn-envio").innerHTML = '<object href="inicio.html" ></object>';


}


// aqui se valida si ha ingresado el email y el password
function go() {
    //si están llenos ambos campos da paso al inicio del sitio
    if (!document.getElementById("email").value == "" && !document.getElementById("password").value == "") {
        let boton = document.getElementById("btn-envio");
        boton.setAttribute('href', 'inicio.html');
    }

    //Se valida si email está vacio. En caso de estarlo se coloca el mensaje. Si no está vacio esconde el mensaje
    //porque puede darse el caso de que escribas uno y el otro no, de esta manera se evita que quede visible el mensaje
    if (document.getElementById("email").value == "") {
        let email = document.getElementById("email-null");
        email.style.visibility = 'visible';
        event.preventDefault();
    } else {
        let pass = document.getElementById("email-null");
        pass.style.visibility = 'hidden';
    }

    //Se valida si password está vacio. En caso de estarlo se coloca el mensaje. Si no está vacio esconde el mensaje
    //porque puede darse el caso de que escribas uno y el otro no, de esta manera se evita que quede visible el mensaje
    if (document.getElementById("password").value == "") {
        let pass = document.getElementById("pass-null");
        pass.style.visibility = 'visible';
        event.preventDefault();
    } else {
        let pass = document.getElementById("pass-null");
        pass.style.visibility = 'hidden';
    }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});