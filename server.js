const express = require('express');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.'));

// Configuration email - MODIFIEZ CES INFORMATIONS
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'contact@tessaetdevents.be', // Votre email
        pass: 'votre_mot_de_passe_application' // Mot de passe d'application Gmail
    }
});

app.post('/api/send-quote', async (req, res) => {
    try {
        const { 
            nom, email, telephone, dateEvent, adresse, message, 
            reference, cart, subtotal, tva, total, decorationDescription,
            signatureImage 
        } = req.body;

        // Créer dossier temp
        const tempDir = path.join(__dirname, 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Générer PDF
        const doc = new PDFDocument();
        const pdfPath = path.join(tempDir, `devis-${reference}.pdf`);
        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream);

        // En-tête
        doc.fontSize(20).text('TESSA & D EVENTS', 50, 50);
        doc.fontSize(12).text('Location mobilier & décoration mariage - Belgique', 50, 75);
        doc.fontSize(10).text('Tél: 0492 85 91 27 | Email: contact@tessaetdevents.be', 50, 95);
        doc.moveTo(50, 120).lineTo(550, 120).stroke();

        // Référence
        doc.fontSize(16).text('DEVIS', 50, 140);
        doc.fontSize(10).text(`Réf: ${reference}`, 450, 145);
        doc.fontSize(10).text(`Date: ${new Date().toLocaleDateString('fr-BE')}`, 450, 160);

        // Client
        doc.fontSize(12).text('INFORMATIONS CLIENT', 50, 190);
        doc.fontSize(10).text(`Nom: ${nom}`, 50, 210);
        doc.fontSize(10).text(`Email: ${email}`, 50, 225);
        doc.fontSize(10).text(`Téléphone: ${telephone}`, 50, 240);
        doc.fontSize(10).text(`Date événement: ${dateEvent}`, 50, 255);
        doc.fontSize(10).text(`Adresse: ${adresse}`, 50, 270);

        // Articles
        doc.fontSize(12).text('ARTICLES SÉLECTIONNÉS', 50, 300);
        let y = 320;
        
        cart.forEach(item => {
            doc.fontSize(10).text(`${item.name} (x${item.qty})`, 50, y);
            doc.fontSize(10).text(`${item.total.toFixed(2).replace('.', ',')} €`, 450, y, { align: 'right' });
            y += 15;
        });

        // Décoration
        if (decorationDescription) {
            y += 10;
            doc.fontSize(12).text('SERVICE DÉCORATION', 50, y);
            y += 20;
            doc.fontSize(9).text(decorationDescription, 50, y, { width: 450 });
            y += 40;
        }

        // Totaux
        y += 20;
        doc.moveTo(350, y).lineTo(550, y).stroke();
        y += 10;
        doc.fontSize(10).text(`Sous-total HT: ${subtotal.toFixed(2).replace('.', ',')} €`, 350, y);
        y += 15;
        doc.text(`TVA 21%: ${tva.toFixed(2).replace('.', ',')} €`, 350, y);
        y += 15;
        doc.fontSize(12).text(`TOTAL TTC: ${total.toFixed(2).replace('.', ',')} €`, 350, y);

        // Signature
        if (signatureImage) {
            y += 40;
            doc.fontSize(10).text('Signature client:', 50, y);
            const sigBuffer = Buffer.from(signatureImage.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            doc.image(sigBuffer, 50, y + 20, { width: 200 });
        }

        // Conditions page 2
        doc.addPage();
        doc.fontSize(12).text('CONDITIONS GÉNÉRALES', 50, 50);
        doc.fontSize(9).text(`
1. Réservation: Acompte de 30% requis pour confirmer.
2. Annulation: Gratuite jusqu'à 30 jours avant. 50% (30-15j), 100% (<15j).
3. Livraison: Incluse dans 50km de Liège, 0,50€/km au-delà.
4. Caution: Selon montant, restituée sous 7j.
5. Validité: 30 jours.

Tessa & D Events - 0492 85 91 27`, 50, 70, { width: 500 });

        doc.end();

        await new Promise((resolve, reject) => {
            stream.on('finish', resolve);
            stream.on('error', reject);
        });

        // Envoi email client
        await transporter.sendMail({
            from: '"Tessa & D Events" <contact@tessaetdevents.be>',
            to: email,
            bcc: 'contact@tessaetdevents.be',
            subject: `Votre devis ${reference} - Tessa & D Events`,
            html: `
                <h2>Bonjour ${nom},</h2>
                <p>Merci pour votre demande. Votre devis est en pièce jointe.</p>
                <p><strong>Référence:</strong> ${reference}<br>
                <strong>Total:</strong> ${total.toFixed(2).replace('.', ',')} €</p>
                <p>Nous vous recontacterons au ${telephone} sous 24h.</p>
                <p>À bientôt,<br>Tessa & D Events</p>
            `,
            attachments: [{ filename: `devis-${reference}.pdf`, path: pdfPath }]
        });

        // Nettoyer
        fs.unlinkSync(pdfPath);
        
        res.json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
