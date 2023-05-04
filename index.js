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

function ajustarRuleta(){
    const opcionesContainer = document.createElement("div");
    opcionesContainer.id = "opcionesContainer"
    ruleta.appendChild(opcionesContainer);
    conceptos.forEach(concepto =>{
        //crar triangulos colores
        const opcionesElement = document.createElement("div");
        opcionesElement.classList.add("opcion");
        ruleta.appendChild(opcionesElement);
    })

}

ajustarRuleta();