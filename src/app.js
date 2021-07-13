const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

const uri = config.dbUrl || "mongodb://localhost/test-db";

mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})
.then(() => console.log('MongoDB database connection established successfully'))
.catch((err) => {
	console.error(err);
});

const app = express();
const port = config.port || 80;

app.use(cors());
app.use(express.json());

const { router, topSecretRouter, topSecretSplitRouter } = require('./routes');

app.use('/', router);
app.use('/topsecret', topSecretRouter);
app.use('/topsecret_split', topSecretSplitRouter);

app.listen(port, () => {
	console.log(`Operation Quasar's Fire started on port: ${port}`);
});
