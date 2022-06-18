nameInput = document.querySelector("#inputName");
errorName = document.querySelector("#errorName");

nameInput.addEventListener("keyup", (e) => {
    const onlyLetters = /^([a-zA-Zà-úÀ-Ú]|-|_|\s)+$/gi;
    const key = String.fromCharCode(e.keyCode);
    if (!onlyLetters.test(key)) {
        e.preventDefault()
        return
    }
});


function validation(event, form) {
    nameInput = document.querySelector("#inputName").value;
    const regex = /^([a-zA-Zà-úÀ-Ú]|-|_|\s)+$/gi;
    event.preventDefault();
    if (!regex.test(nameInput) || !nameInput.trim()|| nothingSpace(nameInput)== null || nameInput == undefined) {
        errorName.classList.toggle("hide")
        
        return
    }

if(nameInput != undefined ||!nothingSpace(nameInput)== null ||!nameInput ){
    form.submit();
}
    
}

const  nothingSpace = (str,numsSpaces=1 ) => {
    try{
        const regex = RegExp(`\\s{${numsSpaces}}\\w+\\S|\\S`,'gi')
        const  result = str.match(regex) 
        return result.join('').trim() 
    }catch(err){
        return null
    }
}
