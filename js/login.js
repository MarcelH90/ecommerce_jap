sessionStorage.setItem("0", "true");
sessionStorage.setItem("1", "true");


// aqui se valida si ha ingresado el email y el password funciona para cualquiera convinación posible con email y password tenga
function go() {
    //si están llenos ambos campos da paso al inicio del sitio
    if (!document.getElementById("email").value == "" && !document.getElementById("password").value == "") {
        let boton = document.getElementById("btn-envio");
        boton.setAttribute('href', 'index.html');
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