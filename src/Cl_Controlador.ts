import Cl_mCatalogo from "./Cl_mCatalogo.js";
import Cl_mVenta from "./Cl_mVenta.js";
import Cl_vProducto from "./Cl_vProducto.js";
import Cl_vVenta from "./Cl_vVenta.js";
import Cl_vCatalogo from "./Cl_vCatalogo.js";

export default class Cl_Controlador {
  private catalogo: Cl_mCatalogo;
  private vProducto: Cl_vProducto;
  private vVenta: Cl_vVenta;
  private vCatalogo: Cl_vCatalogo;

  constructor() {
    this.catalogo = new Cl_mCatalogo();

    this.vCatalogo = new Cl_vCatalogo(this.catalogo, this);
    this.vVenta = new Cl_vVenta(this.catalogo, this);
    this.vProducto = new Cl_vProducto(this.catalogo, this);

    this.inicializarEventos();
    this.irSeccion("dashboard");
  }

  private inicializarEventos() {
    // Productos iniciales de ejemplo
    this.catalogo.agregarProducto({
      id: null,
      creadoEl: null,
      alias: null,
      codigo: "JI09",
      nombre: "Peluche Foxy",
      tipo: 2,
      precio: 100,
    } as any);

    this.catalogo.agregarProducto({
      id: null,
      creadoEl: null,
      alias: null,
      codigo: "MI98",
      nombre: "Monopoly",
      tipo: 3,
      precio: 70,
    } as any);

    this.vProducto.renderizarCatalogo();
    this.vProducto.obtenerSelectProducto();
    this.vCatalogo.obtenerSelectProductoReporte?.();
  }

  private irSeccion(seccionId: string): void {
    document
      .querySelectorAll(".section")
      .forEach((s) => s.classList.remove("active"));

    document.getElementById(seccionId)?.classList.add("active");
  }

  irDashboard(): void {
    this.irSeccion("dashboard");
    this.vVenta.actualizarEstadisiticas();
  }

  irCatalogo(): void {
    this.irSeccion("catalogo");
    this.vProducto.renderizarCatalogo();
  }

  irVentas(): void {
    this.irSeccion("ventas");
    this.vProducto.obtenerSelectProducto();
    this.vVenta.actualizarEstadisiticas();
  }

  irReportes(): void {
    this.irSeccion("reportes");
    this.vCatalogo.obtenerSelectProductoReporte?.();
  }

  // Exponer ventas para los reportes
  getVentas(): Cl_mVenta[] {
    return this.vVenta.getVentas();
  }

  mostrarAlerta(
    msg: string,
    tipo: "info" | "success" | "error" = "info",
    divId = "alertGlobal"
  ): void {
    const div = document.getElementById(divId);
    if (!div) return;

    let clase = "alert";
    if (tipo === "success") clase += " alert-success";
    else if (tipo === "error") clase += " alert-error";

    div.className = clase;
    div.textContent = msg;

    setTimeout(() => {
      div.textContent = "";
      div.className = "alert";
    }, 3000);
  }
}
