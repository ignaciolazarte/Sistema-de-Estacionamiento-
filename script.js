document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.querySelector("#control-acceso form");
    const accion = document.querySelector("#accion");
    const placa = document.querySelector("#placa");
    const horaIngreso = document.querySelector("#hora-ingreso");
    const horaEgreso = document.querySelector("#hora-egreso");

    const espaciosDisponibles = document.querySelector("#espacios-disponibles");
    const vehiculosActuales = document.querySelector("#vehiculos-actuales");
    const totalEstimado = document.querySelector(".total");
    const estadoSistema = document.querySelector("#estado-sistema");
    const porcentajeOcupacion = document.querySelector("#porcentaje-ocupacion");
    const estadoIndicador = document.querySelector("#estado-indicador"); 
    let espacios = 35;
    let vehiculos = 15;

    const capacidadTotal = 50;

    // Guardamos los vehículos que están actualmente dentro
    const vehiculosDentro = {};

    const tarifas = {
        auto: 2500,
        moto: 1500,
        camioneta: 3000
    };
   function actualizarEstado() {
    const porcentaje = Math.round((vehiculos / capacidadTotal) * 100);

    const textoEstado = document.getElementById("texto-estado");
    const porcentajeOcupacion = document.getElementById("porcentaje-ocupacion");
    const indicador = document.getElementById("estado-indicador");

    porcentajeOcupacion.textContent = `${porcentaje}% de ocupación`;

    if (porcentaje <= 50) {
        textoEstado.textContent = "Capacidad normal";
    } 
    else if (porcentaje <= 80) {
        textoEstado.textContent = "Capacidad media";
    } 
    else {
        textoEstado.textContent = "Capacidad alta";
    }
}

    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();

        const tipoVehiculo = document.querySelector("#tipo-vehiculo").value;
        const patente = placa.value.trim().toUpperCase();
        const tipoAccion = accion.value;

        // Verificamos que se haya ingresado la patente
        if (patente === "") {
            alert("Complete la patente del vehículo.");
            return;
        }

    //ingreso
        if (tipoAccion === "ingreso") {

            if (horaIngreso.value === "") {
                alert("Ingrese la hora de ingreso.");
                return;
            }

            if (espacios === 0) {
                alert("No hay espacios disponibles.");
                return;
            }

            if (vehiculosDentro[patente]) {
                alert("Este vehículo ya se encuentra dentro del estacionamiento.");
                return;
            }

            // Guardamos los datos del vehículo
            vehiculosDentro[patente] = {
                tipo: tipoVehiculo,
                horaIngreso: horaIngreso.value
            };

            espacios--;
            vehiculos++;

            alert("Ingreso registrado correctamente.");

            totalEstimado.textContent = "Total estimado: $--";
        }
        //egreso
        else {

            if (horaEgreso.value === "") {
                alert("Ingrese la hora de egreso.");
                return;
            }

            if (!vehiculosDentro[patente]) {
                alert("Este vehículo no se encuentra dentro del estacionamiento.");
                return;
            }

            const datosVehiculo = vehiculosDentro[patente];

            const inicio = convertirHoraAMinutos(datosVehiculo.horaIngreso);
            const fin = convertirHoraAMinutos(horaEgreso.value);

            if (fin <= inicio) {
                alert("La hora de egreso debe ser posterior a la hora de ingreso.");
                return;
            }

            // Calculamos las horas de estacionamiento
            const minutos = fin - inicio;
            const horas = Math.ceil(minutos / 60);

            const tarifa = tarifas[datosVehiculo.tipo];
            const total = horas * tarifa;

            espacios++;
            vehiculos--;

            // Eliminamos el vehículo de los que están dentro
            delete vehiculosDentro[patente];

            alert(`Egreso registrado correctamente.\nTotal a pagar: $${total}`);

            totalEstimado.textContent = `Total estimado: $${total}`;
        }

        // Actualizamos los datos en pantalla
        espaciosDisponibles.textContent = `${espacios} / ${capacidadTotal}`;
                  vehiculosActuales.textContent = vehiculos;

                 actualizarEstado();

                   formulario.reset();
    });


    // Convierte una hora (HH:MM) en minutos
    function convertirHoraAMinutos(hora) {

        const partes = hora.split(":");

        const horas = Number(partes[0]);
        const minutos = Number(partes[1]);

        return horas * 60 + minutos;
    }

});
