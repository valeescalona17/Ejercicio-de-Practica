import Cl_mTablaWeb from "./tools/Cl_mTablaWeb.js";
export default class Cl_mVenta extends Cl_mTablaWeb {
    constructor({ id, creadoEl, alias, idv, cedula, codigo, cantUnid, cantidadJuegos, cantidadPeluche, cantidadMesa }) {
        super({ id, creadoEl, alias });
        this._idv = "";
        this._cedula = "";
        this._codigo = "";
        this._cantUnid = 0;
        this._cantidadMesa = 0;
        this._cantidadPeluche = 0;
        this._cantidadJuegos = 0;
        this.idv = idv;
        this.cedula = cedula;
        this.codigo = codigo;
        this.cantUnid = cantUnid;
        this.cantidadJuegos = cantidadJuegos;
        this.cantidadPeluche = cantidadPeluche;
        this.cantidadMesa = cantidadMesa;
    }
    set cantidadJuegos(cantidadJuegos) {
        this._cantidadJuegos = cantidadJuegos;
    }
    get cantidadJuegos() {
        return this._cantidadJuegos;
    }
    set cantidadPeluche(cantidadPeluche) {
        this._cantidadPeluche = cantidadPeluche;
    }
    get cantidadPeluche() {
        return this._cantidadPeluche;
    }
    set cantidadMesa(cantidadMesa) {
        this._cantidadMesa = cantidadMesa;
    }
    get cantidadMesa() {
        return this._cantidadMesa;
    }
    get cantidadJuegosOk() {
        return this._cantidadJuegos >= 0;
    }
    get cantidadPelucheOk() {
        return this._cantidadPeluche >= 0;
    }
    get cantidadMesaOk() {
        return this._cantidadMesa >= 0;
    }
    set idv(idv) {
        this._idv = idv;
    }
    get idv() {
        return this._idv;
    }
    set cedula(cedula) {
        this._cedula = cedula;
    }
    get cedula() {
        return this._cedula;
    }
    set codigo(codigo) {
        this._codigo = codigo;
    }
    get codigo() {
        return this._codigo;
    }
    set cantUnid(cantUnid) {
        this._cantUnid = cantUnid;
    }
    get cantUnid() {
        return this._cantUnid;
    }
    get idvOk() {
        return this._idv.length > 0;
    }
    get cedulaOk() {
        return this._cedula.length > 0;
    }
    get codigoOk() {
        return this._codigo.length > 0;
    }
    get cantUnidOk() {
        return this._cantUnid > 0;
    }
    get ventaOk() {
        if (!this.idvOk)
            return "El Id de ventas es obligatorio";
        if (!this.cedulaOk)
            return "La cedula es obligatoria";
        if (!this.codigoOk)
            return "El codigo es obligatorio";
        if (!this.cantUnidOk)
            return "La cantidad es obligatoria";
        if (!this.cantidadJuegosOk)
            return "La cantidad es obligatoria";
        if (!this.cantidadPelucheOk)
            return "Llene todos los campos";
        if (!this.cantidadMesaOk)
            return "Llene todos los campos";
        return true;
    }
    productosDeCedula({ cedula, ventas, catalogo }) {
        let filtarCedula = ventas.filter(v => v.cedula === cedula);
        let resultados = [];
        for (let v of filtarCedula) {
            let producto = catalogo.productos.find(p => p.codigo === v.codigo);
            if (producto) {
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
    cantidadProductosPorTipo(ventas) {
        let cantJuegos = 0;
        let cantMesa = 0;
        let cantPeluche = 0;
        for (let v of ventas) {
            cantJuegos += v.cantidadJuegos;
            cantMesa += v.cantidadMesa;
            cantPeluche += v.cantidadPeluche;
        }
        return { cantJuegos, cantMesa, cantPeluche };
    }
    vendidoProducto({ codigo, ventas, catalogo }) {
        let filtrarCodigo = ventas.filter(v => v.codigo === codigo);
        let producto = catalogo.productos.find(p => p.codigo === codigo);
        if (!producto) {
            return 0;
        }
        let montoTotal = 0;
        filtrarCodigo.forEach(v => {
            montoTotal += v.cantUnid * producto.precio;
        });
        return montoTotal;
    }
    informacionVentasProducto({ codigo, ventas, catalogo }) {
        let filtrarCedula = ventas.filter(v => v.codigo === codigo);
        let resultados = [];
        let producto = catalogo.productos.find(p => p.codigo === codigo);
        if (!producto) {
            return [];
        }
        for (let v of filtrarCedula) {
            let unidsCompradas = v.cantidadJuegos + v.cantidadMesa + v.cantidadPeluche;
            let montoPagado = this.cantUnid * producto.precio;
            resultados.push({
                cedulaPagador: v.cedula,
                unidsCompradas,
                montoPagado,
            });
        }
        return resultados;
    }
}
