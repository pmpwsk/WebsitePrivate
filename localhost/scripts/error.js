let error = document.querySelector("#error");

function ShowError(message) {
    error.firstElementChild.innerText = message;
    error.style.display = "block";
}

function HideError() {
    error.style.display = "none";
}