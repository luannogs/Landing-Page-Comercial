import React from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import Features from './components/Features/Features.jsx';
import FAQ from './components/FAQ/FAQ.jsx';
import LeadForm from './components/LeadForm/LeadForm.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Features />
                <FAQ />
                <LeadForm />
            </main>
            <Footer />
        </>
    );
}

export default App;
