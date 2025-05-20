export function signIn() {
    const alertPlaceholder = document.getElementById('validAlertMessage');
    alertPlaceholder.innerHTML = "";
    const user = JSON.parse(localStorage.getItem("user"));
    const inputEmail = document.getElementById("email").value.trim();
    const inputPassword = document.getElementById("password").value;
    let errorCounter = 0;

    console.log(user);

    if(inputEmail !== user.email) {
        showAlert("Please enter the correct email address.", 'danger');
        errorCounter++;
    }

    if(inputPassword !== user.password) {
        showAlert("Please enter the correct password", 'danger');
        errorCounter++;
    }

     if(errorCounter > 0) {
        console.log(errorCounter);
        return;
    }

    window.location.assign("index.html");

    // A method to create an alert rather then manually doing it every time.
    function showAlert(message, type) {
        const alertPlaceholder = document.getElementById('validAlertMessage');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('');
        alertPlaceholder.append(wrapper);
    }
}