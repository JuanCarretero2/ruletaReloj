let soFinal = document.getElementById('soFinal');
let soFons = document.getElementById('soFons');
let audio = document.getElementById('audio');
let audioFons = document.getElementById('audioFons');
let tempsFinal = document.getElementById('tempsFinal');
let tempsRestantInput = document.getElementById('tempsRestantInput');
let horaActual = document.getElementById('horaActual');
let tempsRestantDisplay = document.getElementById('tempsRestantDisplay');
let temporitzador;
let comencat = false;

function mostraHora() {
  let data = new Date();
  let h = ("0" + data.getHours()).slice(-2);
  let m = ("0" + data.getMinutes()).slice(-2);
  let s = ("0" + data.getSeconds()).slice(-2);
  horaActual.innerHTML = h + ":" + m + ":" + s;
  setTimeout(mostraHora, 1000);
}

mostraHora();

function comenca() {
  if (comencat) {
    alert("Ja hi ha una alarma en curs. Si us plau, reinicia primer.");
    return;
  }

  let tempsFinalVal = tempsFinal.value.split(':');
  let tempsRestantVal = tempsRestantInput.value.split(':');

  let dataAra = new Date();
  let dataFinal;

  if (tempsFinalVal.length == 2 && !isNaN(tempsFinalVal[0]) && !isNaN(tempsFinalVal[1])) {
    dataFinal = new Date(dataAra.getFullYear(), dataAra.getMonth(), dataAra.getDate(), tempsFinalVal[0], tempsFinalVal[1]);
  } else if (tempsRestantVal.length == 3 && !isNaN(tempsRestantVal[0]) && !isNaN(tempsRestantVal[1]) && !isNaN(tempsRestantVal[2])) {
        dataFinal = new Date(dataAra.getTime() + ((+tempsRestantVal[0])*60*60*1000 + (+tempsRestantVal[1])*60*1000 + (+tempsRestantVal[2])*1000));
  } else {
    alert('Introdueix un valor vàlid per a l\'hora de finalització o la durada.');
    return;
  }

  comencat = true;
  audioFons.loop = true; // Añadir para que el audio de fondo se repita en bucle
  audioFons.src = soFons.value;
  audioFons.play();

  temporitzador = setInterval(function() {
    let tempsAra = new Date().getTime();
    let tempsResta = dataFinal - tempsAra;

    let h = Math.floor((tempsResta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((tempsResta % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((tempsResta % (1000 * 60)) / 1000);

    h = ("0" + h).slice(-2);
    m = ("0" + m).slice(-2);
    s = ("0" + s).slice(-2);

    tempsRestantDisplay.innerHTML = "Temps restant: " + h + ":" + m + ":" + s;

    if (tempsResta < 0) {
      clearInterval(temporitzador);
      audio.src = soFinal.value;
      audio.play();
      audioFons.pause(); // Añadir para detener el audio de fondo
      tempsRestantDisplay.innerHTML = "Temps esgotat!";
      comencat = false;
    }
  }, 1000);
}

function reinicia() {
  clearInterval(temporitzador);
  tempsRestantDisplay.innerHTML = "";
  tempsFinal.value = "";
  tempsRestantInput.value = "";
  audioFons.pause(); // Detener la música de fondo
  audioFons.currentTime = 0; // Resetear la música de fondo
  if(!audio.paused) { // Si el sonido final sigue sonando...
  audio.pause(); // ...lo detenemos...
  audio.currentTime = 0; // ...y lo reseteamos.
}
  comencat = false;
}