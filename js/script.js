const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#mail')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')
const inputs = document.querySelectorAll('input')
const passwordLength = 8
const usernameLength = 3


const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text')
    formBox.classList.add('error');
    errorMsg.textContent = msg
}

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error')
}


const checkForm = input => {
    if(input.value === '') {
        showError(input, input.placeholder)
    } else {
        clearError(input)
    }
}

const checkLength = (input, min) =>{
    if(input.value.length < min) {
        showError(input, `${input.previousElementSibling.textContent.slice(0, -1)} składa się z min. ${min} znaków.`)
    }
}

const checkPassword = (password, passwordCheck) => {
    if(password.value !== passwordCheck.value){
        showError(passwordCheck, `Hasła się nie zgadzają.`)

    } 
}

const checkMail = email => {
    const re =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/i;
    if(re.test(email.value)) {
        clearError(email)
    } else {
        showError(email, `E-mail jest niepoprawny.`)
    }
}

const checkErrors = () => {
    const parentsOfInputs = document.querySelectorAll('.form-box')
    let errorCount = 0;

    parentsOfInputs.forEach(el => {
        if(el.classList.contains('error')) {
            errorCount++
        }
    })
    if(errorCount === 0) {
        popup.classList.add('show-popup')
    }
    console.log(errorCount);
}


sendBtn.addEventListener('click', e => {
    e.preventDefault()

    inputs.forEach(element => {
        checkForm(element)
    } )

    checkLength(username, usernameLength);
    checkLength(pass, passwordLength);
    checkLength(pass2, passwordLength);
    checkPassword(pass, pass2)
    checkMail(email)
    checkErrors();
})

clearBtn.addEventListener('click', e => {
    e.preventDefault()

    inputs.forEach(element => {
        element.value = ''
        clearError(element)
    })
})