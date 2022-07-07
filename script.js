function Significado(word){
    fetch(`https://significado.herokuapp.com/v2/${word}`)
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
        alert('Palavra não encontrada! Tente Novamente...');
    })
}
function Sinonimos(word){
    fetch(`https://significado.herokuapp.com/v2/sinonimos/${word}`)
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
    fetch(`https://significado.herokuapp.com/v2/silabas/${word}`)
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
    fetch(`https://significado.herokuapp.com/v2/frases/${word}`)
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
    const InputValue = campoPesquisa.value;
    Significado(InputValue)
    Sinonimos(InputValue)
    Silabas(InputValue)
    Frases(InputValue)
    }
})