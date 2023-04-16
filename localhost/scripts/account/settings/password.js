let password1 = document.querySelector("#password1");
let password2 = document.querySelector("#password2");
let password = document.querySelector("#password");
let code = document.querySelector("#code");

async function Continue() {
    if (password1.value === "") {
        ShowError("Geben Sie ein Passwort ein.");
    } else if (password2.value === "") {
        ShowError("Bestätigen Sie das Passwort.");
    } else if (password1.value != password2.value) {
        ShowError("Die Passwörter stimmen nicht überein.");
    } else if (password.value === "") {
        ShowError("Geben Sie Ihr Passwort ein.");
    } else if (code.value === "") {
        ShowError("Geben Sie den aktuellen Code oder einen Recovery-Code ein.");
    } else {
        let response = await fetch("/api/account/settings/password?new-password=" + encodeURIComponent(password1.value) + "&code=" + encodeURIComponent(code.value) + "&password=" + encodeURIComponent(password.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.assign("/account/settings"); break;
                case "no": ShowError("Der Code oder das Passwort ist falsch."); break;
                case "bad": ShowError("Passwörter müssen mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, Kleinbuchstaben, Ziffer und Sonderzeichen enthalten."); break;
                case "same": ShowError("Dieses Passwort entspricht dem alten Passwort."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}

async function Cancel() {
    let response = await fetch("/api/account/settings/password?action=cancel");
    if (response.status === 200) {
        window.location.reload();
    }
}