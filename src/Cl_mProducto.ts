import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export interface iProducto {
    id: number | null;
    creadoEl: string | null;
    alias: string | null;
    codigo: string;
    nombre: string;
    tipo: number; //1:consola, 2: peluche, 3: juego de mesa
    precio: number;
}

export default class Cl_mProducto extends Cl_mTablaWeb {
    private _codigo: string = "";
    private _nombre: string = "";
    private _tipo: number = 0;
    private _precio: number = 0;

    constructor({id, creadoEl, alias, codigo, nombre, tipo, precio}: iProducto = {
        id: null,
        creadoEl: null,
        alias: null,
        codigo: "",
        nombre: "",
        tipo: 0,
        precio: 0
    }) {
        super({id, creadoEl, alias});
        this.codigo = codigo;
        this.nombre = nombre;
        this.tipo = tipo;
        this.precio = precio;
    }

    set codigo(codigo: string) {
        this._codigo = codigo.toUpperCase().trim();
    }

    get codigo(): string {
        return this._codigo;
    }

    set nombre(nombre: string) {
        this._nombre = nombre;
    }

    get nombre(): string {
        return this._nombre;
    }

    set tipo(tipo: number) {
        this._tipo = tipo;
    }

    get tipo(): number {
        return this._tipo;
    }

    set precio(precio: number) {
        this._precio = precio;
    }

    get precio(): number {
        return this._precio;
    }

    get codigoOk(): boolean {
        return this._codigo.length > 0;
    }

    get nombreOk(): boolean {
        return this._nombre.length > 0;
    }

    get tipoOk(): boolean {
        return this._tipo > 0 && this._tipo < 4;
    }

    get precioOk(): boolean {
        return this._precio > 0;
    }

    get productoOk(): string | true {
        if(!this.codigoOk) return "El codigo es obligatorio";
        if(!this.nombreOk) return "El nombre es obligatorio";
        if(!this.tipoOk) return "El tipo es obligatorio";
        if(!this.precioOk) return "El precio es obligatorio";
        return true;
    }

    toJSON(): iProducto {
        return {
            ...super.toJSON(),
            codigo: this._codigo,
            nombre: this._nombre,
            tipo: this._tipo,
            precio: this._precio,
        };
    }
}