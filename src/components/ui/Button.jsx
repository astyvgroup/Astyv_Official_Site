import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Button({ to, href, onClick, children, variant = 'primary', size = 'md', className = '', icon, ...props }) {
    const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300';

    const variants = {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5',
        secondary: 'border border-white/20 text-white hover:border-primary-500/50 hover:text-primary-400 hover:bg-primary-500/5',
        ghost: 'text-zinc-400 hover:text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
    };

    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    const inner = (
        <>
            {children}
            {icon && <span className="ml-1">{icon}</span>}
        </>
    );

    if (to) {
        return <Link to={to} className={cls} {...props}>{inner}</Link>;
    }
    if (href) {
        return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...props}>{inner}</a>;
    }
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cls}
            {...props}
        >
            {inner}
        </motion.button>
    );
}
