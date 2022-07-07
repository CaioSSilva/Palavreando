const BASE_URL = 'https://significado.herokuapp.com/v2/'
function Significado(word){
    fetch(BASE_URL + word)
    .then(response => response.json())
    .then(significado =>{
        document.getElementById('significado').innerHTML =
        `
        <div>
            <h1>${word.toUpperCase()}</h1>
            <p>${significado.map(significado => significado.partOfSpeech).join(', ')}</p>
            <ol class="result-significado">
                <li>${significado.map(significado => significado.meanings.map(significado => significado).join('<li/>'))}</li>
            </ol>
        </div>
    `
    })
    .catch(() =>{
        Error()
    })
}
function Sinonimos(word){
    fetch( BASE_URL + 'sinonimos/' + word)
    .then(response => response.json())
    .then(sinonimos =>{
        if(sinonimos.length > 0){
            document.getElementById('sinonimos').innerHTML =
            `
            <div class="result-significado">
                <h1>Sinonimos</h1>
                <p>${sinonimos.map(sinonimos => sinonimos).join(', ')}</p>
            </div>
            `
        }
    })
    
}
function Silabas(word){
    fetch(BASE_URL + 'silabas/' + word)
    .then(response => response.json())
    .then(silabas =>{
        if(silabas.length > 0){
            const silabaResult = silabas.map(silabas => silabas).join(' - ')
            document.getElementById('silabas').innerHTML =
            `
            <div class="result-significado">
                <h1>Silabas</h1>
                <p>${silabaResult}</p>
            </div>
            `
        }
    })
}
function Frases(word){
    fetch(BASE_URL + 'frases/' + word)
    .then(response => response.json())
    .then(frases =>{
        if(frases.length > 0){
            document.getElementById('frases').innerHTML =
            `
            <div class="result-significado">
                <h1>Frases</h1>
                <p>${frases.map(frases => frases.sentence).join('<br/> <br/>')}</p>
            </div>
            `
        }
    })
}
const SearchButton = document.getElementById('search-button');
const campoPesquisa = document.getElementById('palavra-search');
SearchButton.addEventListener('click', () => {
    document.getElementById('significado').innerHTML = ``
    document.getElementById('sinonimos').innerHTML = ``
    document.getElementById('silabas').innerHTML = ``
    document.getElementById('frases').innerHTML = ``
    document.getElementById('error-div').style.display = "none"
    const InputValue = campoPesquisa.value;
    Significado(InputValue)
    Sinonimos(InputValue)
    Silabas(InputValue)
    Frases(InputValue)
})
campoPesquisa.addEventListener("keydown", (key) =>{
    if (key.code === "Enter") {
    document.getElementById('significado').innerHTML = ``
    document.getElementById('sinonimos').innerHTML = ``
    document.getElementById('silabas').innerHTML = ``
    document.getElementById('frases').innerHTML = ``
    document.getElementById('error-div').style.display = "none"
    const InputValue = campoPesquisa.value;
    Significado(InputValue)
    Sinonimos(InputValue)
    Silabas(InputValue)
    Frases(InputValue)
    }
})
function Error(){
    document.getElementById('error-div').style.display = "flex";
}
function demisError(){
    document.getElementById('error-div').style.display = "none";
    campoPesquisa.value = ''
}