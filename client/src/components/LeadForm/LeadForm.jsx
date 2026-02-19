import React, { useState } from 'react';
import axios from 'axios';
import styles from './LeadForm.module.css';
import adesaoImg from '../../assets/imagem-adesao.png';

const INITIAL = { name: '', email: '', phone: '', personType: 'F' };

export default function LeadForm() {
    const [form, setForm] = useState(INITIAL);
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleChange = (e) => {
        if (e.target.name === 'file') {
            setFile(e.target.files[0]);
        } else {
            setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        formData.append('personType', form.personType);
        if (file) {
            formData.append('file', file);
        }

        try {
            await axios.post('/api/leads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setStatus('success');
            setForm(INITIAL);
            setFile(null);
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    return (
        <section className={styles.adesao} id="contact">
            <div className={`container ${styles.centralizar}`}>
                <div className={styles.imagem}>
                    <img src={adesaoImg} alt="Adesão" />
                </div>

                <div className={styles.formContainer}>
                    <div className={styles.formHeader}>
                        <p><span>Faça sua adesão</span> e comece a economizar com a Simplifica</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input name="name" type="text" placeholder="Nome:"
                            value={form.name} onChange={handleChange} required />

                        <input name="email" type="email" placeholder="E-mail:"
                            value={form.email} onChange={handleChange} required />

                        <input name="phone" type="tel" placeholder="Telefone:"
                            value={form.phone} onChange={handleChange} required />

                        <div className={styles.tipoPessoa}>
                            <label className={styles.customRadio}>
                                <input type="radio" name="personType" value="J"
                                    checked={form.personType === 'J'} onChange={handleChange} />
                                <span className={styles.checkmark}></span>
                                Pessoa Jurídica
                            </label>

                            <label className={styles.customRadio}>
                                <input type="radio" name="personType" value="F"
                                    checked={form.personType === 'F'} onChange={handleChange} />
                                <span className={styles.checkmark}></span>
                                Pessoa Física
                            </label>
                        </div>

                        <div className={styles.fileInputWrapper}>
                            <label htmlFor="file-upload" className={`${styles.fileLabel} ${file ? styles.hasFile : ''}`}>
                                {file ? `Arquivo: ${file.name}` : 'Anexe sua última fatura de energia'}
                            </label>
                            <input
                                id="file-upload"
                                name="file"
                                type="file"
                                className={styles.fileInput}
                                onChange={handleChange}
                                accept="image/*,application/pdf"
                            />
                        </div>

                        <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={status === 'loading'}>
                            {status === 'loading' ? 'Enviando...' : 'Ganhar meu benefício'}
                        </button>

                        <div className={styles.textoLgpd}>
                            Para seu conhecimento e segurança: as informações acima envolvem dados pessoais, os quais serão utilizados exclusivamente para procedimentos preliminares próprios das relações negociais B2C ou B2B, nos termos da LGPD.
                        </div>

                        {status === 'success' && (
                            <p className={styles.msgSuccess}>✅ Solicitação enviada com sucesso!</p>
                        )}
                        {status === 'error' && (
                            <p className={styles.msgError}>❌ Erro ao enviar. Tente novamente.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
