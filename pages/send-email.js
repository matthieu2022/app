// pages/api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Vérification de la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const { email, results } = req.body;

    // Validation des données reçues
    if (!email || !results) {
      return res.status(400).json({ message: 'Données manquantes' });
    }

    // Configuration du transporteur d'email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // ou un autre service de votre choix
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Création du contenu de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Vos résultats d\'évaluation de compétences',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .results-container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .result-section { 
                background-color: #f8f9fa;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
              }
              h2 { color: #2563eb; }
              h3 { color: #1e40af; margin-top: 0; }
            </style>
          </head>
          <body>
            <div class="results-container">
              <h2>Résultats de votre évaluation</h2>
              <div class="result-section">
                <h3>Profil Soft Skills</h3>
                <p>${results.softSkills}</p>
              </div>
              <div class="result-section">
                <h3>Profil Compétences</h3>
                <p>${results.specificSkills}</p>
              </div>
              <p style="font-size: 0.9em; color: #666;">
                Cet email a été généré automatiquement. Merci de ne pas y répondre.
              </p>
            </div>
          </body>
        </html>
      `
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    // Réponse en cas de succès
    res.status(200).json({ 
      success: true,
      message: 'Email envoyé avec succès' 
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);

    // Réponse en cas d'erreur
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de l\'envoi de l\'email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}