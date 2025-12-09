import Cl_mProducto from "./Cl_mProducto.js";
export interface iCatalogoListado {
    codigo: number | string;
    nombre: string;
    tipo: number;
    precio: number;
}

export default class Cl_mCatalogo {
    private _productos: Cl_mProducto[] = [];

    constructor(productos: Cl_mProducto[]=[]) {
        this._productos = productos;
    }

    get productos(): Cl_mProducto[] {
        return this._productos
    }

    agregarProducto(producto: Cl_mProducto) {
        this._productos.push(producto);
    }

    listado(): {codigo: string, nombre: string, tipo: number, precio: number}[] {
        let resultado = [];
        for(let p of this.productos) {
            resultado.push({
                codigo: p.codigo,
                nombre: p.nombre,
                tipo: p.tipo,
                precio: p.precio,
            })
        }
        return resultado;
    }

    toJSON(): any[] {
        return this._productos.map(p=> p.toJSON());
    }

    static fromJSON(arr: any[]): Cl_mCatalogo {
        const productos = (arr || []).map(p => new Cl_mProducto(p));
        return new Cl_mCatalogo(productos);
    }
}