var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var close = document.getElementById('close');

// When the user clicks the button, open the modal 
btn.addEventListener('click', function() {
    modal.classList.remove("hidden");
});

// When the user clicks on <span> (x), close the modal
close.addEventListener('click', function() {
    modal.classList.add("hidden");
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.classList.remove("hidden");
    }
}