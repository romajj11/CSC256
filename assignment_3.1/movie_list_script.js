// Create empty array to store movie titles
let movieArray = [];

// Function to add a movie title to array
function addMovie() {
  // Get the input box
  const input = document.getElementById("movieInput");

  // Get the trimmed value from the input
  const title = input.value.trim();

  // If input is not empty add it to array
  if (title) {
    movieArray.push(title);         // Add to movie list
    input.value = "";               // Clear the input box
    updateDisplay();                // Update the display on the page
  } else {
    // Show alert if input is empty
    alert("Please enter a movie title.");
  }
}

// Function to update the movie list shown on the page
function updateDisplay() {
  const listDiv = document.getElementById("movieList");

  // Use map to format each movie title in a <div>
  listDiv.innerHTML = movieArray.map(movie => `<div>${movie}</div>`).join('');
}

// Function to open a popup window and show the list
function displayList() {
  let popup = window.open("", "Movie List", "width=400,height=300");

  // Write HTML content into the popup window
  popup.document.write("<h2>Movie List:</h2>");
  popup.document.write("<ul>");
  movieArray.forEach(movie => {
    popup.document.write(`<li>${movie}</li>`);
  });
  popup.document.write("</ul>");
}

// Function to clear the movie list and reset the display
function resetList() {
  movieArray = [];                               // Clear the array
  document.getElementById("movieInput").value = "";  // Clear input box
  document.getElementById("movieList").innerHTML = ""; // Clear displayed list
}
