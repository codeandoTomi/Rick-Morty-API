

const apiRick = async (pagina) => {
    datos()
    const url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;
    const api = await fetch(url);
    const data = await api.json();
    // console.log(data);

    const divResultado = document.querySelector('#resultado');

    // Limpiamos el contenido antes de agregar nuevos elementos
    if(divResultado){
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
                        <a href="html/pj.html" class="pCB masInformacion" data-url="${item.url}"> Más información </a>
                    </div>
                </div>
            `;
            // console.log(item.url)
            divResultado.appendChild(divItem);
        });
    }

    // Agregar manejador de eventos para el enlace "Más información"
    document.querySelectorAll('.masInformacion').forEach(link => {
        link.addEventListener('click', async (event) => {
            // console.log(event.preventDefault)
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            
            const characterUrl = link.getAttribute('data-url');
            const characterInfo = await fetch(characterUrl);
            const characterData = await characterInfo.json();

            // Aquí puedes mostrar la información adicional del personaje en el formato que desees
            console.log(characterData);
            // Por ejemplo, puedes mostrar los datos en una alerta
            // alert(`Nombre: ${characterData.name}\nEspecie: ${characterData.species}\nEstado: ${characterData.status}`);
            const resultadoPJ = document.querySelector('.masInfoPJ');
            console.log(resultadoPJ)
            const div = document.createElement('DIV');
            div.classList.add('resultadoPJ2')
            div.innerHTML = `
                <div class="card">
                    <img src="${characterData.image}" class="card-img" alt="img">
                    <div class="card-body">
                        <h5 class="pCB"> ${characterData.name} </h5>
                        <p class="pCB"> ${characterData.species} - ${characterData.status} </p>
                    </div>
                </div>
            `
            console.log(div)
            
        });
    });

};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function datos(){
    const pagina = document.querySelector('#pagina');
    // Agregamos las opciones al select
    if(pagina){
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
    }
}   
// Llamamos a la función apiRick para que cargue la primera página al inicio
apiRick(1);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


