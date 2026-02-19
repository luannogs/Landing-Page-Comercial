import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToForm = () => {
        const form = document.querySelector('#contact');
        if (form) form.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.logos}>

                    <img
                        src="http://adeel.com.br/wp-content/uploads/2023/06/adeelnome.png"
                        alt="Adeel Logo"
                        className={styles.logoName}
                    />
                </div>
                <button onClick={scrollToForm} className="btn-primary btn-verde">Contratar Agora</button>
            </div>
        </header>
    );
}
