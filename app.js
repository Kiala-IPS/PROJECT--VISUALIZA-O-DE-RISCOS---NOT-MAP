const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
var QRCode = require('qrcode')

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'noti_map_db'
});

conection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database conected');
});


app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/assets', express.static('assets'));
app.use('/images', express.static('images'));
app.use('/vendors', express.static('vendors'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Login'
    })
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard'
    })
});

app.get('/sair', (req, res) => {

    res.redirect('/');

});

app.get('/usuarios', (req, res) => {
    let sql = "SELECT * FROM tb_usuario";
    let query = conection.query(sql, (err, rows) =>{
        if(err) throw err;
        res.render('usuarios', {
            user: rows
        });
    });
});

app.get('/zonas', (req, res) => {
    let sql = "SELECT * FROM tb_zona";
    let query = conection.query(sql, (err, rows) =>{
        if(err) throw err;
        res.render('zonas', {
            zona: rows
        });
    });
});

app.get('/detalhes', (req, res) => {
    let id = params.id;
    let sql = "SELECT * FROM tb_zona Where ";
    let query = conection.query(sql, (err, rows) =>{
        if(err) throw err;
        res.render('detalhes', {
            zona: rows
        });
    });
});

app.get('/cad_zona', (req, res) => {
    res.render('cad_zona', {
        
    })
});

app.get('/cad_user', (req, res) => {
    res.render('cad_user', {
        
    })
});

app.post('/save', (req, res) => {
    let data = {zona: req.body.zona, latitude: req.body.latitude, longitude: req.body.longitude, risco: req.body.risco, obs: req.body.obs};
    let sql = 'INSERT INTO tb_zona SET ?';
    let query = conection.query(sql, data, (err, result) => {
        if(err) throw err;
        res.redirect('/zonas');
    });
});

app.post('/user-save', (req, res) => {
    let data = {nome: req.body.nome, usuario: req.body.usuario, senha: req.body.senha, status: req.body.status};
    let sql = 'INSERT INTO tb_usuario SET ?';
    let query = conection.query(sql, data, (err, result) => {
        if(err) throw err;
        res.redirect('/usuarios');
    });
});

app.post('/auth', function(request, response) {
	// Captura o usuario e a senha
	let usuario = request.body.usuario;
	let senha = request.body.senha;
	
	if (usuario && senha) {
		
		conection.query('SELECT * FROM tb_usuario WHERE usuario = ? AND senha = ?', [usuario, senha], function(error, results, fields) {
			// Se ocorre erro durante a consulta
			if (error) throw error;
			// Se a conta do utilizador existe
			if (results.length > 0) {

				response.redirect('/dashboard');
			} else {
				response.send('Usuario ou senha incorrecta');
			}			
			response.end();
		});
	} else {
		response.send('Informe o usuario e a senha');
		response.end();
	}
});



app.listen(3000, () => {
    console.log('Servidor está correr na porta 3000');
})
