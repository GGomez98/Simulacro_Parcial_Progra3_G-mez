import { escribir,jsonToObject,leer,objectToJson,limpiar } from "./local-storage.js";
import {Anuncio_Auto} from "./Anuncio_Auto.js"

const KEY_STORAGE = "anuncios";
const items = []; // array vacio
const formulario = document.getElementById("form-item");

document.addEventListener('DOMContentLoaded', onInit)

function onInit(){
    loadItems();
    rellenarTabla();

    escuchandoFormulario();
}

function loadItems() {
    let str = leer(KEY_STORAGE);
    const objetos = jsonToObject(str) || [];

    objetos.forEach(obj => {
        const model = new Anuncio_Auto(
            obj.id,
            obj.titulo,
            obj.transaccion,
            obj.precio,
            obj.descripcion,
            obj.num_puertas,
            obj.num_KMs,
            obj.potencia
        );
    
        items.push(model);
    });
}

function rellenarTabla() {
    const tabla = document.getElementById("table-items");
    let tbody = tabla.getElementsByTagName('tbody')[0];
  
    tbody.innerHTML = ''; // Me aseguro que esté vacio, hago referencia al agregar otro

    const celdas = ["id","titulo", "transaccion", "precio", "descripcion", "num_puertas", "num_KMs", "potencia"];

    items.forEach((item) => {
        let nuevaFila = document.createElement("tr");
        celdas.forEach((celda) => {
            let nuevaCelda = document.createElement("td");
            nuevaCelda.textContent = item[celda];

            nuevaFila.appendChild(nuevaCelda);
        });

        // Agregar la fila al tbody
        tbody.appendChild(nuevaFila);
    });
}

  function escuchandoFormulario() {
    formulario.addEventListener("submit", (e) => {
      e.preventDefault();

      var fechaActual = new Date();

      let radioButtons = formulario.querySelectorAll('.rdbTransaccion');
      let radioButtonSeleccionado;

      radioButtons.forEach((rdb)=>{
        if(rdb.checked){
            radioButtonSeleccionado = rdb.labels[0].textContent;
        }
      })
  
      const model = new Anuncio_Auto(
        fechaActual.getTime(),
        formulario.querySelector('#txtTitulo').value,
        radioButtonSeleccionado,
        formulario.querySelector('#txtPrecio').value,
        formulario.querySelector('#txtDescripcion').value,
        formulario.querySelector('#txtPuertas').value,
        formulario.querySelector('#txtKMs').value,
        formulario.querySelector('#txtPotencia').value
      );
  
      const respuesta = model.verify();
  
      if (respuesta.success) {
        items.push(model);
        const str = objectToJson(items);
        escribir(KEY_STORAGE, str);
  
        actualizarFormulario();
        rellenarTabla();
      }
      else {
          alert(respuesta.rta);
      }
    });
}

  function actualizarFormulario() {
    formulario.reset();
}