import Cl_mCatalogo from "./Cl_mCatalogo.js";
import Cl_vProducto from "./Cl_vProducto.js";
import Cl_vVenta from "./Cl_vVenta.js";
import Cl_vCatalogo from "./Cl_vCatalogo.js";
export default class Cl_Controlador {
    constructor() {
        this.catalogo = new Cl_mCatalogo();
        this.vCatalogo = new Cl_vCatalogo(this.catalogo, this);
        this.vVenta = new Cl_vVenta(this.catalogo, this);
        this.vProducto = new Cl_vProducto(this.catalogo, this);
        this.inicializarEventos();
        this.irSeccion("dashboard");
    }
    inicializarEventos() {
        var _a, _b;
        // Productos iniciales de ejemplo
        this.catalogo.agregarProducto({
            id: null,
            creadoEl: null,
            alias: null,
            codigo: "JI09",
            nombre: "Peluche Foxy",
            tipo: 2,
            precio: 100,
        });
        this.catalogo.agregarProducto({
            id: null,
            creadoEl: null,
            alias: null,
            codigo: "MI98",
            nombre: "Monopoly",
            tipo: 3,
            precio: 70,
        });
        this.vProducto.renderizarCatalogo();
        this.vProducto.obtenerSelectProducto();
        (_b = (_a = this.vCatalogo).obtenerSelectProductoReporte) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    irSeccion(seccionId) {
        var _a;
        document
            .querySelectorAll(".section")
            .forEach((s) => s.classList.remove("active"));
        (_a = document.getElementById(seccionId)) === null || _a === void 0 ? void 0 : _a.classList.add("active");
    }
    irDashboard() {
        this.irSeccion("dashboard");
        this.vVenta.actualizarEstadisiticas();
    }
    irCatalogo() {
        this.irSeccion("catalogo");
        this.vProducto.renderizarCatalogo();
    }
    irVentas() {
        this.irSeccion("ventas");
        this.vProducto.obtenerSelectProducto();
        this.vVenta.actualizarEstadisiticas();
    }
    irReportes() {
        var _a, _b;
        this.irSeccion("reportes");
        (_b = (_a = this.vCatalogo).obtenerSelectProductoReporte) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
    // Exponer ventas para los reportes
    getVentas() {
        return this.vVenta.getVentas();
    }
    mostrarAlerta(msg, tipo = "info", divId = "alertGlobal") {
        const div = document.getElementById(divId);
        if (!div)
            return;
        let clase = "alert";
        if (tipo === "success")
            clase += " alert-success";
        else if (tipo === "error")
            clase += " alert-error";
        div.className = clase;
        div.textContent = msg;
        setTimeout(() => {
            div.textContent = "";
            div.className = "alert";
        }, 3000);
    }
}
