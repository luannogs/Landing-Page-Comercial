import React, { useState } from 'react';
import axios from 'axios';
import styles from './LeadForm.module.css';

const INITIAL = { name: '', email: '', phone: '', company: '', message: '' };

export default function LeadForm() {
    const [form, setForm] = useState(INITIAL);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await axios.post('/api/leads', form);
            setStatus('success');
            setForm(INITIAL);
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className={styles.section} id="contact">
            <div className="container">
                <p className={styles.eyebrow}>Entre em contato</p>
                <h2 className={styles.heading}>Pronto para começar?</h2>
                <p className={styles.sub}>Preencha o formulário e nossa equipe entrará em contato em até 24h.</p>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="name">Nome *</label>
                            <input id="name" name="name" type="text" placeholder="Seu nome completo"
                                value={form.name} onChange={handleChange} required />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="email">E-mail *</label>
                            <input id="email" name="email" type="email" placeholder="voce@empresa.com"
                                value={form.email} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="phone">Telefone</label>
                            <input id="phone" name="phone" type="tel" placeholder="(11) 99999-9999"
                                value={form.phone} onChange={handleChange} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="company">Empresa</label>
                            <input id="company" name="company" type="text" placeholder="Nome da empresa"
                                value={form.company} onChange={handleChange} />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="message">Mensagem</label>
                        <textarea id="message" name="message" rows={4} placeholder="Descreva brevemente o que você precisa..."
                            value={form.message} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn-primary" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Enviando…' : 'Enviar mensagem'}
                    </button>

                    {status === 'success' && (
                        <p className={styles.msgSuccess}>✅ Mensagem enviada! Entraremos em contato em breve.</p>
                    )}
                    {status === 'error' && (
                        <p className={styles.msgError}>❌ Erro ao enviar. Tente novamente ou entre em contato diretamente.</p>
                    )}
                </form>
            </div>
        </section>
    );
}
