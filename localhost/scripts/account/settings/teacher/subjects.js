let subject = document.querySelector("#subject");
let limit = document.querySelector("#limit");

async function Add() {
    var lim = limit.value;
    if (lim === "") {
        lim = "null";
    }
    let response = await fetch("/api/account/settings/teacher/add-subject?subject=" + encodeURIComponent(subject.value) + "&limit=" + encodeURIComponent(lim));
    if (response.status === 200) {
        let text = await response.text();
        switch (text) {
            case "ok": window.location.reload(); break;
            case "bad": ShowError("Ungültiges Schuljahr-Limit."); break;
            case "same": ShowError("Dieser Wert entspricht dem alten Wert."); break;
            default: ShowError("Verbindungsfehler.");
        }
    } else {
        ShowError("Verbindungsfehler.");
    }
}

async function Remove(sub) {
    let response = await fetch("/api/account/settings/teacher/remove-subject?subject=" + encodeURIComponent(sub));
    if (response.status === 200) {
        let text = await response.text();
        switch (text) {
            case "ok": window.location.reload(); break;
            default: ShowError("Verbindungsfehler.");
        }
    } else {
        ShowError("Verbindungsfehler.");
    }
}