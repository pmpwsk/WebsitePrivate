let username = document.querySelector("#username");
let email = document.querySelector("#email");

async function Create() {
    if (username.value === "") {
        ShowError("Enter a username.");
    } else if (email.value === "") {
        ShowError("Enter an email address.");
    } else {
        let response = await fetch("/api/server/users/create?username=" + encodeURIComponent(username.value) + "&email=" + encodeURIComponent(email.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.reload(); break;
                case "bad-username": ShowError("Usernames must be at least 3 characters long and only contain lowercase letters, digits, dashes, dots and underscores. The first and last characters can only be letters or digits."); break;
                case "bad-email": ShowError("Invalid email address."); break;
                case "username-exists": ShowError("This username is already being used by another account."); break;
                case "email-exists": ShowError("This email address is already being used by another account."); break;
                default: ShowError("Connection failed.");
            }
        } else {
            ShowError("Connection failed.");
        }
    }
}