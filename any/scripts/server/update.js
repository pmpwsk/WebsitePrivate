async function UpdateOld() {
    let file = document.getElementById('update-file').files[0];
    let form = new FormData();
    form.append('file', file);
    let response = await fetch('/server/update', { method: 'POST', body: form });
    if (response.status === 200) window.location.assign("/server");
    else alert("Error!");
}

async function Update() {
    let file = document.getElementById('update-file').files[0];
    let form = new FormData();
    form.append('file', file);
    let response = await fetch('/server/update', {method: 'POST', body: form});
    if (response.status === 200) window.location.assign("/server");
    else alert("Error!");

    let request = new XMLHttpRequest();
    request.open('POST', '/server/update');
    request.upload.addEventListener('progress', event => {
        console.log('Uploading... ' + '(' + ((event.loaded / event.total) * 100).toFixed(2) + '%)');
    });
    request.onreadystatechange = () => {
        if (request.readyState == 4) {
            if (request.status === 200) {
                window.location.assign("/server");
            } else {
                alert("Error!");
            }
        }
    };
    request.send(uploadFormDate);
}