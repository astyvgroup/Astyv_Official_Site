// =====================================================================
// ** Admin Authentication — SHA-256 hashing & verification
// =====================================================================
// *** WARNING: This is client-side authentication.
// The password hash is visible in the JS bundle.
// A determined attacker could extract the hash and brute-force it.
// This is acceptable because:
// 1. The admin panel cannot modify the live site
// 2. No sensitive data is exposed
// 3. For production-grade security, use Firebase Auth or similar
// =====================================================================

import adminConfig from '../config/adminConfig';

export async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export async function verifyPassword(inputPassword) {
    const inputHash = await hashPassword(inputPassword);
    return inputHash === adminConfig.passwordHash;
}

export function createSession() {
    sessionStorage.setItem(adminConfig.sessionKey, Date.now().toString());
}

export function isSessionValid() {
    const sessionStart = sessionStorage.getItem(adminConfig.sessionKey);
    if (!sessionStart) return false;
    const elapsed = Date.now() - parseInt(sessionStart, 10);
    return elapsed < adminConfig.sessionDuration;
}

export function clearSession() {
    sessionStorage.removeItem(adminConfig.sessionKey);
}
