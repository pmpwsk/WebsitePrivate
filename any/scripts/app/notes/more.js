let id = GetId();

function GetId() {
    try {
        let query = new URLSearchParams(window.location.search);
        if (query.has("id")) {
            return query.get("id");
        } else {
            return "default";
        }
    } catch {
        return "default";
    }
}

async function CreateNote() {
    let name = document.querySelector("#name");
    if (name.value === "") {
        ShowError("Enter a name.");
    } else {
        let response = await fetch("/api/app/notes/create-note?id=" + id + "&name=" + encodeURIComponent(name.value));
        if (response.status === 200) {
            let text = await response.text();
            if (text.startsWith("/app/notes?id=")) {
                window.location.assign(text);
            } else {
                ShowError("Connection failed.");
            }
        } else {
            ShowError("Connection failed.");
        }
    }
}

async function CreateFolder() {
    let name = document.querySelector("#name");
    if (name.value === "") {
        ShowError("Enter a name.");
    } else {
        let response = await fetch("/api/app/notes/create-folder?id=" + id + "&name=" + encodeURIComponent(name.value));
        if (response.status === 200) {
            let text = await response.text();
            if (text.startsWith("/app/notes?id=")) {
                window.location.assign(text);
            } else {
                ShowError("Connection failed.");
            }
        } else {
            ShowError("Connection failed.");
        }
    }
}

async function Rename() {
    let rename = document.querySelector("#rename");
    if (rename.value === "") {
        ShowError("Enter a new name.");
    } else {
        let response = await fetch("/api/app/notes/rename?id=" + id + "&name=" + encodeURIComponent(rename.value));
        if (response.status === 200) {
            let text = await response.text();
            if (text.startsWith("/app/notes")) {
                window.location.assign(text);
            } else {
                ShowError("Connection failed.");
            }
        } else {
            ShowError("Connection failed.");
        }
    }
}

async function Delete() {
    let deleteElement = document.querySelector("#delete");
    if (deleteElement.firstElementChild.textContent === "Really?") {
        let response = await fetch("/api/app/notes/delete?id=" + id);
        if (response.status === 200) {
            let text = await response.text();
            if (text.startsWith("/app/notes")) {
                window.location.assign(text);
            } else {
                ShowError("Connection failed.");
            }
        } else {
            ShowError("Connection failed.");
        }
    } else {
        deleteElement.firstElementChild.textContent = "Really?";
    }
}