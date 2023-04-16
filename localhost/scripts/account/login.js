let username = document.querySelector("#username");
let password = document.querySelector("#password");

async function Continue() {
    if (username.value === "") {
        ShowError("Geben Sie Ihren Nutzernamen ein.");
    } else if (password.value === "") {
        ShowError("Geben Sie Ihr Passwort ein.");
    } else {
        let response = await fetch("/api/account/login?username=" + encodeURIComponent(username.value) + "&password=" + encodeURIComponent(password.value));
        if (response.status === 200) {
            let text = await response.text();
            if (text === "no") {
                ShowError("Der Nutzername oder das Passwort ist falsch.");
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