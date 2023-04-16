async function CreateRepo(cat) {
    let name = document.querySelector("#name");
    if (name.value === "") {
        ShowError("Enter a name.");
    } else {
        let response = await fetch("/api/create-repo?cat=" + cat + "&name=" + encodeURIComponent(name.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.assign("/" + cat + "/" + encodeURIComponent(name.value)); break;
                case "exists": ShowError("Another repository with this name already exists in this folder."); break;
                default: ShowError("Connection failed.");
            }
        } else {
            ShowError("Connection failed.");
        }
    }
}