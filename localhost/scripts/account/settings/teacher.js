let abbreviation = document.querySelector("#abbreviation");
let nameE = document.querySelector("#name");
let contractEnd = document.querySelector("#contractEnd");
let iban = document.querySelector("#iban");
let note = document.querySelector("#note");
let phone = document.querySelector("#phone");

async function SetAbbreviation() {
    if (abbreviation.value === "") {
        ShowError("Geben Sie ein Kürzel ein.");
    } else {
        let response = await fetch("/api/account/settings/teacher/abbreviation?abbreviation=" + encodeURIComponent(abbreviation.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.reload(); break;
                case "same": ShowError("Dieses Kürzel entspricht dem alten Kürzel."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}

async function SetName() {
    if (nameE.value === "") {
        ShowError("Geben Sie einen Namen ein.");
    } else {
        let response = await fetch("/api/account/settings/teacher/name?name=" + encodeURIComponent(nameE.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.reload(); break;
                case "same": ShowError("Dieser Name entspricht dem alten Namen."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}

async function SetPhone() {
    if (phone.value === "") {
        ShowError("Geben Sie Ihre Telefonnummer ein.");
    } else {
        let response = await fetch("/api/account/settings/teacher/phone?phone=" + encodeURIComponent(phone.value));
        if (response.status === 200) {
            let text = await response.text();
            switch (text) {
                case "ok": window.location.reload(); break;
                case "same": ShowError("Diese Telefonnummer entspricht der alten Nummer."); break;
                default: ShowError("Verbindungsfehler.");
            }
        } else {
            ShowError("Verbindungsfehler.");
        }
    }
}

async function SetContractEnd() {
    var date = contractEnd.value;
    if (date === "") {
        date = "null";
    }
    let response = await fetch("/api/account/settings/teacher/contract-end?date=" + encodeURIComponent(date));
    if (response.status === 200) {
        let text = await response.text();
        switch (text) {
            case "ok": window.location.reload(); break;
            case "bad": ShowError("Ungültiges Datum."); break;
            case "same": ShowError("Dieses Datum entspricht dem alten Datum."); break;
            default: ShowError("Verbindungsfehler.");
        }
    } else {
        ShowError("Verbindungsfehler.");
    }
}

async function SetIBAN() {
    var ib = iban.value;
    if (ib === "") {
        ib = "null";
    }
    let response = await fetch("/api/account/settings/teacher/iban?iban=" + encodeURIComponent(ib));
    if (response.status === 200) {
        let text = await response.text();
        switch (text) {
            case "ok": window.location.reload(); break;
            case "same": ShowError("Diese IBAN entspricht der alten IBAN."); break;
            default: ShowError("Verbindungsfehler.");
        }
    } else {
        ShowError("Verbindungsfehler.");
    }
}

async function SetNote() {
    var no = note.value;
    if (no === "") {
        no = "null";
    }
    let response = await fetch("/api/account/settings/teacher/note?note=" + encodeURIComponent(no));
    if (response.status === 200) {
        let text = await response.text();
        switch (text) {
            case "ok": window.location.reload(); break;
            case "same": ShowError("Diese Notiz entspricht der alten Notiz."); break;
            default: ShowError("Verbindungsfehler.");
        }
    } else {
        ShowError("Verbindungsfehler.");
    }
}