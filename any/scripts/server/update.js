async function Update() {
    let file = document.getElementById('update-file').files[0];
    let form = new FormData();
    form.append('file', file);
    let response = await fetch('/server/update', {method: 'POST', body: form});
    if (response.status === 200) window.location.assign("/server");
    else alert("Error!");
}