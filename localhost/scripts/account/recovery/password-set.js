let password1 = document.querySelector("#password1");
let password2 = document.querySelector("#password2");

async function Continue(url, token) {
    if (password1.value === "") {
        ShowError("Geben Sie ein Passwort ein.");
    } else if (password2.value === "") {
        ShowError("Bestätigen Sie das Passwort.");
    } else if (password1.value != password2.value) {
        ShowError("Die Passwörter stimmen nicht überein.");
    } else {
        let response = await fetch("/api/account/recovery/password?password=" + encodeURIComponent(password1.value) + "&token=" + token);
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.assign(url); break;
                case "bad": ShowError("Passwörter müssen mindestens 8 Zeichen lang sein und mindestens einen Großbuchstaben, Kleinbuchstaben, Ziffer und Sonderzeichen enthalten."); break;
                case "same": ShowError("Dieses Passwort entspricht dem alten Passwort."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}