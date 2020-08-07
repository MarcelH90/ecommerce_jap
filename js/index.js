/*/Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {


});*/
function validarIngreso() {

    var correo = document.getElementById("mail")[0].value;
    var pass = document.getElementsById("pass")[0].value;


    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


    if (!expr.test(correo)) { //COMPRUEBA MAIL
        alert("Error: La dirección de correo " + correo + " es incorrecta.");
        return false;
    }

    if ((correo == "") || (pass == "")) { //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        return false;
    }


}