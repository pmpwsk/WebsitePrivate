let username = document.querySelector("#username");
let password = document.querySelector("#password");

async function Continue() {
    if (username.value === "") {
        ShowError("Enter your username.");
    } else if (password.value === "") {
        ShowError("Enter your password.");
    } else {
        let response = await fetch("/api/account/login?username=" + encodeURIComponent(username.value) + "&password=" + encodeURIComponent(password.value));
        if (response.status === 200) {
            let text = await response.text();
            if (text === "no") {
                ShowError("Invalid username or password.");
            } else if (text === "ok") {
                Redirect();
            } else {
                ShowError("Connection failed.");
            }
        } else {
            ShowError("Connection failed.");
        }
    }
}