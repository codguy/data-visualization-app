const express = require('express');
const path = require('path');
const multer = require('multer');
const dataRoutes = require('./routes/dataRoutes');
const DataController = require('./controllers/dataController');
const expressLayouts = require('express-ejs-layouts');


const app = express();
const port = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


// Add this route


const upload = multer({ dest: 'uploads/' });

app.get('/files', DataController.listFiles);

app.get('/data/process/:filename', DataController.processData);

app.use('/data', upload.single('file'), dataRoutes);

app.get('/', DataController.getIndex);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
