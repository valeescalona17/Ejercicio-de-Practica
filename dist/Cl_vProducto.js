export default class Cl_vProducto {
    constructor(catalogo, controlador) {
        this.catalogo = catalogo;
        this.controlador = controlador;
        this.inicializarEventos();
    }
    inicializarEventos() {
        const formAgregarProducto = document.getElementById("formAgregarProducto");
        if (formAgregarProducto) {
            formAgregarProducto.addEventListener("submit", (e) => {
                e.preventDefault();
                this.agregarProducto();
            });
        }
    }
    agregarProducto() {
        var _a, _b, _c, _d, _e;
        const codigo = ((_a = document.getElementById("codigo")) === null || _a === void 0 ? void 0 : _a.value) || "";
        const nombre = ((_b = document.getElementById("nombre")) === null || _b === void 0 ? void 0 : _b.value) || "";
        const tipo = ((_c = document.getElementById("tipo")) === null || _c === void 0 ? void 0 : _c.value) || "";
        const precio = ((_d = document.getElementById("precio")) === null || _d === void 0 ? void 0 : _d.value) || "";
        if (!codigo || !nombre || !tipo || !precio) {
            this.controlador.mostrarAlerta("⚠️ Completa todos los campos", "error", "alertCatalogo");
            return;
        }
        const productoExistente = this.catalogo.productos.find((p) => p.codigo.toUpperCase() === codigo.toUpperCase());
        if (productoExistente) {
            this.controlador.mostrarAlerta("Ya existe ese producto", "error", "alertCatalogo");
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
        this.catalogo.agregarProducto(productoNuevo);
        this.controlador.mostrarAlerta("✅ Producto agregado", "success", "alertCatalogo");
        (_e = document.getElementById("formAgregarProducto")) === null || _e === void 0 ? void 0 : _e.reset();
        this.renderizarCatalogo();
        this.obtenerSelectProducto();
    }
    renderizarCatalogo() {
        const tabla = document.getElementById("tablaCatalogo");
        if (!tabla)
            return;
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
            if (p.tipo === 1)
                tipoTexto = "Consola";
            else if (p.tipo === 2)
                tipoTexto = "Peluche";
            else if (p.tipo === 3)
                tipoTexto = "Juego de Mesa";
            tr.innerHTML = `
        <td>${p.codigo}</td>
        <td>${p.nombre}</td>
        <td>${tipoTexto}</td>
        <td>${p.precio.toFixed(2)}</td>
      `;
            tabla.appendChild(tr);
        }
    }
    obtenerSelectProducto() {
        const select = document.getElementById("selectProducto");
        if (!select)
            return;
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
