import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.inner}`}>
                <span className={styles.logo}>Marca</span>
                <nav className={styles.nav}>
                    <a href="#features">Benefícios</a>
                    <a href="#contact">Contato</a>
                </nav>
                <a href="#contact" className="btn-primary">Fale Conosco</a>
            </div>
        </header>
    );
}
