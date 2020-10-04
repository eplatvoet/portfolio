// Get the modal
var modal = document.getElementById("modalOne");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("poke");
var modalImg = document.getElementById("pokedex");
var captionTextOne = document.getElementById("captionOne");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionTextOne.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modalOne.style.display = "none";
  }


// Get the modal
var modalTwo = document.getElementById("modalTwo");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var imgTwo = document.getElementById("grub");
var modalImgTwo = document.getElementById("localGrub");
var captionTextTwo = document.getElementById("captionTwo");
imgTwo.onclick = function(){
  modalTwo.style.display = "block";
  modalImgTwo.src = this.src;
  captionTextTwo.innerHTML = this.alt;
}

var spanTwo = document.getElementsByClassName("close")[1];

spanTwo.onclick = function() {
  modalTwo.style.display = "none";
}


// Get the modal
var modalThree = document.getElementById("modalThree");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var imgThree = document.getElementById("refresh");
var modalImgThree = document.getElementById("refreshApp");
var captionTextThree = document.getElementById("captionThree");
imgThree.onclick = function(){
  modalThree.style.display = "block";
  modalImgThree.src = this.src;
  captionTextThree.innerHTML = this.alt;
}

var spanThree = document.getElementsByClassName("close")[1];

spanThree.onclick = function() {
  modalThree.style.display = "none";
}