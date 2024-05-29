const axios = require('axios');

const chatbot = async (req, res) => {
    try {
        const inputText = req.body.inputText;
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyARiJCDsCm5e0jDJmXN4Augke2SS96lrEU',
            {
                contents: [{ parts: [{ text: inputText }] }]
            }
        );

        // Check if response contains valid data
        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            const aiResponse = response.data.candidates[0].content.parts[0].text;
            res.json({ aiResponse });
        } else {
            throw new Error('Invalid response from AI service');
        }
    } catch (error) {
        console.error('Error generating answer:', error);
        res.status(500).json({ error: 'Error generating answer. Please try again later.' });
    }
};

module.exports = { chatbot };
