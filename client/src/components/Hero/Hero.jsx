import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero} id="hero">
            <div className={`container ${styles.content}`}>
                <span className={styles.badge}>✦ Novidade 2025</span>
                <h1 className={styles.title}>
                    Transforme visitantes em <span>clientes reais</span>
                </h1>
                <p className={styles.subtitle}>
                    Nossa solução conecta seu marketing ao Pipedrive automaticamente,
                    capturando cada lead e nutindo-o até a venda.
                </p>
                <div className={styles.cta}>
                    <a href="#contact" className="btn-primary">Quero começar agora</a>
                    <a href="#features" className={styles.linkSecondary}>Ver benefícios →</a>
                </div>
            </div>
            <div className={styles.glow} aria-hidden="true" />
        </section>
    );
}
