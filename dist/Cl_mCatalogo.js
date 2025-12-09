import Cl_mProducto from "./Cl_mProducto.js";
export default class Cl_mCatalogo {
    constructor(productos = []) {
        this._productos = [];
        this._productos = productos;
    }
    get productos() {
        return this._productos;
    }
    agregarProducto(producto) {
        this._productos.push(producto);
    }
    listado() {
        let resultado = [];
        for (let p of this.productos) {
            resultado.push({
                codigo: p.codigo,
                nombre: p.nombre,
                tipo: p.tipo,
                precio: p.precio,
            });
        }
        return resultado;
    }
    toJSON() {
        return this._productos.map(p => p.toJSON());
    }
    static fromJSON(arr) {
        const productos = (arr || []).map(p => new Cl_mProducto(p));
        return new Cl_mCatalogo(productos);
    }
}
