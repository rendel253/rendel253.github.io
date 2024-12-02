export class FormHandler {
    async sendForm() {
        const response = await fetch('http://94.241.173.93:4225/send-message');
        return await response.json();
    }
}