function MostrarDatos() {
    //Sacando los datos del Local Storage y convirtiendolo en objeto     

    let datos = JSON.parse(localStorage.getItem("0"));

    document.getElementById("nombres").innerHTML = "Nombres: " + datos.Nombre + " " + datos.SegundoNombre;
    document.getElementById("apellidos").innerHTML = "Apellidos: " + datos.PrimerApellido + " " + datos.SegundoApellido;
    document.getElementById("edadText").innerHTML = "Edad: " + datos.Edad;
    document.getElementById("telefonoText").innerHTML = "Teléfono: " + datos.Telefono;
    document.getElementById("correo").innerHTML = "Correo: " + datos.Email;




}
MostrarDatos();


//para guardar los datos
function saveProfile() {
    let allcheck = false;

    var datosPersonales = new Object();

    datosPersonales.Nombre = document.getElementById("primerNombre").value;
    datosPersonales.SegundoNombre = document.getElementById("segundoNombre").value;
    datosPersonales.PrimerApellido = document.getElementById("primerApellido").value;
    datosPersonales.SegundoApellido = document.getElementById("segundoApellido").value;
    datosPersonales.Edad = document.getElementById("edad").value;
    datosPersonales.Email = document.getElementById("correoPersonal").value;
    datosPersonales.Telefono = document.getElementById("telefono").value;

    //Quito las clases que marcan como inválidos
    primerNombre.classList.remove('is-invalid');
    primerApellido.classList.remove('is-invalid');
    edad.classList.remove('is-invalid');
    telefono.classList.remove('is-invalid');
    correoPersonal.classList.remove('is-invalid');



    //Consulto por si campo Nombre esta lleno
    if (datosPersonales.Nombre === "") {
        primerNombre.classList.add('is-invalid');
        allcheck = true;
    }

    //Consulto por el primer apellido este lleno
    if (datosPersonales.PrimerApellido === "") {
        primerApellido.classList.add('is-invalid');
        allcheck = true;
    }

    //Consulto si la edad esta llena
    if (datosPersonales.Edad === "") {
        edad.classList.add('is-invalid');
        allcheck = true;
    }

    //Consulto si el telefono esta
    if (datosPersonales.Telefono === "") {
        telefono.classList.add('is-invalid');
        allcheck = true;
    }

    //Consulto si correo esta
    if (datosPersonales.Email === "") {
        correoPersonal.classList.add('is-invalid');
        allcheck = true;
    }


    if (allcheck == false) {

        var myString = JSON.stringify(datosPersonales);
        localStorage.setItem("0", myString);

        //Escribir los datos
        document.getElementById("nombres").innerHTML = "Nombres: " + datosPersonales.Nombre + " " + datosPersonales.SegundoNombre;
        document.getElementById("apellidos").innerHTML = "Apellidos: " + datosPersonales.PrimerApellido + " " + datosPersonales.SegundoApellido;
        document.getElementById("edadText").innerHTML = "Edad: " + datosPersonales.Edad;
        document.getElementById("telefonoText").innerHTML = "Teléfono: " + datosPersonales.Telefono;
        document.getElementById("correo").innerHTML = "Correo: " + datosPersonales.Email;

        //Cerrar el modal
        $('#actProfile').modal('hide');
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});