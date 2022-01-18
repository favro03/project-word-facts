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
    fetchAPI(word)
    
    locationStorage(word);
    wordInputEl.value="";
   

    
}
userFormEl.addEventListener("submit", formSubmitHandler);





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

