import React from 'react';
import styles from './Hero.module.css';
import bannerImg from '../../assets/imagem-topo.png';

export default function Hero() {
    return (
        <section className={styles.hero} id="hero">
            <div className={`container ${styles.content}`}>
                <div className={styles.text}>
                    <p className={styles.topText}>Economia Inteligente:</p>
                    <h1 className={styles.title}>
                        Geração Distribuída e <span>Redução na Conta de Energia</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Soluções em parceria com a <strong>Simplifica Energia</strong> para você reduzir sua fatura em até 25% com energia limpa e renovável.
                    </p>
                    <div className={styles.cta}>
                        <a href="#contact" className="btn-primary btn-verde">Quero economizar agora</a>
                    </div>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={bannerImg} alt="Economia de Energia" className={styles.bannerImg} />
                </div>
            </div>
        </section>
    );
}
