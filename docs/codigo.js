const url = 'http://192.168.0.64:4000';
const btnEnviar = document.getElementById("enviarEntrada");
const btnCancelar = document.getElementById("cancelarEntrada");
const containerEntradas = document.querySelector(".containerEntradas");
const btnPrivilegio = document.getElementById("privilegio");

//bloque encargado de la carga del frontend de la pagina al arrancar

const verificaRespuesta = (comentario) =>{
	let flag;
	if(comentario.respuesta === undefined || comentario.res_usuario == ""){
		flag = false;

	}
	else{
		flag = true
	}
	return flag;
}

const corrigeHora = (hora) =>{
	let horaNueva, aux, aux1, aux2;	
	aux = hora.split("T");
	aux1 = aux[0].split("-");
	aux2 = aux[1].split(":", 2);
	horaNueva = `${aux1[2]}/${aux1[1]}/${aux1[0]}  ${aux2[0]}:${aux2[1]}`;
	return horaNueva;
}

const mostrar = (novedades) =>{
	let flag, comentario, respuesta;
	let fragment = new DocumentFragment();
	novedades.forEach(novedad =>{
		flag = verificaRespuesta(novedad);
		novedad.com_datetime = corrigeHora(novedad.com_datetime);
		comentario = armadoComentario(novedad);
		if(flag){
			let btn, container; //elementos a eliminar
			novedad.res_datetime = corrigeHora(novedad.res_datetime);
			respuesta = armadoRespuesta(novedad);
			btn = comentario.children[3];
			container = comentario.children[4];
			btn.remove();
			container.remove();
			comentario.appendChild(respuesta);
		}
		fragment.appendChild(comentario)
	})
	containerEntradas.appendChild(fragment);
};

fetch(url)
	  .then(response => response.json())
	  .then(data => mostrar(data))

//bloque encargado de los privilegios del admin

const getAdminId = async ()=>{
	let peticion = await fetch(url+"/api/claveadmin");
	let resultado = await peticion.json();
	habilitaPrivilegios(resultado[0].clave);
}

const habilitaPrivilegios = (clave) =>{
	let flag = prompt("Ingrese su clave");
	if(flag == clave){
		let listEdit = document.getElementsByName("editarComentario");
		let listDelete = document.getElementsByName("eliminarComentario");
		for(btn of listEdit){
			btn.style.display = "block";
		}
		for(btn of listDelete){
			btn.style.display = "block";
		}
	}
}

btnPrivilegio.addEventListener("click", getAdminId);


//armado del bloque para poder responder
const bloqueRespuesta = () =>{
		let fragment = new DocumentFragment();
		let btnResponder = document.createElement("BUTTON");
		let containerRespuesta = document.createElement("DIV");
		let nombreRespuesta = document.createElement("INPUT");
		let respuesta = document.createElement("INPUT");
		let botonera = document.createElement("DIV");
		let btnEnviarRpta = document.createElement("BUTTON");
		let btnCancelarRpta = document.createElement("BUTTON");

		btnResponder.classList.add("btnRespuesta");
		btnResponder.innerHTML = ("RESPONDER");
		containerRespuesta.classList.add("containerRespuesta");
		containerRespuesta.style.display = "none";
		nombreRespuesta.type = "text";
		nombreRespuesta.classList.add("nombreRespuesta");
		nombreRespuesta.placeholder = "Nombre";
		respuesta.type = "text";
		respuesta.classList.add("respuesta");
		respuesta.placeholder = "Añade tu respuesta";
		botonera.classList.add("botonera");
		btnEnviarRpta.setAttribute("name", "enviarRespuesta");
		btnEnviarRpta.innerHTML = ("Enviar");
		btnCancelarRpta.setAttribute("name", "cancelarRespuesta");
		btnCancelarRpta.innerHTML = ("Cancelar");

			
		fragment.appendChild(btnResponder);
		containerRespuesta.appendChild(nombreRespuesta);
		containerRespuesta.appendChild(respuesta);
		botonera.appendChild(btnEnviarRpta);
		botonera.appendChild(btnCancelarRpta);
		containerRespuesta.appendChild(botonera);
		fragment.appendChild(containerRespuesta);

		return fragment;
}

//funcion utilizada para dibujar comentarios en el front

