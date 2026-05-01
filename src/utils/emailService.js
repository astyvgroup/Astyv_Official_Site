// =====================================================================
// ** EmailJS Configuration — Contact Form
// =====================================================================
// Replace these values with your actual EmailJS service credentials.
// Get them at https://www.emailjs.com after creating your templates.
// =====================================================================

import emailjs from '@emailjs/browser';

const CONTACT_EMAILJS_CONFIG = {
    serviceId: "YOUR_SERVICE_ID",       // Replace with your EmailJS service ID
    templateId: "YOUR_CONTACT_TEMPLATE_ID", // Replace with your contact template ID
    publicKey: "YOUR_PUBLIC_KEY",       // Replace with your EmailJS public key
};

export async function sendContactForm(formData) {
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        phone: formData.phone || "Not provided",
        service: formData.service,
        budget: formData.budget || "Not specified",
        message: formData.message,
    };

    return emailjs.send(
        CONTACT_EMAILJS_CONFIG.serviceId,
        CONTACT_EMAILJS_CONFIG.templateId,
        templateParams,
        CONTACT_EMAILJS_CONFIG.publicKey
    );
}
