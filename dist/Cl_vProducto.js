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
        const codigo = document.getElementById("codigo").value;
        const nombre = document.getElementById("nombre").value;
        const tipo = document.getElementById("tipo").value;
        const precio = document.getElementById("precio").value;
        if (!codigo || !nombre || !tipo || !precio) {
            alert('⚠️ Completa todos los campos');
            return;
        }
        const producto = this.catalogo.productos.find(p => p.codigo.toUpperCase() === codigo.toUpperCase());
        if (producto) {
            this.controlador.mostrarAlerta("Ya existe ese producto");
            return;
        }
        const productoNuevo = {
            id: null,
            creadoEl: null,
            alias: null,
            codigo,
            nombre,
            tipo,
            precio
        };
        this.catalogo.agregarProducto(productoNuevo);
        this.controlador.mostrarAlerta("✅Producto Agregado");
        document.getElementById("formAgregarProducto").reset();
        this.renderizarCatalogo();
    }
    renderizarCatalogo() {
        const tabla = document.getElementById("tablaCatalogo");
        const listado = this.catalogo.listado();
        if (listado.length === 0) {
            tabla.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #999;">No hay productos en cartelera</td></tr>';
            return;
        }
        tabla.innerHTML = listado.map(p => `
            <tr>
                <td><strong>${p.codigo}</strong></td>
                <td>${p.nombre}</td>
                <td>${p.tipo}</td>
                <td>${p.precio.toFixed(2)}</td>
            <tr>
            `).join("");
    }
    obtenerSelectProducto() {
        const select = document.getElementById("selectProducto");
        const listado = this.catalogo.listado();
        select.innerHTML = '<option value="">-- Selecciona un producto --</option>' +
            listado.map(p => `<option value="${p.codigo}">${p.nombre} (${p.codigo})</option>`).join('');
    }
}
