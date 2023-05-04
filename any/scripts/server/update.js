async function Update() {
    let file = document.getElementById('update-file').files[0];
    let form = new FormData();
    form.append('file', file);

    let request = new XMLHttpRequest();
    request.open('POST', '/server/update');
    request.upload.addEventListener('progress', event => {
        document.querySelector('#updateButton').firstElementChild.innerText = 'Updating... ' + ((event.loaded / event.total) * 100).toFixed(2) + '%';
        console.log();
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
    request.send(form);
}