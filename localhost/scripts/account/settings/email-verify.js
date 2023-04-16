let code = document.querySelector("#code");

async function Continue() {
    if (code.value === "") {
        ShowError("Geben Sie den Code ein.");
    } else {
        let response = await fetch("/api/account/settings/email?code=" + encodeURIComponent(code.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.assign("/account/settings"); break;
                case "no": ShowError("Der Code ist falsch."); break;
                case "bad": ShowError("Invalid email address."); break;
                case "exists": ShowError("Diese Email-Adresse wird bereits von einem anderen Konto genutzt."); break;
                case "same": ShowError("Diese Email-Adresse entspricht der alten Adresse."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}

async function Resend() {
    let response = await fetch("/api/account/settings/email?resend=please");
    if (response.status != 200) {
        ShowError("Verbindungsfehler.");
    }
}