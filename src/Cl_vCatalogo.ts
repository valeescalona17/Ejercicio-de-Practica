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
    const btnProductoCedula = document.getElementById(
      "btnProductoCedula"
    ) as HTMLButtonElement | null;
    const btnInformacionProducto = document.getElementById(
      "btnInformacionProducto"
    ) as HTMLButtonElement | null;
    const btnMontoVendidoProducto = document.getElementById(
      "btnMontoVendidoProducto"
    ) as HTMLButtonElement | null;

    btnProductoCedula?.addEventListener("click", () =>
      this.reporteProductoCedula()
    );
    btnInformacionProducto?.addEventListener("click", () =>
      this.reporteInformacionProducto()
    );
    btnMontoVendidoProducto?.addEventListener("click", () =>
      this.reporteMontoVendidoProducto()
    );
  }

  obtenerSelectProductoReporte(): void {
    const select = document.getElementById(
      "selectProductoReporte"
    ) as HTMLSelectElement | null;
    if (!select) return;

    select.innerHTML = `<option value="">Seleccione producto</option>`;

    const listado = this.catalogo.listado();
    for (const p of listado) {
      const opt = document.createElement("option");
      opt.value = p.codigo.toString();
      opt.textContent = `${p.codigo} - ${p.nombre}`;
      select.appendChild(opt);
    }
  }

  private reporteProductoCedula(): void {
    const cedulaInput = document.getElementById(
      "buscarCedula"
    ) as HTMLInputElement | null;
    if (!cedulaInput) return;

    const cedula = parseInt(cedulaInput.value);

    if (!cedula || cedula < 10000000) {
      this.controlador.mostrarAlerta(
        "⚠️ Ingrese una cédula válida",
        "error"
      );
      return;
    }

    const venta = new Cl_mVenta({
      id: null,
      creadoEl: null,
      alias: null,
      idv: "",
      codigo: "",
      cedula: "",
      cantUnid: 0,
      cantidadMesa: 0,
      cantidadPeluche: 0,
      cantidadJuegos: 0,
    });

    const resultado = venta.productosDeCedula({
      cedula: cedula.toString(),
      ventas: this.controlador.getVentas(),
      catalogo: this.catalogo,
    });

    const tabla = document.getElementById(
      "tablaReporteProductos"
    ) as HTMLTableSectionElement | null;

    if (!tabla) return;

    if (resultado.length === 0) {
      tabla.innerHTML =
        '<tr><td colspan="5" class="empty">No se encontraron compras para esa cédula</td></tr>';
      return;
    }

    tabla.innerHTML = "";
    for (const r of resultado) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${r.codigo}</td>
        <td>${r.nombre}</td>
        <td>${r.tipo}</td>
        <td>${r.cantUnid}</td>
        <td>${r.montoPagado.toFixed(2)}</td>
      `;
      tabla.appendChild(tr);
    }
  }

  private reporteInformacionProducto(): void {
    const select = document.getElementById(
      "selectProductoReporte"
    ) as HTMLSelectElement | null;
    if (!select) return;

    const codigo = select.value;
    if (!codigo) {
      this.controlador.mostrarAlerta(
        "⚠️ Seleccione un producto",
        "error"
      );
      return;
    }

    const venta = new Cl_mVenta({
      id: null,
      creadoEl: null,
      alias: null,
      idv: "",
      codigo: "",
      cedula: "",
      cantUnid: 0,
      cantidadMesa: 0,
      cantidadPeluche: 0,
      cantidadJuegos: 0,
    });

    const info = venta.informacionVentasProducto({
      codigo,
      ventas: this.controlador.getVentas(),
      catalogo: this.catalogo,
    });

    const div = document.getElementById(
      "infoProductoReporte"
    ) as HTMLDivElement | null;
    if (!div) return;

    if (info.length === 0) {
      div.textContent = "No hay ventas registradas para ese producto.";
      return;
    }

    const totalPersonas = info.reduce(
      (acc, i) => acc + i.unidsCompradas,
      0
    );
    const totalMonto = info.reduce((acc, i) => acc + i.montoPagado, 0);

    div.innerHTML = `
      <p>Total asistentes: <strong>${totalPersonas}</strong></p>
      <p>Monto total pagado: <strong>${totalMonto.toFixed(2)}</strong></p>
    `;
  }

  private reporteMontoVendidoProducto(): void {
    const select = document.getElementById(
      "selectProductoReporte"
    ) as HTMLSelectElement | null;
    if (!select) return;

    const codigo = select.value;
    if (!codigo) {
      this.controlador.mostrarAlerta(
        "⚠️ Seleccione un producto",
        "error"
      );
      return;
    }

    const venta = new Cl_mVenta({
      id: null,
      creadoEl: null,
      alias: null,
      idv: "",
      codigo: "",
      cedula: "",
      cantUnid: 0,
      cantidadMesa: 0,
      cantidadPeluche: 0,
      cantidadJuegos: 0,
    });

    const monto = venta.vendidoProducto({
      codigo,
      ventas: this.controlador.getVentas(),
      catalogo: this.catalogo,
    });

    const div = document.getElementById(
      "montoProductoReporte"
    ) as HTMLDivElement | null;
    if (!div) return;

    div.innerHTML = `
      <p>Monto vendido para el producto <strong>${codigo}</strong>: <strong>${monto.toFixed(
      2
    )}</strong></p>
    `;
  }
}
