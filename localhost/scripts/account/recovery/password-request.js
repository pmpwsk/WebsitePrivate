let email = document.querySelector("#email");

async function Continue(url) {
    if (email.value === "") {
        ShowError("Geben Sie Ihre Email-Adresse ein.");
    } else {
        let response = await fetch("/api/account/recovery/password?email=" + encodeURIComponent(email.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.assign(url); break;
                case "no": ShowError("Ungültige Email-Adresse."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}