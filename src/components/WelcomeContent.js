import * as React from 'react';

export default class WelcomeContent extends React.Component {
    render() {
        const backgroundStyle = {
            backgroundColor: 'rgb(255,255,255)', // Couleur de fond blanche
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '88vh',
            color: 'rgba(0, 0, 0, 0.7)', // Changer la couleur du texte en noir pour plus de contraste sur le fond clair
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        };

        const jumbotronStyle = {
            backgroundImage: 'url(/images/marsa-port.jpg)', // Image de fond
            padding: '5rem',
            borderRadius: '20px', // Arrondi pour un style plus moderne
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Ajouter une ombre pour donner du relief
            textAlign: 'center', // Centrer le texte
            color: 'rgba(0, 0, 0, 0.7)', // Changer la couleur du texte en blanc pour un bon contraste avec l'image de fond
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Ajouter un fond semi-transparent pour améliorer la lisibilité du texte
        };

        const headerStyle = {
            fontWeight: 'bold', // Rendre le titre plus visible
            fontSize: '2.5rem' // Augmenter la taille de la police pour le titre
        };

        const paragraphStyle = {
            fontSize: '1.2rem', // Augmenter légèrement la taille de la police pour le texte descriptif
            marginBottom: '1rem', // Ajouter un peu d'espace sous chaque paragraphe
            lineHeight: '1.6', // Améliorer la lisibilité avec un interligne plus grand
        };

        return (
            <div style={backgroundStyle}>
                <div className="jumbotron jumbotron-fluid" style={jumbotronStyle}>
                    <div className="container">
                        <h1 className="display-10" style={headerStyle}>Bienvenue sur notre plateforme</h1>
                        <p className="lead" style={paragraphStyle}>
                            Nous vous offrons une interface simple et intuitive pour gérer vos demandes et suivre vos
                            équipements en toute facilité.
                            Connectez-vous pour accéder à toutes les fonctionnalités et passer vos demandes rapidement
                            et efficacement.
                        </p>
                        <p className="lead" style={paragraphStyle}>
                            Pour profiter pleinement de nos services, veuillez vous connecter ci-dessous. Nous sommes là
                            pour vous aider à chaque étape !
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
