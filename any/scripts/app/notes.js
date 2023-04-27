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

function TextChanged() {
    let save = document.querySelector("#save");
    save.innerText = "Save";
    save.className = "green";
}

async function Save() {
    let back = document.querySelector("#back");
    back.innerText = "Back";
    let save = document.querySelector("#save");
    save.innerText = "Saving...";
    save.className = "green";
    let textElement = document.querySelector("#text");
    let text = textElement.value;
    if (text === "") {
        text = "null";
    }
    try {
        let response = await fetch("/api/app/notes/save?id=" + id + "&text=" + encodeURIComponent(text));
        if (response.status === 200) {
            let text = await response.text();
            if (text.startsWith("/app/notes")) {
                save.innerText = "Saved!";
                save.className = "";
            } else {
                save.innerText = "Error!";
                save.className = "red";
            }
        } else {
            save.innerText = "Error!";
            save.className = "red";
        }
    } catch {
        save.innerText = "Error!";
        save.className = "red";
    }
}

async function Back(parentLink) {
    let back = document.querySelector("#back");
    let save = document.querySelector("#save");
    if (save.innerText === "Save" && back.innerText == "Back") {
        back.innerText = "Discard?";
    } else {
        window.location.assign(parentLink);
    }
}

async function Delete() {
    let deleteElement = document.querySelector("#delete");
    if (deleteElement.textContent === "Really?") {
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
        deleteElement.textContent = "Really?";
    }
}