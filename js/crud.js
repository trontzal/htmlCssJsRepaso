'use strict';

const URL = "http://127.0.0.1:3001/productos";

window.addEventListener('DOMContentLoaded', domCargado);

let table, tbody, form;
function domCargado() {
    form = document.querySelector('form');
    table = document.querySelector('table');
    tbody = document.querySelector('tbody');

    form.addEventListener('submit', guardar);

    console.log("dom cargado");
    listado();
}

async function listado() {
    const response = await fetch(URL);
    const productos = await response.json();

    tbody.innerHTML = '';

    productos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th class="text-end">${p.id}</th><td>${p.nombre}</td><td class="text-end">${p.precio}</td>
        <td>
            <a class="btn btn-sm btn-primary" href="javascript:formulario(${p.id})">Editar</a>
            <a class="btn btn-sm btn-danger" href="javascript:borrar(${p.id})">Borrar</a>
        </td>
        `;
        tbody.appendChild(tr);
    });
}

async function formulario(id) {
    if(id){
        const respuesta = await fetch(URL + "/" + id);
        const p = await respuesta.json();

        form.id.value = p.id;
        form.nombre.value = p.nombre;
        form.precio.value = p.precio;
    }else{
        form.reset();
    }
}

async function guardar(e){
    e.preventDefault();

    const producto = {nombre: form.nombre.value, precio: +form.precio.value};
    if(form.id.value){
        producto.id = +form.id.value;

        await fetch(URL + "/" + producto.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
    }else{
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
    }
    listado();
    form.reset();

}

