let ch = 0;
let ta = document.querySelector('#text');
let editor = document.querySelector('#editor');
let page = document.body.children[1];
window.onresize = Resize;
ta.onclick = Refocus;
Resize();
Load();

function Resize() {
    let pageComp = window.getComputedStyle(page);
    let editorComp = window.getComputedStyle(editor);
    let newHeight = Math.floor(window.visualViewport.height - parseFloat(editorComp['marginTop']) - parseFloat(pageComp['paddingTop']) - parseFloat(pageComp['paddingBottom']));
    editor.style.height = newHeight+'px';
    Refocus();
}

function Refocus() {
    let nh = ta.clientHeight;
    if (ch > nh && document.activeElement === ta) {
        ta.blur();
        ta.focus();
    }
    ch = nh;
}

async function Load() {
    let response = await fetch("/api/app/notes/get?id=" + GetId());
    switch (response.status) {
        case 200:
            ta.value = await response.text();
            ta.placeholder = "Enter something...";
            break;
        case 201:
            ta.value = "";
            ta.placeholder = "Enter something...";
            ta.focus();
            break;
        default:
            ta.value = "";
            ta.placeholder = "Error loading this note's content! Try reloading the page.";
            let save = document.querySelector("#save");
            save.innerText = "Error!";
            save.className = "red";
    }
}