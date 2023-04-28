let ch = 0;
let ta = document.querySelector('#text');
let editor = document.querySelector('#editor');
let page = document.body.children[1];
window.onresize = Resize;
ta.onclick = Refocus;
Resize();


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