const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/save-email', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).send("Email is required.");
    }

    const filePath = path.join(__dirname, 'mailing_list.txt');

    // Append email to file
    fs.appendFile(filePath, email + '\n', (err) => {
        if (err) {
            console.error("Error saving email:", err);
            return res.status(500).send("Internal Server Error");
        }
        res.send("Email saved successfully.");
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
