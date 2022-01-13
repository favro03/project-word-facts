var userFormEl = document.querySelector("#user-form");
var wordInputEl = document.querySelector("#word");

var formSubmitHandler = function(event){
    event.preventDefault();
    
    var word = wordInputEl.value.trim();

    console.log(word)
}
userFormEl.addEventListener("submit", formSubmitHandler);