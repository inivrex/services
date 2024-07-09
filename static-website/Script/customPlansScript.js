const scriptURL = 'https://script.google.com/macros/s/AKfycbwK3cBDdpfwLM6Rx0grMiH0zDCElppC2DBCiUbdAa2vx1wH1PBVw5R0NpXXaEkr3Z-mrQ/exec';
const form = document.forms['google-sheet'];
const fields = form.querySelectorAll('.required-field');
const recaptcha = document.querySelector('.g-recaptcha');
const planDetail = document.querySelector('#planDetail');
let selectedPlan = null;
let currentFieldIndex = 0;

// fields[currentFieldIndex].focus();

// Object to store form data
let formData = {
    Name: '',
    Email: '',
    'Date of Birth': '',
    Phone: '',
    'WhatsApp Number': '',
    Reason: '',
    'Number of pages': '',
    'Number of revisions': '',
    Plan: ''
};

form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateSelectedPlan() && validateFieldsOneByOne() && validateRecaptcha()) {
        formData.Name = UsrName.value;
        formData.Email = UsrMail.value;
        formData['Date of Birth'] = usrDOB.value;
        formData.Phone = usrPhone.value;
        formData.Reason = userReason.value;
        formData['WhatsApp Number'] = usrWANum.value;
        formData.Plan = selectedPlan;
        //Show Loading 
        LoadingWin.style.display = 'flex';
        document.body.classList.add('no-scroll');
        planDetail.value = selectedPlan; // Send selected plan detail
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                successfullSubDeta();
                // Show submitted data in the HTML
                showFormData();
            })
            .catch(error => console.error('Error!', error.message));
    }
});

fields.forEach((field, index) => {
    field.addEventListener('blur', () => {
        validateField(field);
    });

    if (field.id === 'usrDOB') {
        // Format Date of Birth field
        field.addEventListener('input', () => {
            formatDOB(field);
        });
    } else if (field.id === 'usrPhone' || field.id === 'usrWANum') {
        // Limit input to numeric and max length validation for phone numbers
        field.addEventListener('input', () => {
            validateNumericInput(field);
        });
    }
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    if (field.classList.contains('sheetValFields')) {
        if (value === '' || !value) {
            field.setCustomValidity("This field cannot be empty.");
            field.style.border = '2px solid red';
            isValid = false;
        } else if (field.id === 'usrDOB' && !isValidDateOfBirth(value)) {
            field.setCustomValidity("Please enter a valid date of birth (dd-mm-yyyy).");
            field.style.border = '2px solid red';
            isValid = false;
        } else if ((field.id === 'usrPhone' || field.id === 'usrWANum') && !isValidPhoneNumber(value)) {
            field.setCustomValidity("Please enter a 10-digit phone number.");
            field.style.border = '2px solid red';
            isValid = false;
        } else if (/[^a-zA-Z0-9@.\/\s-]/.test(value)) {
            field.setCustomValidity("This field contains invalid characters.");
            field.style.border = '2px solid red';
            isValid = false;
        } else {
            field.setCustomValidity("");
            field.style.border = '';
        }
    }

    return isValid;
}

function validateFieldsOneByOne() {
    let allValid = true;

    for (let i = 0; i < fields.length; i++) {
        if (!validateField(fields[i])) {
            fields[i].focus();
            allValid = false;
            break;
        }
    }

    return allValid;
}

function validateRecaptcha() {
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
        showDialogue("Please verify that you are not a robot.");
        return false;
    }
    return true;
}

function validateSelectedPlan() {
    if (!selectedPlan) {
        showDialogue("Please select a plan before submitting the form.");
        return false;
    }
    return true;
}

function formatDOB(field) {
    let value = field.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 8) {
        value = value.slice(0, 8); // Limit to 8 characters
    }

    let formattedValue = '';
    if (value.length > 2) {
        formattedValue += value.substr(0, 2) + '-';
        value = value.substr(2);
    }
    if (value.length > 2) {
        formattedValue += value.substr(0, 2) + '-';
        value = value.substr(2);
    }
    formattedValue += value;

    field.value = formattedValue;
}

function isValidDateOfBirth(value) {
    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    return datePattern.test(value);
}

function isValidPhoneNumber(value) {
    return /^\d{10}$/.test(value);
}

function validateNumericInput(field) {
    let value = field.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 10) {
        value = value.slice(0, 10); // Limit to 10 characters
    }
    field.value = value;
}

