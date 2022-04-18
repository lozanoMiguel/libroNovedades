var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
require('dotenv').config({path:'./.env'});
//variables de entorno
const puerto = process.env.PUERTO;

var app = express();
app.use(express.json());
app.use(cors());

//establecemos y probamos puerto
app.listen(4000, function(){
	console.log("Servidor OK en puerto: " + puerto);
});

//establecemos conexion
var conexion = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	port:'3306',
	database:'novedades_db',
	timezone : '+00:00'
});

//probamos la conexion
conexion.connect(function(error){
	if(error){
		throw error;
	}
	else{
		console.log("¡Conexion exitosa a la base de datos!");
	}
});

//accediendo a la raiz desde el ordenador podemos indicar que nos pinte en el front.
app.get('/', (req,res)=>{
	conexion.query('select * from novedades order by id_novedad desc', (error,filas)=>{
		if(error)
			throw error;
		else
			res.send(filas)	
	});
});	

app.get('/api/claveadmin', (req,res)=>{
	conexion.query('SELECT clave FROM claveadmin', (error,fila)=>{
		if(error)
			throw error;
		else
			res.send(fila);
	})
})

//mostrar todos los comentarios
app.get('/api/novedades', (req, res) =>{
	conexion.query('SELECT * FROM novedades', (error, filas)=>{
		if(error){
			throw error;
		}
		else{
			res.send(filas);
		}
	});
});

//mostrar todas las respuestas
/*app.get('/api/respuestas', (req, res) =>{
	conexion.query('SELECT * FROM respuestas', (error, filas)=>{
		if(error){
			throw error;
		}
		else{
			res.send(filas);
		}
	});
});*/

//obtener un SOLO comentario por ID
app.get('/api/novedades/:id', (req, res) =>{
	conexion.query('SELECT * FROM novedades WHERE id_novedad = ?',[req.params.id],(error, fila)=>{
		if(error){
			throw error;
		}
		else{
			res.send(fila);
		}
	});
});

app.get('/api/respuestas/:id', (req, res) =>{
	conexion.query('SELECT * FROM novedades WHERE id_respuesta = ?',[req.params.id],(error, fila)=>{
		if(error){
			throw error;
		}
		else{
			res.send(fila);
		}
	});
});


//crear la novedad y el comentario
app.post('/api/novedades', (req,res)=>{
	let data = {com_usuario:req.body.com_usuario, com_datetime:req.body.com_datetime, comentario:req.body.comentario};
	let sql = "INSERT INTO novedades SET ?";
	conexion.query(sql, data, function(error, results){
		if(error){
			throw error;
		}
		else{
			res.send(results);
		}
	});
});


//agregar respuesta
app.put('/api/novedades/:id', (req,res)=>{
	let id = req.params.id;
	let res_usuario = req.body.res_usuario;
	let res_datetime = req.body.res_datetime;
	let respuesta = req.body.respuesta;
	let comentario = req.body.comentario;
	let sql = req.body.sql;
	let opcion = req.body.opcion;
	if(opcion == "1"){
		conexion.query(sql, [res_datetime, res_usuario, respuesta, id], function(error, results){
			if(error)
				throw error;
			else
				res.send(results);
		});
	}
	else if(opcion == "2"){
		conexion.query(sql, [comentario, respuesta, id], function(error, results){
			if(error)
				throw error;
			else
				res.send(results);
		});
	}
		
});

//eliminar comentario
app.delete('/api/novedades/:id',(req,res)=>{
	conexion.query("DELETE FROM novedades WHERE id_novedad = ?", [req.params.id], function(error, fila){
		if(error)
			throw error
		else
			res.send(fila)
	});
});

/*editar la novedad y agregar respuesta
app.put('/api/novedades/:id', (req,res)=>{
	let id = req.params.id;
	let com_usuario = req.body.com_usuario;
	let com_datetime = req.body.com_datetime;
	let comentario = req.body.comentario;
	let res_usuario = req.body.res_usuario;
	let res_datetime = req.body.res_datetime;
	let respuesta = req.body.respuesta;
	let sql = "UPDATE novedades SET com_usuario = ?, com_datetime = ?, comentario = ?, res_usuario = ?, res_datetime = ?, respuesta = ? WHERE id = ?";
	conexion.query(sql, [com_usuario, com_datetime, comentario, res_usuario, res_datetime, respuesta], function(error, results){
		if(error)
			throw error;
		else
			res.send(results);
	});
});*/


