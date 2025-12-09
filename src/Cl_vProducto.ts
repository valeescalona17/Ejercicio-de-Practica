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
        const formAgregarProducto = document.getElementById("formAgregarProducto") as HTMLFormElement;
        if(formAgregarProducto) {
            formAgregarProducto.addEventListener("submit", (e) => {
                e.preventDefault();
                this.agregarProducto();
            });
        }
    }

    private agregarProducto(): void {
        const codigo = (document.getElementById("codigo") as HTMLInputElement).value;
        const nombre = (document.getElementById("nombre")as HTMLInputElement).value;
        const tipo = (document.getElementById("tipo")as HTMLInputElement).value;
        const precio =(document.getElementById("precio")as HTMLInputElement).value;

        if(!codigo || !nombre || !tipo || !precio) {
            alert('⚠️ Completa todos los campos');
            return;
        }

        const producto = this.catalogo.productos.find(p => p.codigo.toUpperCase() === codigo.toUpperCase());
        if(producto) {
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

        this.catalogo.agregarProducto(productoNuevo as any);
        this.controlador.mostrarAlerta("✅Producto Agregado");
        (document.getElementById("formAgregarProducto")as HTMLFormElement).reset();
        this.renderizarCatalogo();
    }

    renderizarCatalogo(): void {
        const tabla = document.getElementById("tablaCatalogo")as HTMLTableSectionElement;
        const listado = this.catalogo.listado();

        if(listado.length === 0) {
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

    obtenerSelectProducto(): void {
        const select = document.getElementById("selectProducto")as HTMLSelectElement;
        const listado = this.catalogo.listado();

        select.innerHTML = '<option value="">-- Selecciona un producto --</option>' +
            listado.map(p => `<option value="${p.codigo}">${p.nombre} (${p.codigo})</option>`).join('');
    }
}