import Cl_mVenta from "./Cl_mVenta.js";
export default class Cl_vCatalogo {
    constructor(catalogo, controlador) {
        this.catalogo = catalogo;
        this.controlador = controlador;
        this.inicializarEventos();
    }
    inicializarEventos() {
        const btnProductoCedula = document.getElementById("btnProductoCedula");
        const btnInformacionProducto = document.getElementById("btnInformacionProducto");
        const bntMontoVendidoProducto = document.getElementById("btnMontoVendidoProducto");
        btnProductoCedula === null || btnProductoCedula === void 0 ? void 0 : btnProductoCedula.addEventListener("click", () => this.reporteProductoCedula());
        btnInformacionProducto === null || btnInformacionProducto === void 0 ? void 0 : btnInformacionProducto.addEventListener("click", () => this.reporteInformacionProducto());
        bntMontoVendidoProducto === null || bntMontoVendidoProducto === void 0 ? void 0 : bntMontoVendidoProducto.addEventListener("click", () => this.reporteMontoVendidoProducto());
    }
    reporteProductoCedula() {
        const cedula = parseInt(document.getElementById("buscarCedula").value);
        if (!cedula || cedula < 100000000) {
            this.controlador.mostrarAlerta("⚠️ Ingrese una cédula válida");
            return;
        }
        const venta = new Cl_mVenta({ id: null, creadoEl: null, alias: null, idv: "", codigo: "", cedula: "", cantUnid: 0, cantidadMesa: 0, cantidadPeluche: 0, cantidadJuegos: 0 });
        const resultado = venta.productosDeCedula({ cedula: "", ventas: this.controlador.getventas(), catalogo: this.catalogo });
        const tabla = document.getElementById('tablaReporteProductos');
        if (resultado.length === 0) {
            tabla.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">No hay productos para esta cédula</td></tr>';
            return;
        }
        tabla.innerHTML = resultado.map(r => `
            <tr>
                <td>${r.codigo}</td>
                <td>${r.nombre}</td>
                <td>${r.tipo}</td>
                <td>${r.cantUnid}</td>
                <td>$${r.montoPagado.toFixed(2)}</td>
            </tr>
        `).join('');
    }
    reporteInformacionProducto() {
        const codigo = document.getElementById("buscarCodigo").value;
        if (!codigo) {
            this.controlador.mostrarAlerta("⚠️ Ingrese un código válido");
            return;
        }
        const ventas = new Cl_mVenta({ id: null, creadoEl: null, alias: null, idv: "", cedula: "", codigo: "", cantUnid: 0, cantidadJuegos: 0, cantidadPeluche: 0, cantidadMesa: 0 });
        const resultado = ventas.informacionVentasProducto({ codigo, ventas: this.controlador.getVentas(), catalogo: this.catalogo });
        const tabla = document.getElementById('tablaReporteInformacion');
        if (resultado.length === 0) {
            tabla.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #999;">No hay informacion para este producto</td></tr>';
            return;
        }
        tabla.innerHTML = resultado.map(r => `
            <tr>
                <td>${r.cedulaPagador}</td>
                <td>${r.unidsCompradas}</td>
                <td>$${r.montoPagado.toFixed(2)}</td>
            </tr>
        `).join('');
    }
    reporteMontoVendidoProducto() {
        var _a;
        const codigo = document.getElementById("buscarProductoMonto").value;
        if (!codigo) {
            this.controlador.mostrarAlerta("⚠️ Ingrese un código válido");
            return;
        }
        const venta = new Cl_mVenta({ id: null, creadoEl: null, alias: null, idv: "", cedula: "", codigo: "", cantUnid: 0, cantidadJuegos: 0, cantidadPeluche: 0, cantidadMesa: 0 });
        const montoTotal = venta.vendidoProducto({ codigo, ventas: this.controlador.getVentas(), catalogo: this.catalogo });
        const tabla = document.getElementById('tablaReporteMonto');
        tabla.innerHTML = `
        <tr>
        <td>${((_a = this.catalogo.productos.find(p => p.codigo === codigo)) === null || _a === void 0 ? void 0 : _a.nombre) || codigo}</td>
        <td>${montoTotal.toFixed(2)}</td>
        <tr>
        `;
    }
    obtenerSelectProductoReporte() {
        const select = document.getElementById("buscarCodigo");
        const selectMonto = document.getElementById("buscarProductoMonto");
        const listado = this.catalogo.listado();
        select.innerHTML = '<option value="">-- Selecciona un producto --</option>' +
            listado.map(p => `<option value="${p.codigo}">${p.nombre}</option>`).join('');
        if (selectMonto) {
            selectMonto.innerHTML = '<option value="">-- Selecciona un producto --</option>' +
                listado.map(p => `<option value="${p.codigo}">${p.nombre}</option>`).join('');
        }
    }
}
