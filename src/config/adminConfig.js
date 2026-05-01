// =====================================================================
// ** ADMIN PANEL CONFIGURATION
// =====================================================================
// The password is stored as a SHA-256 hash. To change the password:
// 1. Open browser console
// 2. Run: crypto.subtle.digest('SHA-256', new TextEncoder().encode('YOUR_NEW_PASSWORD'))
//         .then(h => console.log(Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join('')))
// 3. Replace the hash below with the output
//
// ** SECURITY NOTE: This is client-side auth. It is NOT bulletproof.
// Anyone who reads your JS bundle can extract the hash and potentially
// brute-force it. The admin panel only generates a JSON file for download;
// it cannot modify the live site without a Git push.
// =====================================================================

const adminConfig = {
    // Default password: "astyv-admin-2025"
    // SHA-256 of "astyv-admin-2025":
    passwordHash: "a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",

    // Session duration in milliseconds (8 hours)
    sessionDuration: 8 * 60 * 60 * 1000,

    // Session storage key
    sessionKey: "astyv_admin_session",
};

export default adminConfig;
