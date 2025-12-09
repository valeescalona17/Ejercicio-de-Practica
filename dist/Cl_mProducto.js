import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export default class Cl_mProducto extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, codigo, nombre, tipo, precio } = {
        id: null,
        creadoEl: null,
        alias: null,
        codigo: "",
        nombre: "",
        tipo: 0,
        precio: 0
    }) {
        super({ id, creadoEl, alias });
        this._codigo = "";
        this._nombre = "";
        this._tipo = 0;
        this._precio = 0;
        this.codigo = codigo;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
    }
    set codigo(codigo) {
        this._codigo = codigo.toUpperCase().trim();
    }
    get codigo() {
        return this._codigo;
    }
    set nombre(nombre) {
        this._nombre = nombre;
    }
    get nombre() {
        return this._nombre;
    }
    set tipo(tipo) {
        this._tipo = tipo;
    }
    get tipo() {
        return this._tipo;
    }
    set precio(precio) {
        this._precio = precio;
    }
    get precio() {
        return this._precio;
    }
    get codigoOk() {
        return this._codigo.length > 0;
    }
    get nombreOk() {
        return this._nombre.length > 0;
    }
    get tipoOk() {
        return this._tipo > 0 && this._tipo < 4;
    }
    get precioOk() {
        return this._precio > 0;
    }
    get productoOk() {
        if (!this.codigoOk)
            return "El codigo es obligatorio";
        if (!this.nombreOk)
            return "El nombre es obligatorio";
        if (!this.tipoOk)
            return "El tipo es obligatorio";
        if (!this.precioOk)
            return "El precio es obligatorio";
        return true;
    }
    toJSON() {
        return Object.assign(Object.assign({}, super.toJSON()), { codigo: this._codigo, nombre: this._nombre, tipo: this._tipo, precio: this._precio });
    }
}
