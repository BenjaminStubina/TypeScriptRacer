import { useEffect } from 'react';
import './AboutModal.css';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
    useEffect(() => {
        // Close modal on Escape key press
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Handle overlay click (close when clicking outside modal)
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="about-modal-overlay" onClick={handleOverlayClick}>
            <div className="about-modal-content">
                <button className="about-modal-close" onClick={onClose}>
                    ×
                </button>
                <h2>About the Dev</h2>
                <div className="about-modal-body">
                    <p>
                        Hello! My name is Benjamin Stubina and I designed this website for fun! I'm a former materials science engineer turned software developer. Checkout my socials below if you want to connect :)
                    </p>
                    <p>
                        This project is inspired by a <a href="https://github.com/ngkao/hack-typer" target="_blank" rel="noopener noreferrer" className="inline-link">hackathon project</a> created by <a href="https://github.com/SandunKanan" target="_blank" rel="noopener noreferrer" className="inline-link">@SandunKanan</a> and <a href="https://github.com/ngkao" target="_blank" rel="noopener noreferrer" className="inline-link">@ngkao</a>
                    </p>
                    <div className="about-modal-socials">
                        <a href="https://github.com/BenjaminStubina" target="_blank" rel="noopener noreferrer" className="social-link">
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/benjamin-stubina/" target="_blank" rel="noopener noreferrer" className="social-link">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