const armadoComentario = (objeto) =>{
		let comentario = document.createElement("DIV");
		let nombre = document.createElement("h2");
		let bloque = document.createElement("DIV");
		let btnEditar = document.createElement("BUTTON");
		let btnEliminar = document.createElement("BUTTON");
		let novedad = document.createElement("p");
		let horaDia = document.createElement("p");
		
		comentario.classList.add("comentario");
		comentario.setAttribute("id", objeto.id_novedad);
		bloque.classList.add("bloqueCabecera");
		nombre.innerHTML = (objeto.com_usuario);
		btnEditar.setAttribute("name", "editarComentario");
		btnEditar.innerHTML = ("Editar");
		btnEditar.style.display = "none";
		btnEliminar.setAttribute("name", "eliminarComentario");
		btnEliminar.innerHTML = ("Eliminar");
		btnEliminar.style.display = "none";
		novedad.innerHTML = (objeto.comentario);
		horaDia.innerHTML = (objeto.com_datetime);
		novedad.style.marginTop = "5px";
		
		let fragmentoBase = new DocumentFragment();
		let primerFragmento = new DocumentFragment();
		fragmentoBase.appendChild(btnEliminar);
		fragmentoBase.appendChild(btnEditar);
		fragmentoBase.appendChild(nombre);
		bloque.appendChild(fragmentoBase);
		primerFragmento.appendChild(bloque);
		primerFragmento.appendChild(horaDia);
		primerFragmento.appendChild(novedad);
		comentario.appendChild(primerFragmento);
		comentario.appendChild(bloqueRespuesta());

		return comentario;
}

//funcion utilizada para el armado de respuestas en el front

const armadoRespuesta = (objeto) =>{
		let containerRespuesta = document.createElement("DIV");
		let nombre = document.createElement("p");
		let horario = document.createElement("p");
		let finalizacion = document.createElement("p");

		containerRespuesta.classList.add("containerRespuesta");
		containerRespuesta.style.marginTop = "40px";
		nombre.style.marginBottom = "10px";
		nombre.style.fontSize = "20px";
		finalizacion.style.marginBottom = "5px";
		finalizacion.style.marginTop = "5px";

		nombre.innerHTML = (objeto.res_usuario);
		horario.innerHTML = (objeto.res_datetime);
		finalizacion.innerHTML = (objeto.respuesta);

		let fragment = new DocumentFragment();

		fragment.appendChild(nombre);
		fragment.appendChild(horario);
		fragment.appendChild(finalizacion);

		containerRespuesta.appendChild(fragment);

		return containerRespuesta;
}

//dibujo en el front de comentarios y persistencia en la base de datos

btnEnviar.addEventListener("click",(e)=>{
	e.preventDefault();
	let usuario = document.getElementById("usuario").value;
	let entrada = document.getElementById("contenidoEntrada").value;

	if(usuario != "" && entrada != ""){
		const fecha = new Date();
		let newEntrada = {
			com_usuario: `${usuario}`,
			com_datetime: `${fecha.getDate() +"/"+ (fecha.getMonth() + 1) + "/" + (fecha.getYear() + 1900) + "  " +  ((fecha.getHours() < 10 ? '0' : '') + fecha.getHours()) + ":" + (fecha.getMinutes()<10?'0':'') + fecha.getMinutes()}`,
			comentario: `${entrada}`
		}

		let containerComentario = armadoComentario(newEntrada);

		document.querySelector(".containerEntradas").prepend(containerComentario);
    	document.getElementById("contenidoEntrada").value = "";
		document.getElementById("usuario").value = "";

		newEntrada.com_datetime = `${(fecha.getYear() + 1900) +"-"+ (fecha.getMonth() + 1) + "-" + ((fecha.getDate() < 10 ? '0' : '') + fecha.getDate()) + " " + ((fecha.getHours() < 10 ? '0' : '') + fecha.getHours()) + ":" + (fecha.getMinutes()<10?'0':'') + fecha.getMinutes() + ":00"}`
		
		fetch(url + '/api/novedades',{
			method: 'POST',
			body: JSON.stringify(newEntrada),
			headers: {
				"Content-type":"application/json"
			}
		}).then(res=>res.json())
		  .then(data=>{
		  	containerComentario.setAttribute("id", data.insertId)
		  })//nos devuelve el id en la base de datos
	}
	else{
		alert("Falta tu nombre o la entrada");
	}
	
});

btnCancelar.addEventListener("click", (e)=>{
	e.preventDefault();
	document.getElementById("usuario").value = "";
	document.getElementById("contenidoEntrada").value = "";
});


const quitaElemento = (id) =>{
	let list = containerEntradas.children;
	for(l of  list){
		if(l.getAttribute("id") == id){
			l.remove();
		}
	}
};

