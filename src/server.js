const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Translate } = require('@google-cloud/translate').v2;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

const translate = new Translate({
  key: process.env.GOOGLE_API_KEY
});

app.post('/highlight', async (req, res) => {
  const { text, targetInputLanguage, targetOutputLanguage } = req.body;
  console.log('Received highlighted text:', text);
  console.log('Input language is:', targetInputLanguage);
  console.log('Output language is:', targetOutputLanguage);

  try {
    const [translation] = await translate.translate(text, {
      from: targetInputLanguage,
      to: targetOutputLanguage
    });
    res.status(200).json({ translatedText: translation });
  } catch (error) {
    console.error('Error translating:', error);
    res.status(500).send('Error translating text');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
