async function CreateFolder() {
    let name = document.querySelector("#name");
    if (name.value === "") {
        ShowError("Enter a name.");
    } else {
        let response = await fetch("/api/create-folder?name=" + encodeURIComponent(name.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.assign("/" + encodeURIComponent(name.value)); break;
                case "exists": ShowError("Another folder with this name already exists."); break;
                default: ShowError("Connection failed.");
            }
        } else {
            ShowError("Connection failed.");
        }
    }
}