import Cl_mVenta from "./Cl_mVenta.js";
export default class Cl_vVenta {
    constructor(catalogo, controlador) {
        this.ventas = [];
        this.catalogo = catalogo;
        this.controlador = controlador;
        this.inicializarEventos();
    }
    inicializarEventos() {
        const formVenta = document.getElementById("formVenta");
        if (formVenta) {
            formVenta.addEventListener("submit", (e) => {
                e.preventDefault();
                this.registrarVenta();
            });
        }
    }
    getVentas() {
        return this.ventas;
    }
    registrarVenta() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const idv = ((_a = document.getElementById("ventaIdv")) === null || _a === void 0 ? void 0 : _a.value) || "";
        const cedulaValor = ((_b = document.getElementById("ventaCedula")) === null || _b === void 0 ? void 0 : _b.value) || "";
        const codigoProducto = ((_c = document.getElementById("selectProducto")) === null || _c === void 0 ? void 0 : _c.value) || "";
        const cantUnid = ((_d = document.getElementById("ventaCantUnid")) === null || _d === void 0 ? void 0 : _d.valueAsNumber) || 0;
        const cantidadMesa = ((_e = document.getElementById("ventaCantidadMesa")) === null || _e === void 0 ? void 0 : _e.valueAsNumber) || 0;
        const cantidadPeluche = ((_f = document.getElementById("ventaCantidadPeluche")) === null || _f === void 0 ? void 0 : _f.valueAsNumber) || 0;
        const cantidadJuegos = ((_g = document.getElementById("ventaCantidadJuegos")) === null || _g === void 0 ? void 0 : _g.valueAsNumber) || 0;
        const cedula = parseInt(cedulaValor);
        if (!idv ||
            !cedula ||
            !codigoProducto ||
            !cantUnid) {
            this.controlador.mostrarAlerta("⚠️ Completa todos los campos obligatorios", "error", "alertVentas");
            return;
        }
        const nuevaVenta = new Cl_mVenta({
            id: null,
            creadoEl: null,
            alias: null,
            idv: idv,
            cedula: cedula.toString(),
            codigo: codigoProducto,
            cantUnid: cantUnid,
            cantidadJuegos: cantidadJuegos,
            cantidadPeluche: cantidadPeluche,
            cantidadMesa: cantidadMesa,
        });
        if (nuevaVenta.ventaOk !== true) {
            this.controlador.mostrarAlerta(String(nuevaVenta.ventaOk), "error", "alertVentas");
            return;
        }
        this.ventas.push(nuevaVenta);
        this.controlador.mostrarAlerta("✅ Venta registrada", "success", "alertVentas");
        (_h = document.getElementById("formVenta")) === null || _h === void 0 ? void 0 : _h.reset();
        this.actualizarEstadisiticas();
        this.renderizarVentas();
    }
    actualizarEstadisiticas() {
        const ventasHelper = new Cl_mVenta({
            id: null,
            creadoEl: null,
            alias: null,
            idv: "",
            cedula: "",
            codigo: "",
            cantUnid: 0,
            cantidadJuegos: 0,
            cantidadPeluche: 0,
            cantidadMesa: 0,
        });
        const { cantMesa, cantJuegos, cantPeluche } = ventasHelper.cantidadProductosPorTipo(this.ventas);
        const statMesa = document.getElementById("statMesa");
        const statJuegos = document.getElementById("statJuegos");
        const statPeluche = document.getElementById("statPeluche");
        const statTotalVentas = document.getElementById("statTotalVentas");
        if (statMesa)
            statMesa.textContent = cantMesa.toString();
        if (statJuegos)
            statJuegos.textContent = cantJuegos.toString();
        if (statPeluche)
            statPeluche.textContent = cantPeluche.toString();
        if (statTotalVentas)
            statTotalVentas.textContent = this.ventas.length.toString();
    }
    renderizarVentas() {
        const tabla = document.getElementById("tablaVentas");
        if (!tabla)
            return;
        if (this.ventas.length === 0) {
            tabla.innerHTML =
                '<tr><td colspan="7" class="empty">Sin ventas registradas</td></tr>';
            return;
        }
        tabla.innerHTML = "";
        for (const v of this.ventas) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${v.idv}</td>
        <td>${v.cedula}</td>
        <td>${v.codigo}</td>
        <td>${v.cantUnid}</td>
        <td>${v.cantidadMesa}</td>
        <td>${v.cantidadPeluche}</td>
        <td>${v.cantidadJuegos}</td>
      `;
            tabla.appendChild(tr);
        }
    }
}
