import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <span className={styles.logo}>Marca</span>
                <p className={styles.copy}>© {new Date().getFullYear()} Sua Empresa. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
