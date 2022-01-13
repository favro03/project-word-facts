var userFormEl = document.querySelector("#user-form");
var wordInputEl = document.querySelector("#word");

var storageArr = [];

var locationStorage = function(word){
    storageArr = JSON.parse(window.localStorage.getItem("word")) || [];
    var value = word;
    if(storageArr.indexOf(value)== -1){
        storageArr.push(value);
    }
    
    localStorage.setItem("word", JSON.stringify(storageArr));
};

var formSubmitHandler = function(event){
    event.preventDefault();
    var word = wordInputEl.value.trim();
    locationStorage(word);
    wordInputEl.value="";
    console.log(word)
}
userFormEl.addEventListener("submit", formSubmitHandler);