// Fetching all the information which is forwarded to google sheet
function sheetDataFetch() {
    let data1 = {
        Name: UsrName.value,
        Email: UsrMail.value,
        'Date of Birth': usrDOB.value,
        Phone: usrPhone.value,
        'WhatsApp Number': usrWANum.value,
        Reason: userReason.value,
        'Number of pages': PagesIn.value,
        'Number of revisions': revisionIn.value
    }
    // let data2 = OrderDetObj;
    // usrorderDetSub[0].textContent += data1.Name;
    // usrorderDetSub[1].textContent += data1.Email;
    // usrorderDetSub[2].textContent += data1["Date of Birth"];
    // usrorderDetSub[3].textContent += data1.Phone;
    // usrorderDetSub[5].textContent += data1.Reason;
    // usrorderDetSub[4].textContent += data1["WhatsApp Number"];
}

// Show form data in HTML after submission
function showFormData() {
    const displayElement = document.querySelector('#WindAfterSub');
    if (displayElement) {
        displayElement.innerHTML = `
            Name: ${formData.Name} <br> 
            Email: ${formData.Email} <br> 
            Date of Birth: ${formData['Date of Birth']} <br> 
            Phone: ${formData.Phone} <br> 
            WhatsApp Number: ${formData['WhatsApp Number']} <br> 
            Plan: ${formData.Plan} <br> 
            Reason: ${formData.Reason} <br> 
        `;

        // Showing Details Parent 
        AFterSub.style.display = "block";

        //Clearing other html code
        formParent.innerHTML = "";
        plansSectionPrnt.innerHTML = "";
        FilThisFormHead.innerHTML = "";
        for (let i = 0; i < hiddenExtra.length; i++) {
            hiddenExtra[i].innerHTML = "";

        }

        // Add buttons for copy to clipboard and open WhatsApp
        displayElement.innerHTML += `<div>
                        <button style="display: flex; justify-content: center; align-items: center;" class="AfterSubBtn" id="copyToClipboardBtn"><img src="https://inivrex.in/Files/copy.png" style="width: 20px; margin-right: 5px;" alt="">Copy</button>
                        <button style="display: flex; justify-content: center; align-items: center;" class="AfterSubBtn" id="openWhatsAppBtn"><img src="https://inivrex.in/Files/WaIcon.png" style="width: 25px; margin-right: 5px;" alt=""> WhatsApp</button>
                    </div>
        `;

        // Event listener for copy to clipboard button
        const copyToClipboardBtn = document.getElementById('copyToClipboardBtn');
        copyToClipboardBtn.addEventListener('click', () => {
            const detailsText = `
                Name: ${formData.Name},\n
                Email: ${formData.Email},\n
                Date of Birth: ${formData['Date of Birth']},\n
                Phone: ${formData.Phone},\n
                WhatsApp Number: ${formData['WhatsApp Number']}\n
                Plan: ${formData.Plan}\n
                Reason: ${formData.Reason}\n
            `;
            navigator.clipboard.writeText(detailsText)
                .then(() => showDialogue('Form details copied to clipboard!'))
                .catch(err => console.error('Could not copy to clipboard:', err));
        });

        // Event listener for open WhatsApp button
        const openWhatsAppBtn = document.getElementById('openWhatsAppBtn');
        openWhatsAppBtn.addEventListener('click', () => {
            const phoneNumber = '8193070049';
            const message = `
                Hi! I'm interested in your services. Here are my details:
                Name: ${formData.Name},
                Email: ${formData.Email},
                Date of Birth: ${formData['Date of Birth']},
                Phone: ${formData.Phone},
                WhatsApp Number: ${formData['WhatsApp Number']},
                Plan: ${formData.Plan}
                Reason: ${formData.Reason}
            `;
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        });
    }
}

// Code to make selection on plans 
document.addEventListener('DOMContentLoaded', function () {
    const planButtons = document.querySelectorAll('.planBtn');
    const insideChcBox = document.querySelectorAll('.insideChcBox');

    planButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Prevent the default action
            e.preventDefault();

            // Remove green background from all checkboxes
            insideChcBox.forEach(checkBox => {
                checkBox.style.backgroundColor = '';
            });

            // Find the selected plan's container
            const selectedDiv = this.parentElement;
            const checkBox = selectedDiv.querySelector('.insideChcBox');

            // Ensure the checkbox is found before attempting to set its style
            if (checkBox) {
                // Set green background color to the selected plan's checkbox
                checkBox.style.backgroundColor = 'rgb(0, 255, 26)';
                // Store the selected plan's header
                const header = selectedDiv.querySelector('h3');
                if (header) {
                    selectedPlan = header.textContent.trim();
                    // console.log("Selected Plan:", selectedPlan);
                } else {
                    showDialogue('Header not found in the selected plan.', 'No', 'Yes');
                }
            } else {
                showDialogue('Checkbox not found in the selected plan.', 'No', 'Yes');
            }
        });
    });
});
