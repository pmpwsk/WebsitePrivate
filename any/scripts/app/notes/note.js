let ch = 0;
let ta = document.querySelector('#text');
let editor = document.querySelector('#editor');
let sidebar = document.querySelector('.sidebar');
let save = document.querySelector('#save');
let back = document.querySelector('#back');
let page = document.querySelector('.content');
window.onresize = Resize;
ta.onclick = Refocus;
Resize();
Load();

function Resize() {
    let pageComp = window.getComputedStyle(page);
    let editorComp = window.getComputedStyle(editor);
    let newHeight = Math.floor(window.visualViewport.height - parseFloat(editorComp['marginTop']) - parseFloat(pageComp['paddingTop']) - parseFloat(pageComp['paddingBottom']));
    editor.style.flex = '1';
    editor.style.height = newHeight + 'px';
    sidebar.style.height = newHeight + 6.4 + 'px';
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

function TextChanged() {
    save.innerText = "Save";
    save.className = "green";
}

async function Save() {
    back.innerText = "Back";
    save.innerText = "Saving...";
    save.className = "green";
    try {
        let response = await fetch("/api/app/notes/save?id=" + id + "&text=" + encodeURIComponent(ta.value));
        if (response.status === 200) {
            let text = await response.text();
            if (text.startsWith("/app/notes")) {
                save.innerText = "Saved!";
                save.className = "";
            } else {
                save.innerText = "Error!";
                save.className = "red";
            }
        } else {
            save.innerText = "Error!";
            save.className = "red";
        }
    } catch {
        save.innerText = "Error!";
        save.className = "red";
    }
}

async function Back(parentLink) {
    if (save.innerText === "Save" && back.innerText == "Back") {
        back.innerText = "Discard?";
    } else {
        window.location.assign(parentLink);
    }
}