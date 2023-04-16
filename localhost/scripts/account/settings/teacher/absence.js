let start = document.querySelector("#start");
let end = document.querySelector("#end");
let reason = document.querySelector("#reason");

async function Add() {
    if (start.value === "") {
        ShowError("Geben Sie den Beginn ein.");
    } else if (end.value === "") {
        ShowError("Geben Sie das Ende ein.");
    } else if (reason.value === "") {
        ShowError("Geben Sie einen Grund ein.")
    } else {
        let response = await fetch("/api/account/settings/teacher/add-absence?start=" + encodeURIComponent(start.value) + "&end=" + encodeURIComponent(end.value) + "&reason=" + encodeURIComponent(reason.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.reload(); break;
                case "bad": ShowError("Ungültiges Datum."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}

async function Remove(absence) {
    let response = await fetch("/api/account/settings/teacher/remove-absence?absence=" + encodeURIComponent(absence));
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