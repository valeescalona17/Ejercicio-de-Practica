import Cl_Controlador from "./Cl_Controlador.js";
import Cl_mVenta from "./Cl_mVenta.js";
import Cl_mCatalogo from "./Cl_mCatalogo.js";

export default class Cl_vCatalogo {
    private catalogo: Cl_mCatalogo;
    private controlador: Cl_Controlador;

    constructor(catalogo: Cl_mCatalogo, controlador: Cl_Controlador) {
        this.catalogo = catalogo;
        this.controlador = controlador;
        this.inicializarEventos();
    }

    inicializarEventos(): void {
        const btnProductoCedula = document.getElementById("btnProductoCedula")
        const btnInformacionProducto = document.getElementById("btnInformacionProducto");
        const bntMontoVendidoProducto = document.getElementById("btnMontoVendidoProducto");

        btnProductoCedula?.addEventListener("click", () => this.reporteProductoCedula());
        btnInformacionProducto?.addEventListener("click", () => this.reporteInformacionProducto());
        bntMontoVendidoProducto?.addEventListener("click", () => this.reporteMontoVendidoProducto());
    }

    private reporteProductoCedula(): void {
        const cedula = parseInt((document.getElementById("buscarCedula")as HTMLInputElement).value);
        if(!cedula || cedula < 100000000 ) {
            this.controlador.mostrarAlerta("⚠️ Ingrese una cédula válida");
            return;
        }

        const venta = new Cl_mVenta({id: null, creadoEl: null, alias: null, idv: "", codigo: "", cedula:"", cantUnid: 0, cantidadMesa: 0, cantidadPeluche: 0, cantidadJuegos: 0});
        const resultado = venta.productosDeCedula({cedula:"", ventas: this.controlador.getventas(), catalogo: this.catalogo});

        const tabla = document.getElementById('tablaReporteProductos') as HTMLTableSectionElement;

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

    private reporteInformacionProducto(): void {
        const codigo = (document.getElementById("buscarCodigo")as HTMLSelectElement).value;

        if(!codigo) {
            this.controlador.mostrarAlerta("⚠️ Ingrese un código válido");
            return;
        }

        const ventas = new Cl_mVenta({id: null, creadoEl: null, alias: null, idv:"", cedula:"", codigo:"", cantUnid: 0, cantidadJuegos:0, cantidadPeluche: 0, cantidadMesa: 0});
        const resultado = ventas.informacionVentasProducto({codigo, ventas: this.controlador.getVentas(), catalogo: this.catalogo});

        const tabla = document.getElementById('tablaReporteInformacion') as HTMLTableSectionElement;

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

    reporteMontoVendidoProducto(): void {
        const codigo = (document.getElementById("buscarProductoMonto")as HTMLSelectElement).value;

        if(!codigo) {
            this.controlador.mostrarAlerta("⚠️ Ingrese un código válido");
            return;
        }

        const venta = new Cl_mVenta({id: null, creadoEl: null, alias: null, idv:"", cedula:"", codigo:"", cantUnid: 0, cantidadJuegos:0, cantidadPeluche: 0, cantidadMesa: 0});
        const montoTotal =venta.vendidoProducto({codigo,ventas: this.controlador.getVentas(), catalogo: this.catalogo});
        const tabla = document.getElementById('tablaReporteMonto') as HTMLTableSectionElement;

        tabla.innerHTML = `
        <tr>
        <td>${this.catalogo.productos.find(p => p.codigo === codigo)?.nombre || codigo}</td>
        <td>${montoTotal.toFixed(2)}</td>
        <tr>
        `;
    }

    obtenerSelectProductoReporte(): void {
        const select = document.getElementById("buscarCodigo")as HTMLSelectElement;
        const selectMonto = document.getElementById("buscarProductoMonto")as HTMLSelectElement;
        const listado = this.catalogo.listado();

        select.innerHTML = '<option value="">-- Selecciona un producto --</option>' +
        listado.map(p =>`<option value="${p.codigo}">${p.nombre}</option>`).join('');

        if(selectMonto) {
            selectMonto.innerHTML = '<option value="">-- Selecciona un producto --</option>' +
            listado.map(p =>`<option value="${p.codigo}">${p.nombre}</option>`).join('');
        }
    }
}