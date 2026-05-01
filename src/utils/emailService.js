// =====================================================================
//  Contact form delivery via Web3Forms — free, unlimited, no backend
// =====================================================================
//
//  ONE-TIME SETUP (~60 seconds, no signup, no payment):
//
//    1. Open https://web3forms.com
//    2. Enter:  astyv.group@gmail.com
//    3. Click  "Create Access Key"
//    4. Web3Forms emails the key to that inbox (verifies you own it)
//    5. Paste the key below where it says PASTE_YOUR_ACCESS_KEY_HERE
//
//  That's it. Submissions arrive at astyv.group@gmail.com.
//
//  Why this is safe to commit to GitHub:
//    The access key is tied to ONE recipient email and can only deliver
//    to that one inbox. It can't be abused to spam other addresses.
//    Web3Forms also has built-in rate limiting + honeypot spam filters.
//
//  If you ever want to swap providers (Formspree, EmailJS, etc.), only
//  this file needs to change — the form component stays the same.
// =====================================================================

const ACCESS_KEY =
    import.meta.env.VITE_WEB3FORMS_KEY || 'a864b9a3-8f7b-4df1-96d1-3376b5152aeb';

const ENDPOINT = 'https://api.web3forms.com/submit';

export async function sendContactForm(formData) {
    if (!ACCESS_KEY || ACCESS_KEY === 'PASTE_YOUR_ACCESS_KEY_HERE') {
        throw new Error(
            'Email service not configured. Get a free Web3Forms key at https://web3forms.com (use astyv.group@gmail.com), then paste it into src/utils/emailService.js as ACCESS_KEY.'
        );
    }

    const payload = {
        access_key: ACCESS_KEY,
        // Reply-to so you can hit Reply in Gmail and respond to the lead.
        from_name: formData.name || 'Astyv website',
        replyto: formData.email,
        subject: `[Contact] ${formData.name || 'Unknown'}${formData.company ? ` @ ${formData.company}` : ''}`,
        // Fields below appear in the email body, in the order listed.
        Name: formData.name,
        Email: formData.email,
        Company: formData.company,
        Phone: formData.phone || 'Not provided',
        Service: formData.service,
        Budget: formData.budget || 'Not specified',
        Message: formData.message,
        // Honeypot field — bots fill it, humans don't, Web3Forms drops it.
        botcheck: '',
    };

    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(payload),
    });

    let data;
    try { data = await res.json(); } catch { data = {}; }

    if (!res.ok || !data.success) {
        throw new Error(
            data.message ||
            `Email send failed (HTTP ${res.status}). Please try again or email astyv.group@gmail.com directly.`
        );
    }
    return data;
}
