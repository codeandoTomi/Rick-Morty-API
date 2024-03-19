

const apiRick = async (pagina) => {
    const url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;
    const api = await fetch(url);
    const data = await api.json();
    console.log(data);

    const divResultado = document.querySelector('#resultado');

    // Limpiamos el contenido antes de agregar nuevos elementos
    divResultado.innerHTML = '';

    data.results.forEach(item => {
        const divItem = document.createElement('DIV');
        divItem.classList.add('divDesdeJS')
        divItem.innerHTML =  `
            <div class="card">
                <img src="${item.image}" class="card-img" alt="img">
                <div class="card-body">
                    <h5 class="pCB"> ${item.name} </h5>
                    <p class="pCB"> ${item.species} - ${item.status} </p>
                    <a href="${item.url}" class="pCB"> Más información </a>
                </div>
            </div>
        `;
        divResultado.appendChild(divItem);
    });
};

const pagina = document.querySelector('#pagina');

// Agregamos las opciones al select
for(let i = 1; i <= 42; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    pagina.appendChild(option);
}

// Manejamos el evento change en lugar de click
pagina.addEventListener('change', () => {
    apiRick(pagina.value);
    console.log(pagina.value)
});

// Llamamos a la función apiRick para que cargue la primera página al inicio
apiRick(1);