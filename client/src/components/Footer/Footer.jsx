import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.logos}>
                    <img
                        src="http://adeel.com.br/wp-content/uploads/2023/06/adeelnome.png"
                        alt="Adeel Logo"
                        className={styles.logoName}
                    />
                </div>
                <p className={styles.copy}>
                    © {new Date().getFullYear()} Adeel & Simplifica Energia. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
