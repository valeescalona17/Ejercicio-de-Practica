/** BoxCinemas es una cadena de cines que ofrece la exhibición de varias películas taquilleras.
 * Se conoce por cada película su código, nombre, precio infantil y precio adulto. Para llevar el
 * control de la venta de entradas, BoxCinemas desea registrar por cada venta: el id, la cédula del
 * pagador (no hay más datos del pagador), el código de la película, la cantidad de niños y la cantidad
 * de adultos. La empresa requiere una APP web que permita reportar información relativa a las
 * operaciones de ventas de entradas, comenzando con los siguientes requerimientos:
 *
a. Información de películas en cartelera
b. Cantidad de niños y cantidad de adultos que asistieron al cine
c. Monto recaudado para un código de película dado
d. Información de las películas vistas por una cédula dada
e. Información de asistentes a una película (cédula pagador, cantidad de personas, total pagado). */
import Cl_Controlador from "./Cl_Controlador.js";
const app = new Cl_Controlador();
window.app = app;
