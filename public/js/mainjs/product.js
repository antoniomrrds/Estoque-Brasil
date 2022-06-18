
//inputs 
nameInput = document.querySelector("#inputName");
inputProvider = document.querySelector("#inputProvider");
inputValue = document.querySelector("#inputValue");
inputTheAmount = document.querySelector("#inputTheAmount");
InputCategory = document.querySelector("#InputCategory");


//validator no html
errorName = document.querySelector("#errorName");
errorProvider = document.querySelector("#errorProvider");
errorCategory = document.querySelector("#errorCategory");
errorValue = document.querySelector("#errorValue");
errorTheAmount = document.querySelector("#errorTheAmount");


const masks ={
    name(value){
        return value
        
       
    },
    money (value) {
        const cleanValue = +value.replace(/\D+/g, '')
        const options = { style: 'currency', currency: 'BRL' }
        return new Intl.NumberFormat('pt-br',options).format(cleanValue / 100)
      },
      int(value){
        return value 
        .replace(/\D+/g,'0')
    
    }
  
    
}
document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js

    $input.addEventListener('input', e => {
      e.target.value = masks[field](e.target.value)
    }, true)
  })



function validation(event, form) {

    let nameInput = document.querySelector("#inputName").value;
    let inputProvider = document.querySelector("#inputProvider").value;
    let InputCategory = document.querySelector("#InputCategory").value;
    let inputValue = document.querySelector("#inputValue").value;
    let inputTheAmount = document.querySelector("#inputTheAmount").value;
    let valueFormated=0;
    
    // error foormulario no ejs product
    // reconhece acentos 
    
    event.preventDefault();
 

    //validation
    //name error

 
   
    const name = ( nothingSpace(nameInput) == null || nameInput == undefined || validator.isEmpty(nameInput))

    //provider error
    const provider = (inputProvider == undefined || validator.isEmpty(inputProvider) || inputProvider=="Selecione")
    //category error
    const category = (InputCategory == undefined || validator.isEmpty(InputCategory) || InputCategory =="Selecione" )

    //value error
    const digit = /[0-9]/
    const value = (inputValue== 0||inputValue == undefined || validator.isEmpty(inputValue)  )

    //theAmount error
    const theAmount = (inputTheAmount == undefined || validator.isEmpty(inputTheAmount)  || !digit.test(inputTheAmount))

    
//one Error
if(name)  errorName.classList.toggle("hide")
if(category)  errorCategory.classList.toggle("hide")
if(provider)  errorProvider.classList.toggle("hide")
if(value)  errorValue.classList.toggle("hide")
if(theAmount)  errorTheAmount.classList.toggle("hide")
const product={
    name:name,
    value: valueFormated,
    theAmount:theAmount,
    provider:provider,
    category:category
 }


    if (!name && !category && !provider && !value && !theAmount) {
        form.submit();
    }

}


const nothingSpace = (str, numsSpaces = 1) => {
    try {
        const regex = RegExp(`\\s{${numsSpaces}}\\w+\\S|\\S`, 'gi')
        const result = str.match(regex)
        return result.join('').trim()
    } catch (err) {
        return null
    }
}
