import { useState, useEffect } from 'react';
import { AdminLogin, AdminDashboard } from '../components/sections/admin/AdminPanel';
import { isSessionValid, clearSession } from '../utils/adminAuth';

function setRobotsNoindex() {
    if (typeof document === 'undefined') return;
    let el = document.querySelector('meta[name="robots"]');
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'robots');
        document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex, nofollow');
    document.title = 'Admin | Astyv';
}

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setRobotsNoindex();
        setAuthenticated(isSessionValid());
    }, []);

    const handleLogout = () => {
        clearSession();
        setAuthenticated(false);
    };

    if (!authenticated) {
        return <AdminLogin onLogin={() => setAuthenticated(true)} />;
    }

    return <AdminDashboard onLogout={handleLogout} />;
}
