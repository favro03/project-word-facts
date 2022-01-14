var userFormEl = document.querySelector("#user-form");
var wordInputEl = document.querySelector("#word");

var formSubmitHandler = function(event){
    event.preventDefault();
    
    var word = wordInputEl.value.trim();

    console.log(word)
}

var populateSavedWords = function() {
    // Get array from local storage
    let wordsLocalStorage = JSON.parse(localStorage.getItem("savedWords"));

    // Word exist or not. 0 = not, 1 = yes
    let wordExist = 0;
      
    if (wordLocalStorage === null) {
        // It does not exist, therefore, no items to add to saved cities
        //console.log("No items to add");  
    } else { // we will populate the saved words

    $(".list-group-item").remove(); // Remove all list items from the document with jquery
        
     for (i=0; i< wordsLocalStorage.length;i++) {

         // Populate the words as anchors and add necessary attributes and classes.
         let wordNameEl = document.createElement("a")
         let splitwordText = "";
         wordNameEl.setAttribute("href", "#")
         wordNameEl.setAttribute("data-word", wordsLocalStorage[i]);
         wordNameEl.setAttribute("id", wordsLocalStorage[i]);
         wordNameEl.setAttribute("role", "button");
         wordNameEl.classList = "list-group-item list-group-item-action list-group-item-primary";
         wordNameEl.textContent = wordsLocalStorage[i];
         //wordsListContainerEl.appendChild(wordNameEl);
         // dynContainer
         wordsContainerEl.appendChild(wordNameEl);
     };
       // alert("All saved words have been populated");
    };
};

userFormEl.addEventListener("submit", formSubmitHandler);
