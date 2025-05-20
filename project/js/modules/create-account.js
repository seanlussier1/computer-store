export function createAccount(event) {
    const alertPlaceholder = document.getElementById('validAlertMessage');
    alertPlaceholder.innerHTML = "";
    let errorCounter = 0;
    console.log('Validating the form...');

    const inputFirstName = document.getElementById("firstName").value.trim();
    const inputLastName = document.getElementById("lastName").value.trim();
    const inputEmail = document.getElementById("email").value.trim();
    const inputPassword = document.getElementById("password").value;
    const inputConfirmPassword = document.getElementById("confirmPassword").value;
    const inputPhoneNumber = document.getElementById("phone").value.trim();

    const inputStreet = document.getElementById("street").value.trim();
    const inputApartment = document.getElementById("apartment").value.trim();
    const inputPostalCode = document.getElementById("postalCode").value.trim();
    const inputCity = document.getElementById("city").value.trim();
    const inputProvince = document.getElementById("province").value.trim();
    const inputCountry = document.getElementById("country").value.trim();

    console.log(inputFirstName);
// RegEx for form validation
    const regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regExPhoneNumber = /^\d{3}-\d{3}-\d{4}$/;
    const regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const regExPostalCode = /[A-Z]\d[A-Z] \d[A-Z]\d/;

    console.log('Email valid:', regExEmail.test(inputEmail));
    console.log('Phone valid:', regExPhoneNumber.test(inputPhoneNumber));
// If statements for various cases, where the use might have a wrong input.
    if (!inputFirstName && !inputLastName && !inputEmail && !inputPassword && !inputConfirmPassword &&
        !inputPhoneNumber && !inputStreet && !inputApartment && !inputPostalCode && !inputCity && !inputProvince
        && !inputCountry) {
        showAlert("Please fill in all fields.", 'danger');
        return;
    }

    if (!inputFirstName || !inputLastName) {
        showAlert("Please make sure both name fields are filled.", 'danger');
        errorCounter++;
    }

    if (!inputEmail || !regExEmail.test(inputEmail)) {
        showAlert("Please enter a valid email address.", 'danger');
        errorCounter++;
    }

    if(!inputPassword || !regExPassword.test(inputPassword)) {
        showAlert("Please enter a valid password.", 'danger');
        errorCounter++;
    }

    if (inputPassword !== inputConfirmPassword) {
        showAlert("Please make sure both passwords are identical.", 'danger');
        errorCounter++;
    }

    if (!inputPhoneNumber || !regExPhoneNumber.test(inputPhoneNumber)) {
        showAlert("Please enter a valid phone number.", 'danger');
        errorCounter++;
    }

    if (!inputStreet) {
        showAlert("Please enter your street.", 'danger');
        errorCounter++;
    }
    
    if (!inputPostalCode || !regExPostalCode.test(inputPostalCode)) {
        showAlert("Please enter your postal code in the correct format ex:(A1A 1A1).", 'danger');
        errorCounter++;
    }

    if (!inputCity) {
        showAlert("Please enter your city.", 'danger');
        errorCounter++;
    }

    if (!inputProvince) {
        showAlert("Please enter your province.", 'danger');
        errorCounter++;
    }

    if (!inputCountry) {
        showAlert("Please enter your country.", 'danger');
        errorCounter++;
    }
   
    if(errorCounter > 0) {
        console.log(errorCounter);
        return;
    }
    const user = {
        firstName: inputFirstName,
        lastName: inputLastName,
        email: inputEmail,
        password: inputPassword,
        phone: inputPhoneNumber,
        street: inputStreet,
        apartment: inputApartment,
        postalCode: inputPostalCode,
        city: inputCity,
        province: inputProvince,
        country: inputCountry,
      };
    localStorage.setItem('user', JSON.stringify(user));

    window.location.assign("sign-in.html");
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