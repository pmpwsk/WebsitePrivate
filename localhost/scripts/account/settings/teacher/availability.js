let start = document.querySelector("#start");
let end = document.querySelector("#end");
let day = document.querySelector("#day");

async function Add() {
    if (start.value === "") {
        ShowError("Geben Sie den Beginn ein.");
    } else if (end.value === "") {
        ShowError("Geben Sie das Ende ein.");
    } else {
        let response = await fetch("/api/account/settings/teacher/add-availability?start=" + encodeURIComponent(start.value) + "&end=" + encodeURIComponent(end.value) + "&day=" + encodeURIComponent(day.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.reload(); break;
                case "bad": ShowError("Ungültige Uhrzeit."); break;
                case "same": ShowError("Diese Zeitspanne entspricht der alten Zeitspanne."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}

async function Remove(d) {
    let response = await fetch("/api/account/settings/teacher/remove-availability?day=" + encodeURIComponent(d));
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