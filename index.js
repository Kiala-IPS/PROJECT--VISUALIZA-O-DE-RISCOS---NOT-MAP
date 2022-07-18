const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
var router = express.Router();

app.use(express.json());

const ControllerUser = require('./controller/user_controller');

/// ROTA USUARIO
/////////////////////////////////////////
app.post('/usuario/insert', ControllerUser.insert);
app.put('/usuario/update/:id', ControllerUser.update);
app.get('/usuarios', ControllerUser.selectAll);
app.get('/usuario/:id', ControllerUser.selectById);
app.delete('/usuario/:id', ControllerUser.delete);

//ROTA ZONA
//////////////////////////////////////////////
app.post('/zona/insert', ControllerUser.insert);
app.put('/zona/update/:id', ControllerUser.update);
app.get('/zonas', ControllerUser.selectAll);
app.get('/zona/:id', ControllerUser.selectById);
app.delete('/zona/:id', ControllerUser.delete);


app.listen(port, () => {
    console.log('Servidor iniciando com sucesso!');
});