var userFormEl = document.querySelector("#user-form");
var wordInputEl = document.querySelector("#word");
var searchResultEl = document.querySelector("#search-result");
var wordDefinitionEl = document.querySelector("#definition");
var wordSynonymEl = document.querySelector("#synonyms");
var wordPronunciationEl = document.querySelector("#pronunciation");
var historyContainer = document.querySelector("#historyContainer");

var storageArr = [];

//loads search history on page load
window.onload = function(){
    
    if(localStorage.getItem("word") === null){
        historyContainer.textContent = "No Words Searched";
    }
    else {
        var retrieveData = localStorage.getItem("word");
        storageArr = JSON.parse(retrieveData);
        displaySearchHistory(storageArr);
        
    }
    
    
};

//function to create button for the already searched words
var getButtonVar = function(){
    var currentWord = getButtonVar.caller.arguments[0].target.id;
    var historyWord = (document.getElementById(currentWord).value);
    fetchAPI(historyWord);
    getWordFacts(historyWord);
    
}

//function to show previously searched words
var displaySearchHistory=function(storageArr){ 
    var uniqueArr = [...new Set(storageArr)];
    storageArr = uniqueArr;

    //set up the button for the history tab
    for(var i = 0; i<storageArr.length; i++){
        var historyBtn = document.createElement("input");
        historyBtn.classList = "btn-history flex-row justify-space-between align-center";
        historyBtn.type = "button";
        historyBtn.name = "button" + i;
        historyBtn.value = storageArr[i];        
        historyBtn.id = i;
        historyBtn.setAttribute("onClick","getButtonVar()");
        document.getElementById('historyContainer').appendChild(historyBtn);
    };
};

//function to store searched words
var locationStorage = function(word){
    historyContainer.textContent="";
    
    storageArr = JSON.parse(window.localStorage.getItem("word")) || [];
    var value = word;
    if(storageArr.indexOf(value)== -1){
        storageArr.push(value);
    }
    displaySearchHistory(storageArr);
    localStorage.setItem("word", JSON.stringify(storageArr));
};

//function to fetch the free dictionary api and get the info needed
var getWordFacts = function(input)
{
    //fetch the free dictionary api
    var apiUrl= "https://api.dictionaryapi.dev/api/v2/entries/en/" + input;

    //display the searched word in the h2
    searchResultEl.textContent = "Word Searched: " + input;
    
 
    fetch(apiUrl).then(function(response)
    {
        if (response.ok)
        {
            response.json().then(function(data)
            {
                //console.log(data);
                    
                    
                //print 1st definition to screen
                wordDefinitionEl.textContent = "Definition: "+ data[0].meanings[0].definitions[0].definition;
                    
                //console.log("Definition: "+ data[0].meanings[0].definitions[0].definition);

                //print 1st synonym to screen if synonyms are available
                if (data[0].meanings[0].definitions[0].synonyms[0] !== undefined)
                {
                    wordSynonymEl.textContent = "Synonym: " + data[0].meanings[0].definitions[0].synonyms[0];
                }
                    
                else
                {
                    wordSynonymEl.textContent = "There are no synonyms available.";
                }
                    
                //console.log("Synonym: " + data[0].meanings[0].definitions[0].synonyms[0]);

                //print pronunciation to screen
                wordPronunciationEl.textContent = "Pronunciation: "+ data[0].phonetic;
                    
            
            });
        }
        
        else
        {
            console.log("error");
        }
    
    });
        
};

//function to get the quote api
function fetchAPI(word){

    fetch("https://type.fit/api/quotes")
    .then(response => response.json())
    .then(function(data){
        var arr = [];
        for(var count = 0; count < data.length; count++){

            var flag = false;

            var str = data[count].text;

                arr = str.split(" ");
            for(var i = 0; i < arr.length; i++){
                if(arr[i] === word){
                    
                   $(".quotes").text(str)
                    flag = true;
                    
                }
                
            }

            if(flag){
                break;
            }

            if(count == (data.length -1)){

                $(".quotes").text('No Quote')
            }

        }
    
    })
}

//function to handle button click
var formSubmitHandler = function(event){
    event.preventDefault();
    var word = wordInputEl.value.trim();

    fetchAPI(word)

    locationStorage(word);
    wordInputEl.value="";

    getWordFacts(word);
    console.log(word)
}

userFormEl.addEventListener("submit", formSubmitHandler);


