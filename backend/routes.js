const express = require('express');
const router = express.Router();

// YOUR API ROUTES HERE

// SAMPLE ROUTES
router.use('/users', (req, res) => {
    res.json({ success: true });
});

module.exports = router; 
