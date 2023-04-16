let code = document.querySelector("#code");

async function Continue() {
    if (code.value === "") {
        ShowError("Geben Sie den aktuellen Code oder einen Recovery-Code ein.");
    } else {
        let response = await fetch("/api/account/2fa?code=" + encodeURIComponent(code.value));
        if (response.status === 200) {
            let text = await response.text();
            if (text === "no") {
                ShowError("Der Code ist falsch.");
            } else if (text === "ok") {
                Redirect();
            } else {
                ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}