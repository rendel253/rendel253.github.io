class ModalWindow {
    constructor() {
        this.scrollY = 0;
        this.createModal();
        this.validator = new FormValidator();
        this.formHandler = new FormHandler(this.contactForm);
        this.#bindEvent();
    }

    createModal() {
        const modalHTML = ` 
        <div id="modal" class="hidden">
            <div class="modal__content" id="modalContent">
                <div class="modal__head"> 
                    <h2 class="modal__title">SEND US A MESSAGE</h2>
                    <button id="closeModal" class="modal__close-button">×</button>
                </div>
                <form id="contactForm" novalidate>
                    <label for="name" class="input__title">Full Name</label>
                    <input type="text" id="name" placeholder="Your Name" class="input">
                    <div class="hidden" id="messageErrorName"></div>

                    <label for="email" class="input__title">Email</label>
                    <input type="email" id="email" placeholder="Your Email" class="input">
                    <div class="hidden" id="messageErrorEmail"></div>

                    <label for="message" class="input__title">Message</label>
                    <textarea id="message" placeholder="Your Message" class="input__textarea"></textarea>

                    <button type="submit" class="button input__button">Submit</button>
                </form>
            </div>
        </div>
            <div class="popup-overlay hidden" id="popup">
            <div class="popup">
                <h3>Your message successfully sent</h3>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        this.modal = document.getElementById("modal");
        this.modalContent = document.getElementById("modalContent");
        this.buttonClose = document.getElementById('closeModal');
        this.buttonOpen = document.getElementById('openModal');
        this.contactForm = document.getElementById('contactForm');
        this.email = document.getElementById('email');
        this.name = document.getElementById('name');
        this.messageErrorEmail = document.getElementById('messageErrorEmail');
        this.messageErrorName = document.getElementById('messageErrorName');
        this.popup = document.getElementById("popup");
    }

    openModal() {
        this.scrollY = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${this.scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";

        this.modal.classList.remove('hidden');
        this.modal.classList.add('modal');
    }

    closeModal() {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";

        window.scrollTo(0, this.scrollY);

        this.modal.classList.remove('modal');
        this.modal.classList.add('hidden');
    }

    handleEvent(event) {
        if (event.target === this.buttonOpen) {
            this.openModal();
            return;
        }
        if (event.target === this.buttonClose || !this.modalContent.contains(event.target)) {
            this.closeModal();
            return;
        }
        if (event.target === this.popup) {
            this.closePopup();
            return;
        }
    }

    #bindEvent() {
        this.buttonOpen.addEventListener("click", this);
        this.modal.addEventListener("click", this);
        this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
        this.email.addEventListener('input', this.validator.handleInput.bind(this.validator, this.email, this.messageErrorEmail));
        this.name.addEventListener('input', this.validator.handleInput.bind(this.validator, this.name, this.messageErrorName));
        this.popup.addEventListener('click', this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        const isValid = this.validator.validate();

        if (!isValid) {
            return;
        }

        const response = await this.formHandler.sendForm();

        this.showPopup(response.success);
    }

    showPopup(isSucces) {
        if (isSucces) {
            this.popup.classList.remove("hidden")
        }
        
        this.closePopup();
    }

    closePopup() {
        setTimeout(() => {
            this.popup.classList.add("hidden");
        }, 2000);
    }
}

class FormValidator {
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

class FormHandler {
    async sendForm() {
        const response = await fetch('http://94.241.173.93:4225/send-message');
        return await response.json();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ModalWindow();
});