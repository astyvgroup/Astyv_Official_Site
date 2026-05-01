import { useState, useEffect } from 'react';
import { AdminLogin, AdminDashboard } from '../components/sections/admin/AdminPanel';
import { isSessionValid, clearSession } from '../utils/adminAuth';

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
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
