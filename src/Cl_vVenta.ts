import Cl_Controlador from "./Cl_Controlador.js";
import Cl_mCatalogo from "./Cl_mCatalogo.js";
import Cl_mVenta from "./Cl_mVenta.js";

export default class Cl_vVenta {
  private catalogo: Cl_mCatalogo;
  private controlador: Cl_Controlador;
  private ventas: Cl_mVenta[] = [];

  constructor(catalogo: Cl_mCatalogo, controlador: Cl_Controlador) {
    this.catalogo = catalogo;
    this.controlador = controlador;
    this.inicializarEventos();
  }

  private inicializarEventos(): void {
    const formVenta = document.getElementById(
      "formVenta"
    ) as HTMLFormElement | null;

    if (formVenta) {
      formVenta.addEventListener("submit", (e) => {
        e.preventDefault();
        this.registrarVenta();
      });
    }
  }

  getVentas(): Cl_mVenta[] {
    return this.ventas;
  }

  private registrarVenta(): void {
    const idv = (document.getElementById("ventaIdv") as HTMLInputElement | null)?.value || "";
    const cedulaValor = (document.getElementById(
      "ventaCedula"
    ) as HTMLInputElement | null)?.value || "";
    const codigoProducto =
      (document.getElementById("selectProducto") as HTMLSelectElement | null)
        ?.value || "";
    const cantUnid =
      (document.getElementById("ventaCantUnid") as HTMLInputElement | null)
        ?.valueAsNumber || 0;
    const cantidadMesa =
      (document.getElementById("ventaCantidadMesa") as HTMLInputElement | null)
        ?.valueAsNumber || 0;
    const cantidadPeluche =
      (document.getElementById(
        "ventaCantidadPeluche"
      ) as HTMLInputElement | null)?.valueAsNumber || 0;
    const cantidadJuegos =
      (document.getElementById(
        "ventaCantidadJuegos"
      ) as HTMLInputElement | null)?.valueAsNumber || 0;

    const cedula = parseInt(cedulaValor);

    if (
      !idv ||
      !cedula ||
      !codigoProducto ||
      !cantUnid
    ) {
      this.controlador.mostrarAlerta(
        "⚠️ Completa todos los campos obligatorios",
        "error",
        "alertVentas"
      );
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
      this.controlador.mostrarAlerta(
        String(nuevaVenta.ventaOk),
        "error",
        "alertVentas"
      );
      return;
    }

    this.ventas.push(nuevaVenta);

    this.controlador.mostrarAlerta(
      "✅ Venta registrada",
      "success",
      "alertVentas"
    );

    (document.getElementById("formVenta") as HTMLFormElement | null)?.reset();
    this.actualizarEstadisiticas();
    this.renderizarVentas();
  }

  actualizarEstadisiticas(): void {
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

    const { cantMesa, cantJuegos, cantPeluche } =
      ventasHelper.cantidadProductosPorTipo(this.ventas);

    const statMesa = document.getElementById("statMesa");
    const statJuegos = document.getElementById("statJuegos");
    const statPeluche = document.getElementById("statPeluche");
    const statTotalVentas = document.getElementById("statTotalVentas");

    if (statMesa) statMesa.textContent = cantMesa.toString();
    if (statJuegos) statJuegos.textContent = cantJuegos.toString();
    if (statPeluche) statPeluche.textContent = cantPeluche.toString();
    if (statTotalVentas) statTotalVentas.textContent = this.ventas.length.toString();
  }

  renderizarVentas(): void {
    const tabla = document.getElementById(
      "tablaVentas"
    ) as HTMLTableSectionElement | null;

    if (!tabla) return;

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