//controlador de eventos en el container de comentarios. Responder y, editar y eliminar para el admin
containerEntradas.addEventListener("dblclick",(e)=>{
	e.preventDefault();
	let seleccion = e.target;
	seleccion.setAttribute("id", seleccion.parentNode.parentNode.getAttribute("id"));
	if(seleccion.getAttribute("name") == "eliminarComentario"){
		let id = seleccion.parentNode.parentNode.getAttribute("id");
		let decision = prompt("Escriba que desea eliminar.\n¿Comentario (lo que incluye a la respuesta tambien) o respuesta?");
		if(decision == "comentario"){
			fetch(url+"/api/novedades/"+id ,{
				method: 'DELETE'
			})
		      .then(res=>res.json())
			   quitaElemento(id);
		}
		else if(decision == "respuesta"){
			let padre = e.target.parentNode.parentNode;
			let cont = padre.children[3];
			console.log(cont);
			if(cont.classList.contains("btnRespuesta")){
				window.confirm("Este comentario aun no tiene respuesta");
			}
			else{
				cont.remove();
			
				fetch(url + '/api/novedades/'+id,{
					method: 'PUT',
					body: JSON.stringify({
						res_usuario: "",
						res_datetime: "",
						respuesta: "",
						opcion:"1",
						sql:"UPDATE novedades SET res_datetime = ?, res_usuario = ?, respuesta = ? WHERE id_novedad = ?"
					}),
					headers: {
						"Content-type":"application/json"
					}
				}).then(res=>res.json())
				padre.appendChild(bloqueRespuesta());
			}
		}
	}
	else if(seleccion.getAttribute("name") == "editarComentario"){
		window.confirm("Puede modificar comentario o respuesta.\nUna vez finalizado de click en 'editar' para guardar cambios");
		let flag = 1;
		let padre = seleccion.parentNode.parentNode;
		let comentario = padre.children[2];
		comentario.setAttribute("contenteditable", "true");
		let respuesta = "";
		if(!padre.children[3].classList.contains("btnRespuesta")){
			respuesta = padre.children[3].children[2];
			respuesta.setAttribute("contenteditable", "true");
		}
		
		seleccion.addEventListener("click", (e)=>{
			if(flag == 1){
				e.preventDefault();
				fetch(url + '/api/novedades/'+seleccion.getAttribute("id"),{
					method: 'PUT',
					body: JSON.stringify({
						comentario:`${comentario.textContent}`,
						respuesta:`${respuesta.textContent}`,
						sql:"UPDATE novedades SET comentario = ?, respuesta = ? WHERE id_novedad = ?",
						opcion:"2"
					}),
					headers: {
						"Content-type":"application/json"
					}
				}).then(res=>res.json())
	  			comentario.setAttribute("contenteditable", "false");
				if(!padre.children[3].classList.contains("btnRespuesta")){
					respuesta.setAttribute("contenteditable", "false");
				}
			}
			flag++;
		})
	}
})

containerEntradas.addEventListener("click", (e)=>{
	e.preventDefault();
	let aux = e.target;
	if(aux.classList.contains("btnRespuesta")){
		let hijos = aux.parentNode.children;
		hijos[4].style.display = "block";
	}
	else if(aux.getAttribute("name") == "cancelarRespuesta"){
		let hijos = aux.parentNode.parentNode.parentNode.children;
		hijos[4].style.display = "none";
		let input = aux.parentNode.parentNode.children;
		input[0].value = "";
		input[1].value = "";	
	}
	else if(aux.getAttribute("name") == "enviarRespuesta"){
		let hijos = aux.parentNode.parentNode.children;
		var respuesta, usuario;
		usuario = hijos[0].value;
		respuesta = hijos[1].value;
		
		if(usuario != "" && respuesta != ""){
			let comentario = aux.parentNode.parentNode.parentNode;
			let padre = aux.parentNode.parentNode.parentNode.children;
			var a,b;//las variables que se le van a asignar al boton de respuesta y al contendor de las respuesta, para luego ser eliminados
			a = padre[3];
			b = padre[4];
			a.remove();
			b.remove();

			let fecha = new Date();

			let newEntrada = {
				res_usuario: `${usuario}`,
				res_datetime: `${fecha.getDate() +"/"+ (fecha.getMonth() + 1) + "/" + (fecha.getYear() + 1900) + "  " +  ((fecha.getHours() < 10 ? '0' : '') + fecha.getHours()) + ":" + (fecha.getMinutes()<10?'0':'') + fecha.getMinutes()}`,
				respuesta: `${respuesta}`,
				opcion:"1",
				sql:"UPDATE novedades SET res_datetime = ?, res_usuario = ?, respuesta = ? WHERE id_novedad = ?"
			}
				
			let containerRespuesta = armadoRespuesta(newEntrada)
			comentario.appendChild(containerRespuesta);

			newEntrada.res_datetime = `${(fecha.getYear() + 1900) +"-"+ (fecha.getMonth() + 1) + "-" + ((fecha.getDate() < 10 ? '0' : '') + fecha.getDate()) + " " + ((fecha.getHours() < 10 ? '0' : '') + fecha.getHours()) + ":" + (fecha.getMinutes()<10?'0':'') + fecha.getMinutes() + ":00"}`

			fetch(url + '/api/novedades/'+comentario.getAttribute("id"),{
				method: 'PUT',
				body: JSON.stringify(newEntrada),
				headers: {
					"Content-type":"application/json"
				}
			}).then(res=>res.json())
		  	  
			}
		else{
			alert("Faltan tu nombre o la respuesta");
		}
	}
});









