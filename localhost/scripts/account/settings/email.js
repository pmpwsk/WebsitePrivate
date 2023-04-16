let email = document.querySelector("#email");
let password = document.querySelector("#password");
let code = document.querySelector("#code");

async function Continue() {
    if (email.value === "") {
        ShowError("Geben Sie eine Email-Adresse ein.");
    } else if (password.value === "") {
        ShowError("Geben Sie Ihr Passwort ein.");
    } else if (code.value === "") {
        ShowError("Geben Sie den aktuellen Code oder einen Recovery-Code ein.");
    } else {
        let response = await fetch("/api/account/settings/email?email=" + encodeURIComponent(email.value) + "&code=" + encodeURIComponent(code.value) + "&password=" + encodeURIComponent(password.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.reload(); break;
                case "no": ShowError("Der Code oder das Passwort ist falsch."); break;
                case "bad": ShowError("Ungültige Email-Adresse."); break;
                case "exists": ShowError("Diese Email-Adresse wird bereits von einem anderen Konto genutzt."); break;
                case "same": ShowError("Diese Email-Adresse entspricht der alten Adresse."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}