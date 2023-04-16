let code = document.querySelector("#code");
let password = document.querySelector("#password");

async function Continue(method) {
    if (code.value === "") {
        ShowError("Geben Sie den aktuellen Code oder einen Recovery-Code ein.");
    } else if (password.value === "") {
        ShowError("Geben Sie Ihr Passwort ein.");
    } else {
        let response = await fetch("/api/account/settings/2fa?method=" + method + "&code=" + encodeURIComponent(code.value) + "&password=" + encodeURIComponent(password.value));
        if (response.status === 200) {
            let text = await response.text();
            if (text === "no") {
                ShowError("Der Code oder das Passwort ist falsch.");
            } else if (text === "ok") {
                window.location.assign("/account/settings");
            } else {
                ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}