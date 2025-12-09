function formatearFecha(fechaObj) {
    const anio = fechaObj.getFullYear();
    const mes = ("0" + (fechaObj.getMonth() + 1)).slice(-2);
    const dia = ("0" + fechaObj.getDate()).slice(-2);
    const hora = ("0" + fechaObj.getHours()).slice(-2);
    const minutos = ("0" + fechaObj.getMinutes()).slice(-2);
    return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
}
function ahora() {
    return new Date();
}
export { formatearFecha, ahora };
