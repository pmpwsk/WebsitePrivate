let subject = document.querySelector("#subject");
let date = document.querySelector("#date");
let start = document.querySelector("#start");
let end = document.querySelector("#end");

async function Edit(id) {
    if (date.value === "") {
        ShowError("Geben Sie ein Datum ein.");
    } else if (start.value === "") {
        ShowError("Geben Sie eine Beginn-Zeit ein.");
    } else if (end.value === "") {
        ShowError("Geben Sie eine Beginn-Zeit ein.");
    } else {
        let response = await fetch("/api/groups/edit?id=" + id + "&subject=" + subject.value + "&date=" + encodeURIComponent(date.value) + "&start=" + encodeURIComponent(start.value) + "&end=" + encodeURIComponent(end.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.reload(); break;
                case "bad-time": ShowError("Ungültige Zeit."); break;
                case "bad-date": ShowError("Ungültiges Datum."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}