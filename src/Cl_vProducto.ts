import Cl_mCatalogo from "./Cl_mCatalogo.js";
import Cl_Controlador from "./Cl_Controlador.js";

export default class Cl_vProducto {
  private catalogo: Cl_mCatalogo;
  private controlador: Cl_Controlador;

  constructor(catalogo: Cl_mCatalogo, controlador: Cl_Controlador) {
    this.catalogo = catalogo;
    this.controlador = controlador;
    this.inicializarEventos();
  }

  private inicializarEventos(): void {
    const formAgregarProducto = document.getElementById(
      "formAgregarProducto"
    ) as HTMLFormElement | null;

    if (formAgregarProducto) {
      formAgregarProducto.addEventListener("submit", (e) => {
        e.preventDefault();
        this.agregarProducto();
      });
    }
  }

  private agregarProducto(): void {
    const codigo = (document.getElementById("codigo") as HTMLInputElement | null)?.value || "";
    const nombre = (document.getElementById("nombre") as HTMLInputElement | null)?.value || "";
    const tipo = (document.getElementById("tipo") as HTMLSelectElement | null)?.value || "";
    const precio = (document.getElementById("precio") as HTMLInputElement | null)?.value || "";

    if (!codigo || !nombre || !tipo || !precio) {
      this.controlador.mostrarAlerta(
        "⚠️ Completa todos los campos",
        "error",
        "alertCatalogo"
      );
      return;
    }

    const productoExistente = this.catalogo.productos.find(
      (p) => p.codigo.toUpperCase() === codigo.toUpperCase()
    );

    if (productoExistente) {
      this.controlador.mostrarAlerta(
        "Ya existe ese producto",
        "error",
        "alertCatalogo"
      );
      return;
    }

    const productoNuevo = {
      id: null,
      creadoEl: null,
      alias: null,
      codigo,
      nombre,
      tipo: Number(tipo),
      precio: Number(precio),
    };

    this.catalogo.agregarProducto(productoNuevo as any);

    this.controlador.mostrarAlerta(
      "✅ Producto agregado",
      "success",
      "alertCatalogo"
    );

    (document.getElementById("formAgregarProducto") as HTMLFormElement | null)?.reset();

    this.renderizarCatalogo();
    this.obtenerSelectProducto();
  }

  renderizarCatalogo(): void {
    const tabla = document.getElementById(
      "tablaCatalogo"
    ) as HTMLTableSectionElement | null;

    if (!tabla) return;

    const listado = this.catalogo.listado();

    if (listado.length === 0) {
      tabla.innerHTML =
        '<tr><td colspan="4" class="empty">Sin productos en catálogo</td></tr>';
      return;
    }

    tabla.innerHTML = "";
    for (const p of listado) {
      const tr = document.createElement("tr");
      let tipoTexto = "";
      if (p.tipo === 1) tipoTexto = "Consola";
      else if (p.tipo === 2) tipoTexto = "Peluche";
      else if (p.tipo === 3) tipoTexto = "Juego de Mesa";

      tr.innerHTML = `
        <td>${p.codigo}</td>
        <td>${p.nombre}</td>
        <td>${tipoTexto}</td>
        <td>${p.precio.toFixed(2)}</td>
      `;
      tabla.appendChild(tr);
    }
  }

  obtenerSelectProducto(): void {
    const select = document.getElementById(
      "selectProducto"
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
}
