const ruleta = document.getElementById("ruleta")

const uno= {
    nombre: "Uno",
    probabilidad: 20
}

const dos= {
    nombre: "Dos",
    probabilidad: 50
}

const tres= {
    nombre: "Tres",
    probabilidad: 30
}

let conceptos = [uno,dos,tres];

const colores = ["126253","134526","C7B446","5D9B9B","8673A1","100000","4C9141","8E402A","231A24","424632","1F3438","025669","008F39","763C28"];
function ajustarRuleta(){
    const opcionesContainer = document.createElement("div");
    opcionesContainer.id = "opcionesContainer"
    ruleta.appendChild(opcionesContainer);
    conceptos.forEach((concepto, i )=>{
        //crar triangulos colores
        const opcionesElement = document.createElement("div");
        opcionesElement.classList.add("opcion");
        ruleta.appendChild(opcionesElement);
        opcionesElement.style = `background-color: ${colores[i]}`
    })

}

ajustarRuleta();