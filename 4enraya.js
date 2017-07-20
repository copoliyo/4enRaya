var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	ponerFichaRoja: function(coordenada) {
		var cell = document.getElementById(coordenada);
		cell.setAttribute("class", "ficharoja");
	},
	ponerFichaNegra: function(coordenada) {
		var cell = document.getElementById(coordenada);
		cell.setAttribute("class", "fichanegra");
	},
	ponerSinFicha: function(coordenada){
		var cell = document.getElementById(coordenada);
		cell.removeAttribute("class", "fichanegra");
		cell.removeAttribute("class", "ficharoja");
	},
	deshabilitarBoton: function(idBoton){
		var boton = document.getElementById(idBoton);
		boton.setAttribute("disabled", "true");
		boton.setAttribute("class", "botonInactivo");
	},
	habilitarBoton: function(idBoton){
		var boton = document.getElementById(idBoton);
		boton.removeAttribute("disabled");
		boton.setAttribute("class", "botonActivo");		
	},
	ocultarBoton: function(idBoton){
		var boton = document.getElementById(idBoton);
		boton.style.display = "none";		
	},
	mostrarBoton: function(idBoton){
		var boton = document.getElementById(idBoton);
		boton.style.display = "inline";		
	},
	ocultarBarraBotones: function(){
		var barra = document.getElementById("lineabotones");
		barra.style.display = "none";
	},
	mostrarBarraBotones: function(){
		var barra = document.getElementById("lineabotones");
		barra.style.display = "inline";
	},
	ponerFichas: function(){
		
		for(var y = 1; y <= model.max_filas; y++){
			for(var x = 1; x <= model.max_columnas; x++){		
			    console.log(x + "" + y);		
				if(model.tablero[x][y] === "R"){				
					view.ponerFichaRoja(x + "" + y);
				}else{
					if(model.tablero[x][y] === "N"){
						view.ponerFichaNegra(x + "" + y);
					}else{
						view.ponerSinFicha(x + "" + y);
					}
				}
			}
		}
	}
};

var model = {
	turno : "humano",
	max_columnas : 7,
	max_filas : 6,
	fichas_humano : 21,
	fichas_maquina : 21,
	tablero: [["X", "X", "X", "X", "X", "X", "X", "X"],
		["X", " ", " ", " ", " ", " ", " ", "X"],
		["X", " ", " ", " ", " ", " ", " ", "X"],
		["X", " ", " ", " ", " ", " ", " ", "X"],
		["X", " ", " ", " ", " ", " ", " ", "X"],
		["X", " ", " ", " ", " ", " ", " ", "X"],
		["X", " ", " ", " ", " ", " ", " ", "X"],
		["X", " ", " ", " ", " ", " ", " ", "X"],
		["X", "X", "X", "X", "X", "X", "X", "X"]],
	
	eligeQuienInicia: function(){
		view.ocultarBarraBotones();
		view.mostrarBoton("humano");
		view.mostrarBoton("maquina");
	},
	
	primeraFilaLibreEnColumna: function(columna){
		var i = 1;
		
		if(columna < 1 || columna > model.max_columnas){
			return null;
		}else{
			while(this.tablero[columna][i] !== " " && i <= this.max_filas){
				console.log("i: " + i);
				i++;
			}
			
			console.log("i: " + i);	
			if(i >= this.max_filas)
			return null;
			else
			return i;
		}
		
	},
	
	jugadaMaquina: function(){
		
		var jugada = null;
		
		do{
			
			jugada = Math.floor(Math.random() * this.max_columnas) + 1;
			console.log("Jugada: " + jugada);
			console.log("Pimera fila libre: " + model.primeraFilaLibreEnColumna(jugada));
		}while(model.primeraFilaLibreEnColumna(jugada) == null);
		
		return jugada;
		
	}
	
	
}

// jugada - la columna en la que ponemos la ficha
var controller = {
	jugadas: 0,
	procesaJugada: function(jugada) {
		var columna = jugada;
		var fila = model.primeraFilaLibreEnColumna(columna);
		
		if(jugada > 0 && jugada <= model.max_columnas && jugada != null){
			if(this.jugadas < 42){
				if(model.turno = "humano"){
					view.ponerFichaRoja(columna + "" + fila);
					model.fichas_humano--;
				}else{
					view.ponerFichaNegra(columna + "" + fila);
					model.fichas_maquina--;
				}
				this.jugadas++;
				view.displayMessage("Jugadas: " + this.jugadas);
			}else{
				view.displayMessage("Ya no caben más fichas, se declara empate...;")
			}
		}
		
	}
};

function init() {
	
	view.ocultarBarraBotones();
	view.displayMessage("Decide quien empieza");
	var botonEmpiezaHumano = document.getElementById("humano");
	botonEmpiezaHumano.onclick = handleBotonEmpiezaHumano;
	var botonEmpiezaMaquina = document.getElementById("maquina");
	botonEmpiezaMaquina.onclick = handleBotonEmpiezaMaquina;
	
	//for(var y = 1; y < 7; y++){
	//	for(var x = 1; x < 8; x++){
	//		view.ponerFichaNegra(x + "" + y);
	//	}
	//	
	//}
	//view.deshabilitarBoton("columna7");
	//view.habilitarBoton("columna7");
	//view.habilitarBoton("humano");
	//view.habilitarBoton("maquina");
	//view.ocultarBoton("maquina");
	//view.mostrarBoton("maquina");
	//view.displayMessage("Esto es un mensaje nuevo....");
	//view.ocultarBarraBotones();
	//view.mostrarBarraBotones();
	
}

function handleBotonEmpiezaHumano(){
	
	model.turno = "humano";
	view.mostrarBarraBotones();
	view.ocultarBoton("humano");
	view.ocultarBoton("maquina");	
	view.displayMessage("Empieza el humano");	
	view.ponerFichas();
}

function handleBotonEmpiezaMaquina(){
	
	model.turno = "maquina";
	view.mostrarBarraBotones();
	view.ocultarBoton("humano");
	view.ocultarBoton("maquina");	
	view.displayMessage("Empieza la máquina");
	controller.procesaJugada(model.jugadaMaquina());
}

window.onload = init;