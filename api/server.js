const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.route');
const trabajosRouter = require('./routes/trabajos.route');
const loginRouter = require('./routes/login.route');

const app = express();
app.use(cors());
app.use(express.json());

connectDB().then(() => {
    // Definir rutas y endpoints
    app.use('/api/users', userRoutes);
    app.use('/api/trabajos', trabajosRouter);
    app.use('/api/login', loginRouter);


    // Iniciar el servidor
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to database: ', err);
});







