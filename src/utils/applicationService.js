// =====================================================================
// ** EmailJS Configuration — Application Form (with PDF attachment)
// =====================================================================
// EmailJS free tier supports attachments up to 50KB.
// For larger PDFs, upgrade to a paid plan or use a different backend.
// =====================================================================

import emailjs from '@emailjs/browser';

const APPLICATION_EMAILJS_CONFIG = {
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_APPLICATION_TEMPLATE_ID",
    confirmationTemplateId: "YOUR_CONFIRMATION_TEMPLATE_ID",
    publicKey: "YOUR_PUBLIC_KEY",
};

export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export async function sendApplication(formData, resumeFile) {
    const base64Resume = await fileToBase64(resumeFile);

    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || "Not provided",
        role: formData.role || "General Application",
        linkedin: formData.linkedin || "Not provided",
        cover_note: formData.coverNote || "Not provided",
        resume_name: resumeFile.name,
        resume_base64: base64Resume,
    };

    // Send application to hr@astyv.com
    await emailjs.send(
        APPLICATION_EMAILJS_CONFIG.serviceId,
        APPLICATION_EMAILJS_CONFIG.templateId,
        templateParams,
        APPLICATION_EMAILJS_CONFIG.publicKey
    );

    // Send confirmation email to applicant
    const confirmationParams = {
        to_email: formData.email,
        from_name: formData.name,
        role: formData.role || "General Application",
    };

    await emailjs.send(
        APPLICATION_EMAILJS_CONFIG.serviceId,
        APPLICATION_EMAILJS_CONFIG.confirmationTemplateId,
        confirmationParams,
        APPLICATION_EMAILJS_CONFIG.publicKey
    );
}
