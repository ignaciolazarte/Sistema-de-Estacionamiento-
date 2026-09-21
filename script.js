document.addEventListener("DOMContentLoaded", () => {
    // Referencias del Control de Acceso
    const formulario = document.querySelector("#control-acceso form");
    const accion = document.getElementById("accion");
    const placa = document.getElementById("placa");
    const tipoVehiculo = document.getElementById("tipo-vehiculo");
    const horaIngreso = document.getElementById("hora-ingreso");
    const horaEgreso = document.getElementById("hora-egreso");

    const espaciosDisponibles = document.getElementById("espacios-disponibles");
    const vehiculosActuales = document.getElementById("vehiculos-actuales");
    const espaciosDisponiblesSectores = document.getElementById("espacios-disponibles-sectores");
    const espaciosOcupadosSectores = document.getElementById("espacios-ocupados");
    const totalEstimado = document.querySelector(".total");
    const textoEstado = document.getElementById("texto-estado");
    const porcentajeOcupacion = document.getElementById("porcentaje-ocupacion");

    // Referencias de la sección de Abonados
    const formAbonado = document.getElementById("form-abonado");
    const nombreAbonado = document.getElementById("nombre-abonado");
    const placaAbonado = document.getElementById("placa-abonado");
    const tipoAbono = document.getElementById("tipo-abono");
    const tablaAbonados = document.getElementById("tabla-abonados");

    const CAPACIDAD_TOTAL = 50;
    let espacios = CAPACIDAD_TOTAL;
    let vehiculos = 0;
    const vehiculosDentro = {};

    function actualizarEspaciosSectores() {
        console.log("Actualizando espacios:", espacios, vehiculos);

        if (!espaciosDisponiblesSectores || !espaciosOcupadosSectores) return;

        espaciosDisponiblesSectores.textContent = espacios;
        espaciosOcupadosSectores.textContent = vehiculos;
    }
    // Arreglo inicial de abonados con un dato de ejemplo
    let listaAbonados = [
        { nombre: "Carlos Gómez", placa: "AC456XY", plan: "Mensual Completo" }
    ];

    const tarifas = {
        auto: 2500,
        moto: 1500,
        camioneta: 3000
    };

    function inicializarUI() {
        espaciosDisponibles.textContent = `${espacios} / ${CAPACIDAD_TOTAL}`;
        vehiculosActuales.textContent = vehiculos;
        actualizarEstado();
        actualizarEspaciosSectores();
        renderizarAbonados();
    }

    function actualizarEstado() {
        const porcentaje = Math.round((vehiculos / CAPACIDAD_TOTAL) * 100);
        porcentajeOcupacion.textContent = `${porcentaje}% de ocupación`;

        if (porcentaje <= 50) {
            textoEstado.textContent = "Capacidad normal";
        } else if (porcentaje <= 80) {
            textoEstado.textContent = "Capacidad media";
        } else {
            textoEstado.textContent = "Capacidad alta";
        }
    }

    function convertirHoraAMinutos(hora) {
        const [horas, minutos] = hora.split(":").map(Number);
        return horas * 60 + minutos;
    }

    // Lógica del Control de Acceso
    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const patente = placa.value.trim().toUpperCase();
            const tipoAccion = accion.value;
            const tipo = tipoVehiculo.value;

            if (!patente) {
                alert("Complete la patente del vehículo.");
                return;
            }

            if (tipoAccion === "ingreso") {
                if (!horaIngreso.value) {
                    alert("Ingrese la hora de ingreso.");
                    return;
                }
                if (espacios <= 0) {
                    alert("No hay espacios disponibles.");
                    return;
                }
                if (vehiculosDentro[patente]) {
                    alert("Este vehículo ya se encuentra dentro del estacionamiento.");
                    return;
                }

                vehiculosDentro[patente] = { tipo, horaIngreso: horaIngreso.value };
                espacios--;
                vehiculos++;

                alert("Ingreso registrado correctamente.");
                totalEstimado.textContent = "Total: $--";

            } else {
                if (!horaEgreso.value) {
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

                const horas = Math.ceil((fin - inicio) / 60);
                const total = horas * tarifas[datosVehiculo.tipo];

                espacios++;
                vehiculos--;
                delete vehiculosDentro[patente];

                alert(`Egreso registrado correctamente.\nTotal a pagar: $${total}`);
                totalEstimado.textContent = `Total: $${total}`;
            }

            espaciosDisponibles.textContent = `${espacios} / ${CAPACIDAD_TOTAL}`;
            vehiculosActuales.textContent = vehiculos;
            actualizarEstado();
            actualizarEspaciosSectores();
            formulario.reset();
        });
    }

    // Lógica de Abonados
    function renderizarAbonados() {
        if (!tablaAbonados) return;

        tablaAbonados.innerHTML = "";
        listaAbonados.forEach((abonado, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${abonado.nombre}</td>
                <td>${abonado.placa}</td>
                <td>${abonado.plan}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" onclick="window.eliminarAbonado(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tablaAbonados.appendChild(fila);
        });
    }

    if (formAbonado) {
        formAbonado.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = nombreAbonado.value.trim();
            const patente = placaAbonado.value.trim().toUpperCase();
            const planSeleccionado = tipoAbono.value;

            if (!nombre || !patente) {
                alert("Por favor, complete todos los campos del abonado.");
                return;
            }

            listaAbonados.push({ nombre, placa: patente, plan: planSeleccionado });
            renderizarAbonados();
            formAbonado.reset();
            alert("Abonado registrado con éxito.");
        });
    }

    // Función global para eliminar abonados desde la tabla
    window.eliminarAbonado = function (index) {
        listaAbonados.splice(index, 1);
        renderizarAbonados();
    };

    inicializarUI();
});

// Referencias de la sección de Tarifas
const formTarifa = document.getElementById("form-tarifa");
const selectVehiculoTarifa = document.getElementById("select-vehiculo-tarifa");
const nuevoPrecioInput = document.getElementById("nuevo-precio");

const displayAuto = document.getElementById("tarifa-auto-display");
const displayMoto = document.getElementById("tarifa-moto-display");
const displayCamioneta = document.getElementById("tarifa-camioneta-display");

function actualizarDisplaysTarifas() {
    displayAuto.textContent = `$${tarifas.auto}`;
    displayMoto.textContent = `$${tarifas.moto}`;
    displayCamioneta.textContent = `$${tarifas.camioneta}`;
}

if (formTarifa) {
    formTarifa.addEventListener("submit", (e) => {
        e.preventDefault();
        const vehiculoSeleccionado = selectVehiculoTarifa.value;
        const precioVal = parseFloat(nuevoPrecioInput.value);

        if (isNaN(precioVal) || precioVal < 0) {
            alert("Por favor, ingrese un precio válido.");
            return;
        }

        // Actualiza el objeto de tarifas global que usa el control de acceso
        tarifas[vehiculoSeleccionado] = precioVal;
        actualizarDisplaysTarifas();

        formTarifa.reset();
        alert(`Tarifa de ${vehiculoSeleccionado} actualizada exitosamente a $${precioVal}.`);
    });
}

// Asegúrate de llamarlo al iniciar
actualizarDisplaysTarifas();