import React from 'react';
import styles from './Features.module.css';

const FEATURES = [
    {
        icon: '⚡',
        title: 'Integração Instantânea',
        description: 'Leads capturados no formulário aparecem automaticamente no Pipedrive em segundos.',
    },
    {
        icon: '🎯',
        title: 'Alta Conversão',
        description: 'Design e copy otimizados para maximizar a taxa de preenchimento do formulário.',
    },
    {
        icon: '🔒',
        title: 'Dados Seguros',
        description: 'Comunicação criptografada entre frontend e backend. Suas informações protegidas.',
    },
    {
        icon: '📊',
        title: 'Relatórios Completos',
        description: 'Acompanhe cada lead no pipeline do Pipedrive com histórico e notificações.',
    },
];

export default function Features() {
    return (
        <section className={styles.features} id="features">
            <div className="container">
                <p className={styles.eyebrow}>Por que escolher nossa solução</p>
                <h2 className={styles.heading}>Benefícios que aceleram suas vendas</h2>
                <div className={styles.grid}>
                    {FEATURES.map((f) => (
                        <div key={f.title} className={styles.card}>
                            <span className={styles.icon}>{f.icon}</span>
                            <h3 className={styles.cardTitle}>{f.title}</h3>
                            <p className={styles.cardText}>{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
