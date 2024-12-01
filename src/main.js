class ModalWindow {
    constructor() {
        this.scrollY = 0;
        this.createModal();
        this.#bindEvent();
    }

    createModal() {
        const modalHTML = ` 
        <div id="modal" class="hidden">
            <div class="modal__content">
                    <div class="modal__head"> 
                    <h2 class="modal__title">SEND US A MESSAGE</h2>
                    <button id="closeModal" class="modal__close-button">×</button>
                    </div>
                <form id="contactForm">
                    <label for="name" class="input__title">Full Name</label>
                    <input type="text" id="name" placeholder="Your Name" class="input">
                    
                    <label for="email" class="input__title">Email</label>
                    <input type="email" id="email" placeholder="Your Email" class="input">
                    
                    <label for="message" class="input__title">Message</label>
                    <textarea id="message" placeholder="Your Message" class="input__textarea"></textarea>
                    
                    <button type="submit"class=" button input__button">Submit</button>
                </form>
            </div>
        </div>`

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    
        this.modal = document.getElementById("modal")
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
        if (event.target === this.button) {
            this.openModal();
        } else if (event.target === this.buttonClose || !this.modalContent.contains(event.target)) {
            this.closeModal();
        }
    }

    #bindEvent() {
        this.button = document.getElementById('openModal');
        this.buttonClose = document.getElementById('closeModal');
        this.modalContent = document.querySelector('.modal-content')

        this.button.addEventListener("click", this);
        this.buttonClose.addEventListener("click", this);
        this.modal.addEventListener("click", this);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ModalWindow();
});