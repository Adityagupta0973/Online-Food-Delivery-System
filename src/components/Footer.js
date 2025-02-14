import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="FooterContent">
                <div className="FooterText">
                    <h2>Contact Us</h2>
                    <p>For queries or feedback, feel free to reach out to us!</p>
                </div>
                <div className="FooterLinks">
                    <a href="mailto:support@fromourkitchen.com" className="FooterLink">Email: support@fromourkitchen.com</a>
                    <a href="tel:+919622536367" className="FooterLink">Phone: +91 962 253 6367</a>
                </div>
            </div>
            <div className="FooterBottom">
                <p>&copy; 2025 From Our Kitchen. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
