const convertbutton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");


async function convertValues() {
    const inputCurrencyValue = document.querySelector(".input-currency").value
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")//valor em real
    const currencyValueConverted = document.querySelector(".currency-value")//valor em outras moedas

 
    // API de cotação de moedas
    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( response => response.json())
    console.log(data)

    //Pegando o valor de alta (high) de cada moeda
    const dolarToday = data.USDBRL.high
    const euroToday = data.EURBRL.high
    const bitcoinToday = data.BTCBRL.high
    

    //Se o select estiver selecionado o valor de dolar, entre aqui
    if (currencySelect.value == "dolar") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue / dolarToday
        )
    }
    //Se o select estiver selecionado o valor de euro, entre aqui
    if (currencySelect.value == "euro") {
        currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue / euroToday)
    }

    if(currencySelect.value == "bitcoin"){
        currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BTC" ,
            minimumFractionDigits: 8
        }).format(inputCurrencyValue / bitcoinToday)
    }

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrencyValue) //Aqui usamos o ntl para formatar nosso número, para isso foi colocado as configurações de estilo, como moeda, tipo da moeda brasileira


   

}

function changeCurrency(){
   
    const currencyName = document.querySelector("#currency-name")
    const currencyImg = document.querySelector(".currency-img")

    //Alterando o nome e a imagem da moeda conforme a seleção do usuário
    if(currencySelect.value == "dolar"){
        currencyName.innerHTML = "Dólar"
        currencyImg.src = "assets/img dollar.png"
    }

    if(currencySelect.value == "euro"){
        currencyName.innerHTML = "Euro"
        currencyImg.src = "assets/img euro.png"
    }

    if(currencySelect.value =="bitcoin") {
        currencyName.innerHTML = "Bitcoin"
        currencyImg.src = "assets/img bitcoin.png"
    }

    convertValues()
}

currencySelect.addEventListener("change", changeCurrency)
convertbutton.addEventListener("click", convertValues)