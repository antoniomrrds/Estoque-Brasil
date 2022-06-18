module.exports = validation =>{
    const  nothingSpace = (str,numsSpaces=1 ) => {
        try{
            const regex = RegExp(`\\s{${numsSpaces}}\\w+\\S|\\S`,'gi')
            const  result = str.match(regex) 
            return result.join('').trim() 
        }catch(err){
            return null
        }
    }
    return {nothingSpace}
}