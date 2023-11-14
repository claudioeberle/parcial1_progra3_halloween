let monstruos;
let iconos = ["bat.png", "castle.png", "ghost.png", "apple.png", "hand.png", "pumpkin.png", "toad.png", "witch.png", "scarecrow.png", "spider.png", "spider-web.png", "frankenstein.png", "cat.png", "cauldron.png"]

window.onload = function () {
    try {
        const monstruosGuardados = localStorage.getItem('monstruos');
        if (monstruosGuardados.length > 0) {
            monstruos = JSON.parse(monstruosGuardados);
            updateMonstruoCards();
        }
    } catch (error) {
        console.error('Error cargando monstruos:', error);
    }
};

function updateMonstruoCards() {

    const monstruoContainer = document.getElementById('monstruo-container');
    monstruoContainer.innerHTML = ''; // Limpio el contenido actual
    let monstruoCard = document.createElement('div');

    if(monstruos.length > 0){
        console.log(monstruos);
        monstruos.forEach(monster => {
            // Creo una tarjeta para cada monstruo
            const monstruoCard = document.createElement('div');
            monstruoCard.classList.add('monstruo-card');
    
            // Agrego las características del monstruo a la tarjeta
            monstruoCard.innerHTML = `
                <img src=${definirIcono()} width="45" alt="icono-monstruo">
                <h2>${monster.nombre}</h2>
                <p>Alias: ${monster.alias}</p>
                <p>Defensa: ${monster.defensa}</p>
                <p>Miedo: ${monster.miedo}</p>
                <p>Tipo: ${monster.tipo}</p>
            `;
    
            // Agrego la tarjeta al contenedor principal
            monstruoContainer.appendChild(monstruoCard);
        });
    }
    else{
        monstruoCard.innerHTML = `
                <h2>No hay montruos cargados</h2>
            `;
    
            // Agregar la tarjeta al contenedor principal
            monstruoContainer.appendChild(monstruoCard);
    }
    
}

function definirIcono(){

    let index = Math.floor(Math.random() * 14);
    return "./assets/ico/" + iconos[index];
}