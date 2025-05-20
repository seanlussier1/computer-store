export function submitForm(event) {
    const alertPlaceholder = document.getElementById('validAlertMessage');
    alertPlaceholder.innerHTML = "";
    let errorCounter = 0;
    console.log('Validating the form...');

    const inputName = document.getElementById("txtFullName").value.trim();
    const inputEmail = document.getElementById("txtEmail").value.trim();
    const inputPhoneNumber = document.getElementById("txtPhoneNumber").value.trim();
    const inquiryMessage = document.getElementById("inquiry-message").value.trim();
    console.log(inputName, inputEmail, inputPhoneNumber, inquiryMessage);
// RegEx for form validation
    const regExEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regExPhoneNumber = /^\d{3}-\d{3}-\d{4}$/;

    console.log('Email valid:', regExEmail.test(inputEmail));
    console.log('Phone valid:', regExPhoneNumber.test(inputPhoneNumber));
// If statements for various cases, where the use might have a wrong input.
    if (!inputName && !inputEmail && !inputPhoneNumber && !inquiryMessage) {
        showAlert("Please fill in all fields.", 'danger');
        return;
    }

    if (!inputName) {
        showAlert("Please enter your name.", 'danger');
        errorCounter++;
    }

    if (!inputEmail || !regExEmail.test(inputEmail)) {
        showAlert("Please enter a valid email address.", 'danger');
        errorCounter++;
    }

    if (!inputPhoneNumber || !regExPhoneNumber.test(inputPhoneNumber)) {
        showAlert("Please enter a valid phone number.", 'danger');
        errorCounter++;
    }

    if (!inquiryMessage) {
        showAlert("Please enter your inquiry message.", 'danger');
        errorCounter++;
    }
    // We use an error counter so that we can have multiple errors display at once
    // It will only reset when the submit button is pressed again.
    // We want it to return and not proceed to submission if there are any errors.
    if(errorCounter > 0) {
        console.log(errorCounter);
        return;
    }
    showAlert("Thank you for submitting, we will get back to you as soon as possible.", 'success');
    document.getElementById("formRegistration").reset(); 
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