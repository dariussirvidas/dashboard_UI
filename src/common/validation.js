function validateParameters() {
    const body = document.querySelector("body");
    if (body.className == "modal-open") {
        const serviceType = document.querySelector("select[name=\"serviceType\"]").value;
        const parametersTextArea = document.querySelector("textarea[name=\"parameters\"]");
        const parameters = parametersTextArea.value;
        if (serviceType == 0 && !IsValidJSON(parameters)) {
            parametersTextArea.setCustomValidity("Invalid JSON");
        } else if (serviceType == 1 && !IsValidXML(parameters)) {
            parametersTextArea.setCustomValidity("Invalid XML");
        } else {
            parametersTextArea.setCustomValidity("");
        }
    }
}
function IsValidJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function IsValidXML(str) {
    let parser = new DOMParser();
    let xml = parser.parseFromString(str, "application/xml");
    let isValid = xml.querySelector("parsererror") == null ? true : false;
    return isValid;
}

function validateConfirmPassword() {
    const body = document.querySelector("body");
    if (body.className == "modal-open" || window.location.href.includes("signup")) {
        const password = document.querySelector("input[name=\"password\"]");
        const confirmPassword = document.querySelector("input[name=\"confirmPassword\"]");
        if (password.value != confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords don't match");
        } else {
            confirmPassword.setCustomValidity("");
        }
    }
}

export {validateParameters, validateConfirmPassword};