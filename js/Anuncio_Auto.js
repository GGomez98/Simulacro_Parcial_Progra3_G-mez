import {Anuncio} from "./Anuncio.js"

class Anuncio_Auto extends Anuncio{
    constructor(id, titulo, transaccion, precio, descripcion, num_puertas, num_KMs, potencia){
        super(id, titulo, transaccion, precio, descripcion);
        this.num_puertas = num_puertas,
        this.num_KMs = num_KMs,
        this.potencia = potencia
    }
}

export {Anuncio_Auto};