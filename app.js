const express = require('express');
const bodyParser = require('body-parser');

// Routes Here
const authRoutes = require('./routes/authRoutes');
const userRoute = require('./routes/userRoute');
const departmentRoute = require('./routes/departmentRoute');
const courseRoute = require('./routes/courseRoute');
const studentRoute = require('./routes/studentRoute');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get('/', function(req, res) {
res.send("Allan Pogi, MIT");
});

// Endpoint Here
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoute);
app.use('/api/department', departmentRoute);
app.use('/api/course', courseRoute);
app.use('/api/student', studentRoute);

const PORT = 6000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});