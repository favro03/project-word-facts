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

var wordbox = [];
//Will save the text value of the search and save it to an array and storage
$('.search').on("click", function (event) {
	event.preventDefault();
	word = $(this).parent('.btnPar').siblings('.textVal').val().trim();
	if (word === "") {
		return;
	};
	wordbox.push(word);

	localStorage.setItem('word', JSON.stringify(wordbox));

});

//Will create buttons based on search history 
var contHistEl = $('.wordbox');
function getHistory() {
	contHistEl.empty();

	for (let i = 0; i < wordbox.length; i++) {

		var rowEl = $('<row>');
		var btnEl = $('<button>').text(`${wordbox[i]}`)

		rowEl.addClass('row histBtnRow');
		btnEl.addClass('btn btn-outline-secondary histBtn');
		btnEl.attr('type', 'button');

		contHistEl.prepend(rowEl);
		rowEl.append(btnEl);
	} if (!word) {
		return;
	}
	//Allows the buttons to start a search as well
	$('.histBtn').on("click", function (event) {
		event.preventDefault();
		word = $(this).text();
	});
};

