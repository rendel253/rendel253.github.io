export class FormValidator {
    constructor() {
        this.validate = this.validate.bind(this);
    }

    checkIsEmpty(input) {
        return input.value.trim().length === 0;
    }

    handleInput(input, messageError) {
        messageError.classList.remove("hidden")
        input.classList.remove("input-error");
        messageError.textContent = "";
    }

    checkEmailPattern(email) { 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailPattern.test(email.value)
    }

    validateEmailAndApplyError(email, messageErrorEmail) {
        if (this.checkIsEmpty(email)) {
            messageErrorEmail.classList.remove("hidden")
            messageErrorEmail.textContent = "Поле обязательно для заполнения";
            messageErrorEmail.classList.add("message-error");
            email.classList.add("input-error");
            return false;
        }

        if (!this.checkEmailPattern(email)) {
            messageErrorEmail.classList.remove("hidden")
            email.classList.add("input-error");
            messageErrorEmail.textContent = 'Введите действительный адрес электронной почты';
            messageErrorEmail.classList.add("message-error");
            console.log(email.value)
            return false;
        }

        return true;
    }

    validateNameAndApplyError(name, messageErrorName) {
        if (this.checkIsEmpty(name)) {
            messageErrorName.classList.remove("hidden")
            messageErrorName.textContent = "Поле обязательно для заполнения";
            messageErrorName.classList.add("message-error");
            name.classList.add("input-error");
            return false;
        }

        return true;
    }

    validate() {
        const emailValid = this.validateEmailAndApplyError(document.getElementById('email'), document.getElementById('messageErrorEmail'));
        const nameValid = this.validateNameAndApplyError(document.getElementById('name'), document.getElementById('messageErrorName'));

        return emailValid && nameValid;
    }
}