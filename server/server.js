const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task.router');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.use('/tasks', taskRouter);

app.listen(PORT, () => {
   console.log('Server listening on port', PORT);
});
