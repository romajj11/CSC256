document.addEventListener("DOMContentLoaded", function () {
  const slideImg = document.getElementById("slide");

// List of image paths
  const images = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg"
  ];
// Keeps track of which image is currently shown
  let currentIndex = 0;

// Updates the <img> tag with a new image from the array
  function showImage(index) {
    slideImg.src = images[index];
  }

// Goes to the next image in the array (loops to the start)
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

// Goes to the previous image 
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  // Make the functions accessible globally so HTML buttons can use them
  window.nextImage = nextImage;
  window.prevImage = prevImage;
});

