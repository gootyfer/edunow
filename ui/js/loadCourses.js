// <li data-image="img/logo-coursera-sombra.png" class="thumb">
//                             <a href="#">
//                                 <strong>Título del curso 1</strong>
//                                 <small>Descripción</small></a></li>


function reqListener () {

  var tasks = oReq.responseJSON;

  var ul = document.getElementById("tasks");
  tasks.forEach(function(task){
  	var li = document.createElement("li");
  	li['data-image'] = "img/logo-"+task.provider+"-sombra.png";
  	li.className = "thumb";
  	var a = document.createElement("a");
  	a.href="#";
  	var strong = document.createElement("strong");
  	strong.innerHTML = task.course;
  	var small = document.createElement("small");
  	small.innerHTML = task.task;
  	var div = document.createElement("div");
  	div.innerHTML = task.type;
  	div.className = "right tag";
  	a.appendChild(strong);
  	a.appendChild(small);
  	a.appendChild(div);
  	li.appendChild(a);
  	ul.appendChild(li);
  });
};

requestSubs("example.json");

function requestSubs(subsName){
	var client = new XMLHttpRequest();
	client.onreadystatechange = handler;
	try{
		client.open("GET", subsName);
		client.send(null);
	}catch(err){
         alert("Error de conexión: " + err);
         return;
    }
}


//Manejador de la petición asíncrona XMLHttpRequest
function handler() {
	if(this.readyState == 4 && this.status == 200){
		if(this.responseText != null){
			

		  var tasks = JSON.parse(this.responseText);

		  var ul = document.getElementById("tasks");
		  tasks.forEach(function(task){

		  	if(task.date){
		  		var li = document.createElement("li");
		  		li.className = "light";
		  		var strong = document.createElement("strong");
		  		strong.innerHTML = task.date;
		  		li.appendChild(strong);
		  		ul.appendChild(li);
		  	}

		  	var li = document.createElement("li");
		  	li.setAttribute("data-image" , "img/logo-"+task.provider+"-sombra.png");
		  	li.className = "thumb";
		  	var img  = document.createElement("img");
		  	img.src="img/logo-"+task.provider+"-sombra.png";
		  	img.className="icon";
		  	li.appendChild(img);
		  	var a = document.createElement("a");
		  	a.href="#";
		  	var strong = document.createElement("strong");
		  	strong.innerHTML = task.course;
		  	var small = document.createElement("small");
		  	small.innerHTML = task.task;
		  	var div = document.createElement("div");
		  	div.innerHTML = task.type;
		  	div.className = "right tag";
		  	if(task.type=="assignment"){
		  		div.className += " cancel";
		  	}
		  	if(task.type=="lecture"){
		  		div.className += " accept";
		  	}
		  	a.appendChild(strong);
		  	a.appendChild(small);
		  	a.appendChild(div);
		  	li.appendChild(a);
		  	ul.appendChild(li);
		  });


	  	}
	}
	else if (this.readyState == 4 && this.status != 200) 
	alert("Error al acceder al fichero de subtítulos: "+this.status+" "+this.statusText);
}