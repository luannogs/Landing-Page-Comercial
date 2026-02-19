import React from 'react';
import styles from './Features.module.css';

const FEATURES = [
    {
        icon: 'assets/beneficios1.svg',
        title: 'Até 25% de Economia',
        description: 'Reduza drasticamente seus custos mensais com energia elétrica de forma imediata.',
    },
    {
        icon: 'assets/beneficios2.svg',
        title: 'Zero Investimento',
        description: 'Aproveite os benefícios da geração distribuída sem precisar investir em painéis solares.',
    },
    {
        icon: 'assets/beneficios3.svg',
        title: 'Parceria de Confiança',
        description: 'A expertise da Adeel unida à inovação da Simplifica Energia para sua total segurança.',
    },
];

export default function Features() {
    return (
        <section className={styles.featuresSection} id="features">
            <div className={styles.envelopeEffect}>
                <div className="container">
                    <div className={styles.benefitsHeader}>
                        <h2 className={styles.heading}><span>Benefícios</span> da parceria Adeel & Simplifica</h2>
                    </div>
                    <div className={styles.grid}>
                        {FEATURES.map((f, index) => (
                            <div key={f.title} className={`${styles.card} ${styles['card' + (index + 1)]}`}>
                                <h3 className={styles.cardTitle}>{f.title}</h3>
                                <p className={styles.cardText}>{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
