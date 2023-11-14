let monstruos = [];
const loader1 = document.querySelector("#loader1");

class Personaje {
    constructor(id, nombre, tipo) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
    }
}

class Monstruo extends Personaje {
    constructor(id, nombre, tipo, alias, miedo, defensa) {
        super(id, nombre, tipo);
        this.alias = alias;
        this.miedo = miedo;
        this.defensa = defensa;
    }
}

function mostrarLoader(mostrar){

    if(mostrar === false){
        loader1.classList.add("oculto");
    }
    else{
        loader1.classList.remove("oculto");
    }
}

// Hardcodeo el array de tipos en el localStorage
if (!localStorage.getItem('Tipos')) {
    const tipos = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre Lobo"];
    localStorage.setItem('Tipos', JSON.stringify(tipos));
}

// cargo los tipos del localStorage
window.onload = function () {
    try {
        const tiposGuardados = localStorage.getItem('Tipos');
        if (tiposGuardados) {
            const tipos = JSON.parse(tiposGuardados);
            cargarTipoDropdown(tipos);
        }
    } catch (error) {
        console.error('Error loading tipos:', error);
    }

    // cargo los monstruos del localStorage
    const monstruosGuardados = localStorage.getItem('monstruos');
    if (monstruosGuardados) {
        monstruos = JSON.parse(monstruosGuardados);
        updateTable();
    }

    document.getElementById('guardar-btn').addEventListener('click', agregarMonstruo);
    document.getElementById('cancelar-btn').addEventListener('click', clearForm);
    document.getElementById('modificar-btn').addEventListener('click', modificarMonstruo);
    document.getElementById('eliminar-btn').addEventListener('click', eliminarMonstruo);
};

function GetIndiceFilaSelected() {
    const selectedLink = document.querySelector('.monster-cell a.selected');
    return selectedLink ? selectedLink.closest('tr').rowIndex - 1 : -1;
}

function cargarTipoDropdown(tipos) {
    const tipoDropdown = document.getElementById('tipo');
    tipoDropdown.innerHTML = '';

    tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        tipoDropdown.appendChild(option);
    });
}

function clearForm() {
    document.getElementById('nombre').value = '';
    document.getElementById('alias').value = '';
    document.querySelector('input[name="defensa"]:checked').checked = false;
    document.getElementById('miedo').value = 0;
    document.getElementById('miedoValue').textContent = '0';
    document.getElementById('tipo').selectedIndex = 0;

    document.getElementById('guardar-btn').style.display = 'inline-block';
    document.getElementById('modificar-btn').style.display = 'none';
    document.getElementById('eliminar-btn').style.display = 'none';
}

function agregarMonstruo() {

    mostrarLoader(true);

    setTimeout(function agregarMonstruos(){

        const name = document.getElementById('nombre').value;
        const alias = document.getElementById('alias').value;
        const defensa = document.querySelector('input[name="defensa"]:checked').value;
        const miedo = document.getElementById('miedo').value;
        const tipo = document.getElementById('tipo').value;

        const newMonster = new Monstruo(monstruos.length + 1, name, tipo, alias, miedo, defensa);
        monstruos.push(newMonster);

        localStorage.setItem('monstruos', JSON.stringify(monstruos));
        console.log('Monstruo agregado:', newMonster);
        console.log('Lista Monstruos en LS: \n', localStorage['monstruos']);

        clearForm();
        updateTable();
        mostrarLoader(false);
    }, 2000);
}

function modificarMonstruo() {
    mostrarLoader(true);

    setTimeout(function agregarMonstruos(){

        const name = document.getElementById('nombre').value;
        const alias = document.getElementById('alias').value;
        const defensa = document.querySelector('input[name="defensa"]:checked').value;
        const miedo = document.getElementById('miedo').value;
        const tipo = document.getElementById('tipo').value;

        const rowIndex = GetIndiceFilaSelected();

        monstruos[rowIndex] = new Monstruo(rowIndex + 1, name, tipo, alias, miedo, defensa);
        localStorage.setItem('monstruos', JSON.stringify(monstruos));
        updateTable();
        clearForm();
        mostrarLoader(false);
    }, 2000);
    
}

function eliminarMonstruo() {
    mostrarLoader(true);

    setTimeout(function agregarMonstruos(){

        const rowIndex = GetIndiceFilaSelected();

        if (rowIndex !== -1) {

            monstruos.splice(rowIndex, 1);
            localStorage.setItem('monstruos', JSON.stringify(monstruos));
            updateTable();

            clearForm();
        }
        mostrarLoader(false);
    }, 2000);
    
}

function updateTable() {
    const tableBody = document.querySelector('#monsterTable tbody');
    tableBody.innerHTML = '';

    monstruos.forEach((monster, index) => {
        const row = tableBody.insertRow();
        const { id, nombre, alias, defensa, miedo, tipo } = monster;

        const cellName = row.insertCell(0);
        cellName.classList.add('monster-cell');
        const link = document.createElement('a');
        link.href = '#';
        link.classList.add('monster-link');
        link.textContent = nombre;

        link.setAttribute('data-index', index);

        cellName.appendChild(link);

        const cellAlias = row.insertCell(1);
        const cellDefensa = row.insertCell(2);
        const cellMiedo = row.insertCell(3);
        const cellTipo = row.insertCell(4);

        cellAlias.textContent = alias;
        cellDefensa.textContent = defensa;
        cellMiedo.textContent = miedo;
        cellTipo.textContent = tipo;
    });

    document.querySelectorAll('.monster-cell').forEach(cell => {
        cell.addEventListener('click', function () {
            // Elimino la clase 'selected' de todos los enlaces
            document.querySelectorAll('.monster-cell a').forEach(link => {
                link.classList.remove('selected');
            });

            // Añado la clase 'selected' al enlace clicado
            this.querySelector('a').classList.add('selected');

            const rowIndex = parseInt(this.querySelector('a').getAttribute('data-index'));
            const selectedMonster = monstruos[rowIndex];

            document.getElementById('nombre').value = selectedMonster.nombre;
            document.getElementById('alias').value = selectedMonster.alias;
            document.querySelector(`input[name="defensa"][value="${selectedMonster.defensa}"]`).checked = true;
            document.getElementById('miedo').value = selectedMonster.miedo;
            document.getElementById('miedoValue').textContent = document.getElementById('miedo').value;
            document.getElementById('tipo').value = selectedMonster.tipo;

            document.getElementById('guardar-btn').style.display = 'none';
            document.getElementById('modificar-btn').style.display = 'inline-block';
            document.getElementById('eliminar-btn').style.display = 'inline-block';
        });
    });
}

document.getElementById('miedo').addEventListener('input', function () {
    document.getElementById('miedoValue').textContent = this.value;
});
