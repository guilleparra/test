//To detect the browser being used:

if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) { var browser = "Opera"; } 
else if(navigator.userAgent.indexOf("Chrome") != -1 ) { var browser = "Chrome"; }
else if(navigator.userAgent.indexOf("Safari") != -1) { var browser = "Safari"; } 
else if(navigator.userAgent.indexOf("Firefox") != -1 ) { var browser = "Firefox"; }
else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) { var browser = "IE"; }  
else { var browser = "unknown"; }


var viewPort = "";

function getSize() {

  //Para especificar el tamaño de la pantalla
  if (window.innerWidth < 600) { viewPort = "phone"; }  
  else if (window.innerWidth >= 600 && window.innerWidth < 970) { viewPort = "tablet"; }
  else if (window.innerWidth >= 970) { viewPort = "laptop"; }
}

window.addEventListener("resize", getSize); //find the screen size on risize
window.addEventListener("load", getSize); // find the screen size on load

//VARIABLES GLOBALES _________________________________

var html = document.getElementById('html');
    
//FUNCIONES __________________________________________

/*Para ocultar el menú en modo celular*/
function hide_mobile() { 

   document.getElementById("chbx").checked = false; 
   //added the next 3 lines on Oct - 05 -2020 
   document.getElementById("html").style.overflow = "auto";
   boton_menu.children[0].style.transform = "rotateX(0deg)";
   boton_menu.children[0].setAttribute("class","fas fa-grip-lines");
}

//Al darle click en wrap se oculta el menu para celular
wrap.addEventListener("click", hide_mobile);

//_____________________________________________________

//Impide el scroll al estar activo el menu de celular y cambia el ícono del botón menú Abr-25-2020
function hideScroll() {

    boton_menu.children[0].style.transition = "all 1s ease-out";

	if (document.getElementById("chbx").checked == true) {

		document.getElementById("html").style.overflow = "auto";
		boton_menu.children[0].style.transform = "rotateX(0deg)";
		boton_menu.children[0].setAttribute("class","fas fa-grip-lines");
	
	} else {

        document.getElementById("html").style.overflow = "hidden";
        boton_menu.children[0].style.transform = "rotateX(190deg)";
        boton_menu.children[0].setAttribute("class","fas fa-times");        
	}
}

document.getElementById("boton_menu").addEventListener("click", hideScroll);

//Al darle click en wrap se oculta el menu para celular: Oct - 05 -2020 
document.getElementById("menu_movil").addEventListener("click", hide_mobile);