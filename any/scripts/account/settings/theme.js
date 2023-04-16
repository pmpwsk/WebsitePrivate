async function Set(name) {
    let response = await fetch("/api/account/settings/theme?name=" + name);
    if (response.status === 200) {
        window.location.reload();
    }
}