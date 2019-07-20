// This is our API key
let APIKey = "Ht8WH9eekvUs9LRHgvqvujPAXIqPXuP6";

// Initial Array of TV Shows
let topics = ["Stranger Things", "The Office", "Friends", "Gossip Girls", "Game of Throne", "The Good Place"];

// Function for displaying tv shows data
function renderTags(){
    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#tags-view").empty();

    for (let i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array.
      let a = $("<button>");
      // Adding a class
      a.addClass("btn gifBtn");
      // Adding a data-attribute with a value of the tv show at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the tv show at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#tags-view").append(a);
    }
    console.log(topics);
}

// This .on("click") function will trigger the AJAX Call
$("#submit").on("click", function(event){
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault();

    // Here we grab the text from the input box
    let tvShows = $("#userInput").val().trim();

    if (tvShows === ""){
        alert("Please enter a TV Show.")
    }
    else if (topics.indexOf(tvShows) !== -1){
        alert("This TV Show is already in the queue!");
    }
    else{
        topics.push(tvShows);
        renderTags();
    }
});

function displayGiphy(){
    $(".gifDisplay").empty();

    let shows = $(this).attr("data-name");
    console.log(shows);

    // Here we construct our URL
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + shows + "&api_key=" + APIKey + "&limit=10";
    console.log(queryURL);
    // Here we run our AJAX call to the Giphy API
    $.ajax({
       url: queryURL,
       method: "GET"
    }).then(function(response){
       // Log the resulting object
       console.log(response);
        
       // Take Gif array
       let giphy = response.data;
        // Go through the array to display the gifs 
       for (let i = 0; i < giphy.length; i++){
            let gifDiv = $("<div>");
            gifDiv.addClass("GIFs mb-3 border-bottom");
            let rating = giphy[i].rating;
            // Show rating
            let p = $("<p>").text("Rating: " + rating);
            // Show gif img
            let gifImage = $("<img>");

            // Set still & animated gifs
            let stillImg = giphy[i].images.fixed_height_still.url;
            let animatedImg = giphy[i].images.fixed_height.url;

            // Set attribute for the gif img, start off state still
            gifImage.attr({"src": stillImg, "data-still": stillImg, "data-animate": animatedImg, "data-state":"still"});
            // Append to our gifDiv
            gifDiv.append(gifImage);
            gifDiv.append(p);

            // Append to our Gif Display box
            $(".gifDisplay").append(gifDiv);
       }
    });
}

$("img").on("click", function(){

});

// When gif button is clicked, it displays giphy

// Calling the renderTags function at least once to display the initial list of movies
$(document).on("click", ".gifBtn", displayGiphy);
renderTags();
