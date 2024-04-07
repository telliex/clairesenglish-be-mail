const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

let serviceAccount = require('./interview-claires-firebase-adminsdk-tuqk0-a2af076f10.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


let db = admin.firestore();
let emailCredentials = { user: '', pass: '' };

async function loadEmailCredentials() {
    const snapshot = await db.collection('mail-info').doc('xiZt6o7KExXBNX4I2imL').get();
    if (snapshot.exists) {
        emailCredentials.user = snapshot.data().user;
        emailCredentials.pass = snapshot.data().pass;
        console.log(emailCredentials);
    } else {
        console.log('No document found');
    }
}

loadEmailCredentials().then(() => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middleware
    app.use(express.json());
    app.use(cors());

    // Email endpoint
    app.post('/emails', async (req, res) => {
        
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: emailCredentials.user,
                pass: emailCredentials.pass
            }
        });

        const { to, subject, body } = req.body;
        const mailOptions = {
            from: emailCredentials.user, // 使用从Firebase加载的用户
            to,
            subject,
            text: body
        };
        console.log("mailOptions:", mailOptions);
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(info.response);
            res.status(200).json({ message: 'Email sent: ' + info.response });
        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to send email!!.');
        }
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});