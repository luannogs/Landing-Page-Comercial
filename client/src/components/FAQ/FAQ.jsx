import React, { useState } from 'react';
import styles from './FAQ.module.css';

const QUESTIONS = [
    {
        q: 'O que é a Simplifica Energia e como ela funciona?',
        a: 'A Simplifica Energia facilita o acesso à energia renovável mais barata, sem a necessidade de instalar painéis solares. Injetamos energia limpa na rede elétrica e você recebe o desconto diretamente na sua conta mensal.'
    },
    {
        q: 'Preciso instalar painéis solares para ter o desconto?',
        a: 'Não! Você não precisa de obras ou investimentos em infraestrutura. Nós cuidamos de tudo e garantimos que você receba os créditos de energia renovável diretamente na sua conta de luz.'
    },
    {
        q: 'Como funciona o desconto na conta de energia?',
        a: 'Ao aderir, você passa a receber créditos de energia de fontes renováveis. Esses créditos são aplicados na sua fatura, resultando em uma economia de até 95%, dependendo do seu perfil de consumo.'
    },
    {
        q: 'Quem pode se beneficiar dos serviços?',
        a: 'Qualquer pessoa física ou jurídica que queira economizar na conta de luz sem fazer investimentos. Se sua fatura é em baixa tensão, você já pode começar a economizar.'
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faq}>
            <div className={`container ${styles.centralizar}`}>
                <p className={styles.titulo}>Dúvidas Frequentes</p>
                <div className={styles.list}>
                    {QUESTIONS.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.dica} ${openIndex === index ? styles.aberto : ''}`}
                            onClick={() => toggle(index)}
                        >
                            <p className={styles.question}>{item.q}</p>
                            {openIndex === index && <p className={styles.answer}>{item.a}</p>}
                        </div>
                    ))}
                </div>
                <p className={styles.texto}>Estamos aqui para simplificar sua experiência! Se tiver qualquer dúvida, nossa equipe está à disposição para ajudar.</p>
            </div>
        </section>
    );
}
