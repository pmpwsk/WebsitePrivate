let password1 = document.querySelector("#password1");
let password2 = document.querySelector("#password2");
let password = document.querySelector("#password");
let code = document.querySelector("#code");

async function Continue() {
    if (password1.value === "") {
        ShowError("Enter a password.");
    } else if (password2.value === "") {
        ShowError("Confirm the password.");
    } else if (password1.value != password2.value) {
        ShowError("The passwords do not match.");
    } else if (password.value === "") {
        ShowError("Enter your password.");
    } else if (code.value === "") {
        ShowError("Enter the current code or a recovery code.");
    } else {
        let response = await fetch("/api/account/settings/password?new-password=" + encodeURIComponent(password1.value) + "&code=" + encodeURIComponent(code.value) + "&password=" + encodeURIComponent(password.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.assign("/account/settings"); break;
                case "no": ShowError("Invalid password or 2FA code."); break;
                case "bad": ShowError("Passwords must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, digit and special character."); break;
                case "same": ShowError("The provided password is the same as the old one."); break;
                default: ShowError("Connection failed.");
            }
        } else {
            ShowError("Connection failed.");
        }
    }
}

async function Cancel() {
    let response = await fetch("/api/account/settings/password?action=cancel");
    if (response.status === 200) {
        window.location.reload();
    }
}