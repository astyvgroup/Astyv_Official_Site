// =====================================================================
//  Careers application form delivery via Web3Forms
// =====================================================================
//
//  Both contact and careers forms now use Web3Forms with the SAME
//  access key — they both deliver to astyv.group@gmail.com. The
//  subject prefixes ("[Careers]" vs "[Contact]") let you filter/search
//  in Gmail to tell them apart instantly.
//
//  No file attachments — Web3Forms gates that behind a paid plan.
//  After receiving an application, reply to the applicant (replyto is
//  set, so hitting Reply in Gmail goes straight to them) and ask for
//  their resume as an email attachment.
// =====================================================================

const ACCESS_KEY =
    import.meta.env.VITE_WEB3FORMS_KEY || 'a864b9a3-8f7b-4df1-96d1-3376b5152aeb';

const ENDPOINT = 'https://api.web3forms.com/submit';

export async function sendApplication(formData /* , resumeFile (unused) */) {
    if (!ACCESS_KEY || ACCESS_KEY.startsWith('PASTE_')) {
        throw new Error(
            'Email service not configured. Get a free Web3Forms key at https://web3forms.com and paste it as ACCESS_KEY.'
        );
    }

    const who = formData.name || 'Unknown applicant';
    const role = formData.role || 'General application';

    const payload = {
        access_key: ACCESS_KEY,
        from_name: who,
        replyto: formData.email,
        // Name first so the inbox preview surfaces the candidate immediately,
        // and the [Careers] prefix groups all applications together.
        subject: `[Careers] ${who} — ${role}`,
        Name: who,
        Email: formData.email,
        Phone: formData.phone || 'Not provided',
        Role: role,
        LinkedIn: formData.linkedin || 'Not provided',
        'Cover Note': formData.coverNote || 'Not provided',
        botcheck: '',
    };

    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
    });

    let data;
    try { data = await res.json(); } catch { data = {}; }

    if (!res.ok || !data.success) {
        throw new Error(
            data.message ||
            `Application send failed (HTTP ${res.status}). Please email astyv.group@gmail.com directly.`
        );
    }
    return data;
}
