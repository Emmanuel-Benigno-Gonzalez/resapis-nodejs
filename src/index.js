import express from "express";
import usersRoutes from './routes/users.routes.js';

const app = express();

app.use(express.json());

app.use('/api', usersRoutes);

const port = 3000;
app.listen(port, () =>{
    console.log(`El Servidor esta funcionando por el puerto ${port}`);
});