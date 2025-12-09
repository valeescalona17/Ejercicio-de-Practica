import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
import Cl_mProducto from "./Cl_mProducto.js";
import Cl_mCatalogo from "./Cl_mCatalogo.js";

export interface iVentas {
    id: number | null;
    creadoEl: string | null;
    alias: string | null;
    idv: string;
    cedula: string;
    codigo: string;
    cantUnid: number;
    cantidadMesa: number;
    cantidadPeluche: number;
    cantidadJuegos: number;
}

export interface iInfoAsistente {
    cedula: string;
    cantUnids: number;
    totalPagado: number;
}

export default class Cl_mVenta extends Cl_mTablaWeb {
    private _idv: string = "";
    private _cedula: string = "";
    private _codigo: string = "";
    private _cantUnid: number = 0;
    private _cantidadMesa: number = 0;
    private _cantidadPeluche: number = 0;
    private _cantidadJuegos: number = 0;

    constructor({id, creadoEl,alias, idv, cedula, codigo, cantUnid, cantidadJuegos, cantidadPeluche, cantidadMesa}: iVentas) {
        super({id, creadoEl, alias});
        this.idv = idv;
        this.cedula = cedula;
        this.codigo = codigo;
        this.cantUnid = cantUnid;
        this.cantidadJuegos = cantidadJuegos;
        this.cantidadPeluche = cantidadPeluche;
        this.cantidadMesa = cantidadMesa;
    }

    set cantidadJuegos(cantidadJuegos: number) {
        this._cantidadJuegos = cantidadJuegos;
    }

    get cantidadJuegos(): number {
        return this._cantidadJuegos;
    }

    set cantidadPeluche(cantidadPeluche: number) {
        this._cantidadPeluche = cantidadPeluche;
    }

    get cantidadPeluche(): number {
        return this._cantidadPeluche;
    }

    set cantidadMesa(cantidadMesa: number) {
        this._cantidadMesa = cantidadMesa;
    }

    get cantidadMesa(): number {
        return this._cantidadMesa;
    }

    get cantidadJuegosOk(): boolean {
        return this._cantidadJuegos >= 0;
    }

    get cantidadPelucheOk(): boolean {
        return  this._cantidadPeluche >= 0;
    }

    get cantidadMesaOk(): boolean {
        return this._cantidadMesa >= 0;
    }

    set idv(idv: string) {
        this._idv = idv;
    }

    get idv(): string {
        return this._idv;
    }

    set cedula(cedula: string) {
        this._cedula = cedula;
    }

    get cedula(): string {
        return this._cedula;
    }

    set codigo(codigo: string) {
        this._codigo = codigo;
    }

    get codigo(): string {
        return this._codigo;
    }

    set cantUnid(cantUnid: number) {
        this._cantUnid = cantUnid;
    }

    get  cantUnid(): number {
        return this._cantUnid;
    }

    get idvOk(): boolean {
        return this._idv.length > 0;
    }

    get cedulaOk(): boolean {
        return this._cedula.length > 0;
    }

    get codigoOk(): boolean {
        return this._codigo.length > 0;
    }

    get cantUnidOk(): boolean {
        return this._cantUnid > 0;
    }

    get ventaOk(): string | true {
        if(!this.idvOk) return "El Id de ventas es obligatorio";
        if(!this.cedulaOk) return "La cedula es obligatoria";
        if(!this.codigoOk) return "El codigo es obligatorio";
        if(!this.cantUnidOk) return "La cantidad es obligatoria";
        if(!this.cantidadJuegosOk) return "La cantidad es obligatoria";
        if(!this.cantidadPelucheOk) return "Llene todos los campos";
        if(!this.cantidadMesaOk) return "Llene todos los campos";
        return true;
    }

    productosDeCedula({cedula, ventas, catalogo}: {cedula: string, ventas: Cl_mVenta[], catalogo: Cl_mCatalogo}): 
    {codigo: string, nombre: string, tipo: number, cantUnid: number, montoPagado: number}[] {
        let filtarCedula = ventas.filter(v => v.cedula === cedula);
        let resultados = [];
        for(let v of filtarCedula) {
            let producto = catalogo.productos.find(p => p.codigo === v.codigo)
            if(producto) {
                resultados.push({
                    codigo: producto.codigo,
                    nombre: producto.nombre,
                    tipo: producto.tipo,
                    cantUnid: v.cantUnid,
                    montoPagado: v.cantUnid * producto.precio
                });
            }
        }
        return resultados;
    }

    cantidadProductosPorTipo(ventas: Cl_mVenta[]): {cantJuegos: number, cantMesa: number, cantPeluche: number} {
        let cantJuegos = 0;
        let cantMesa = 0;
        let cantPeluche = 0;
        for(let v of ventas) {
            cantJuegos += v.cantidadJuegos;
            cantMesa += v.cantidadMesa;
            cantPeluche += v.cantidadPeluche;
        }
        return { cantJuegos, cantMesa, cantPeluche };
    }

    vendidoProducto({codigo, ventas, catalogo}: {codigo: string, ventas: Cl_mVenta[], catalogo: Cl_mCatalogo}): number {
        let filtrarCodigo = ventas.filter(v => v.codigo === codigo);
        let producto = catalogo.productos.find(p => p.codigo ===codigo);
        if(!producto) {
            return 0;
        }
        let montoTotal = 0;
        filtrarCodigo.forEach(v => {
            montoTotal += v.cantUnid * producto.precio;
        })
        return montoTotal;
    }

     informacionVentasProducto({codigo, ventas, catalogo}: {codigo: string, ventas: Cl_mVenta[], catalogo: Cl_mCatalogo}): 
     {cedulaPagador: string, unidsCompradas: number, montoPagado: number}[] {
        let filtrarCedula = ventas.filter(v => v.codigo === codigo);
        let resultados = [];
        let producto = catalogo.productos.find(p => p.codigo === codigo);
        if(!producto) {
            return [];
        }
        for(let v of filtrarCedula) {
            let unidsCompradas = v.cantidadJuegos + v.cantidadMesa + v.cantidadPeluche;
            let montoPagado =  this.cantUnid * producto.precio;

            resultados.push({
                cedulaPagador: v.cedula,
                unidsCompradas,
                montoPagado,
            })
        }
        return resultados;
     }
}