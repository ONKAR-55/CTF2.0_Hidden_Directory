const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 1. Serve the "Normal" website from the 'public' folder
// This makes index.html, about.html, etc., accessible at the root (/)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/dev_backup', (req, res) => {
    res.sendFile(path.join(__dirname, 'secret_stuff', 'index.html'));
});

// Route to provide the flag (corrected to avoid conflict with /dev_backup)
app.get('/dev_backup/get_flag', (req, res) => {
    const flag = "CSBC{Hidden_Secreat_Found!}";
    res.send(flag);
});

// Route to serve specific files within the hidden directory if they are requested by name
app.get('/dev_backup/:file', (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, 'secret_stuff', fileName);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File Not Found');
        }
    });
});

app.listen(PORT, () => {
    console.log(`🚀 CTF Server running at http://localhost:${PORT}`);
    console.log(`Target: Find the hidden directory and the flag!`);
});