let password = document.querySelector("#password");
let code = document.querySelector("#code");

async function Continue() {
    if (password.value === "") {
        ShowError("Geben Sie Ihr Passwort ein.");
    } else if (code.value === "") {
        ShowError("Geben Sie den aktuellen Code oder einen Recovery-Code ein.");
    } else {
        let response = await fetch("/api/account/settings/delete?code=" + encodeURIComponent(code.value) + "&password=" + encodeURIComponent(password.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.assign("/"); break;
                case "no": ShowError("Der Code oder das Passwort ist falsch."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}