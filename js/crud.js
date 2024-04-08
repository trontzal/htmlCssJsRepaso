'use strict';

const URL = "http://127.0.0.1:3001/productos";

window.addEventListener('DOMContentLoaded', domCargado);

let table, tbody;
function domCargado() {
    // form = document.querySelector('form');
    table = document.querySelector('table');
    tbody = document.querySelector('tbody');

    console.log("dom cargado");
    listado();
}

async function listado() {
    const response = await fetch(URL);
    const productos = await response.json();

    console.log("listado");
    console.log(productos);

    tbody.innerHTML = '';

    productos.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<th class="text-end">${p.id}</th><td>${p.nombre}</td><td class="text-end">${p.precio}</td>
        <td>
            <a class="btn btn-sm btn-primary" href="javascript:formulario(${p.id})">Editar</a>
            <a class="btn btn-sm btn-danger" href="javascript:borrar(${p.id})">Borrar</a>
        </td>`;
        tbody.appendChild(tr);
    });
}

