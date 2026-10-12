/*Hace que la pagina se posicione en el elemento seleccionado.
  Como tipo anclas de la equiqueta <a> de html
1) elem: cualquier elemento html normalmente una sección
2) alignTo is a boolean: 
    true - the top of the element will be aligned to the top of the visible area of the scrollable ancestor
    false - the bottom of the element will be aligned to the bottom of the visible area of the scrollable ancestor
 */
function anchor(elem, alignTo) {
  document.getElementById(elem).scrollIntoView(alignTo);
} 

//_____________________________________________________

/*Hace que la imagen del elemento se mueva a otra velocidad, la imagen debe ser aplicada con CSS
  y debe tener background-attachment: fixed;
NO necesita parámetros
el divisor 8 puede cambiar, mientras más alto el valor más lento se mueve, mientras más bajo el valor más rápido se mueve el fondo
Necesita un eventlistener de scroll
*/
function parallax_background() {
  document.getElementById("section_1").style.backgroundPositionY = -(html.scrollTop / 8)+'px';  //-(html.scrollTop / 8) - 200 +'px'
  document.getElementById("section_2").style.backgroundPositionY = -(html.scrollTop / 8)+'px';  //-(html.scrollTop / 8) - 200 +'px'
}

window.addEventListener("scroll", parallax_background, false);

//_____________________________________________________
/*
Es para agregar o quitar estilos de css dependiendo de la cantidad de pixeles que se hayan recorrido con el scroll
No necesita parámetros
Necesita un eventlistener de scroll
*/
function scrollAction() {

  if (html.scrollTop >= 400 ) {  // para agregar estilos de css

  } 

  else {  //para quitar estilos de css

  }  
}

//ScrollAction: Ejecuta código de JS dependiendo de la cantidad de pixeles recorridos.
window.addEventListener("scroll", scrollAction);

//_____________________________________________________

/*
Es pare decidir si se agregan o quitan funciones dependiendo del tamaño de la pantall
La variable viewPort se declara en el template
Las funciones a agregar o quitar deben estar ya declaradas previamente
Las funciones se agregan con addEventListener y se quitan con removeEventListener
Además de funciones también se pueden cambiar directamente estilos de css como en la línea header.style.backgroundColor = "#fff";
Se necesitan dos eventlisteners
*/

function addFunctions() {

  if (viewPort == "laptop" || viewPort == "tablet") { 

    //window.addEventListener("scroll", myFunctionForLaptop, false);

  } else {

    //window.removeEventListener("scroll", myFunctionForLaptop, false);
    //header.style.backgroundColor = "#fff";
  } 
}

window.addEventListener("resize", addFunctions); // Al reajuastar la pantalla se tiene q decidir qué funciones se agregan
window.addEventListener("load", addFunctions); // Al cargar también se tiene q decidir qué funciones se agregan
//_____________________________________________________

/*
Estructura básica de una función AJAX
Para funcionar junto con PHP
*/

function funcionAjax() {

  var xmlhttp = new XMLHttpRequest();
  var url = "../model/instancias/registrarOperacion.php"; // El archivo q mandará la respuesta
  var elem = document.getElementById("notifica"); // El elemento donde se muestra la respuesta

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { // Si se recibió respuesta:

         elem.innerHTML = xmlhttp.responseText; // Se imprime la respuesta de php en elem
      }
  }// Corchete de xmlhttp.onreadystatechange

  xmlhttp.open("POST", url, true); // Aquí se manda la URL, siempre con el méteodo POST
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded"); // Necesario
  xmlhttp.send();//send() Obligatorio aunq no se envíe nada. Una variable: "var1="+var1,  Multiples: "&var1="+var1+"&var2="+var2
}

//_____________________________________________________

/*
Esta funcion forza que la página se recargue
hay que ponerla dentro del documento de HTML en las etiquitas de script
*/

window.onload = function() {
  if (!window.location.hash) {
       window.location = window.location + '#updated';
       window.location.reload();
  }
}


//_____________________________________________________ NUEVA 1 Jun 4 2020

/*
VERY INTERESTING FUNCTION - NOT SHARED WITH OTHERS YET
This function returns as an array the selected options of the received select tag
Esta funcion devuelve en un arreglo las opciones seleccionadas del select recibido
Después se puede almacenar cada arreglo en una variable así: "var miArreglo = getSelectValues(selecId)"
*/

 function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text); // This adds each option value or text to the array
    }
  }
  return result; //An array with all the options selected in a <select multiple>
}

//Así se puede usar:
var miArreglo = getSelectValues(selecId); // selecId is the id of any select element with the multiple attribute 

//_____________________________________________________  NUEVA 2 - 1 Jun 8 2020

/*
   Función que detecta el scroll up o down, aquí oculta y muestra el header, necesaria para cuando se use la funcion de anchor.
1. Agrega la función a la página donde se necesita
2. #wrap debe tener padding-top: initial;
3. Agregar una transition al header, inlcluso un delay ayuda visualmente
*/

var lastScrollTop = 0;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   
   var st = window.pageYOffset || html.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop) {

      header.style.top = "-60px";
      header.style.height = "0px";
   } else {

      header.style.top = "0px";
      header.style.height = "60px";
   }

   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
   
}, false);

//_____________________________________________________  AGREGADA Feb 1 2021

/*
   isInViewPort() también usa la variable lastScrollTop
1. Agrega la función a la página donde se necesita
2. Agrega un id a todos los elementos que quieres que tengan efectos
3. se necesita una variable elem y una variable rect por cada elemento
4. Observa lo que se hace con elem1 y rect1 así cómo elem2 y rect2 y eso mismo tienes que hacer con los nuevos elementos que se necesite animar
*/

var lastScrollTop = 0;

function isInViewport() { 

    var st = window.pageYOffset || html.scrollTop; // incluida en la función que detecta scroll up / down

    var elem1 = document.getElementById("img1");
    var rect1 = elem1.getBoundingClientRect();
    var elem2 = document.getElementById("img2");
    var rect2 = elem2.getBoundingClientRect(); 

    // Sí se hace scroll down y los elementos aparacen en el view port:
    if (st > lastScrollTop) {  // SCROLL DOWN
     
        // elem1 is visible: 
      if ( rect1.top >= 0 && rect1.left >= 0 && rect1.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect1.right <= (window.innerWidth || document.documentElement.clientWidth) == true  ) { 

        elem1.style.transform = "scale(1)";

      } 

        // elem2
      if ( rect2.top >= 0 && rect2.left >= 0 && rect2.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect2.right <= (window.innerWidth || document.documentElement.clientWidth) == true  ) { 

        elem2.style.transform = "scale(1)";

      } 
     
      //... Y así seguir agregando elementos 

    } // scroll down

    else { // else significa scroll up

      // viewPort es una variable de template.js
      if (viewPort == "phone" && html.scrollTop <= 4600 || viewPort == "tablet" && html.scrollTop <= 2850 || viewPort == "laptop" && html.scrollTop <= 2550) {

        elem1.style.transform = "scale(0)";
        elem2.style.transform = "scale(0)";

      }
    }

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling ()

}

window.addEventListener("scroll", isInViewport, false);