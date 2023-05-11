//CUSTOM "Roulette Wheel" BY jexus fox
//https://codepen.io/jexusfox/pen/WgNpzN

var options = [
    "juan.acosta.7e6@itb.cat",
    "mauro.arena.7e6@itb.cat",
    "onur.aynali.7e6@itb.cat",
    "oriol.barba.7e6@itb.cat",
    "ruben.blas.7e6@itb.cat",
    "juan.canyas.7e6@itb.cat",
    "gerard.cano.7e6@itb.cat",
    "juan.carretero.7e6@itb.cat",
    "claudia.catot.7e6@itb.cat",
    "samir.channagui.7e6@itb.cat",
    "gerardo.chavarry.7e6@itb.cat",
    "pablo.chmyr.7e6@itb.cat",
    "younes.derraz.7e6@itb.cat",
    "soulaimane.elharrak.7e6@itb.cat",
    "hector.escribano.7e6@itb.cat",
    "joel.fernandez.7e6@itb.cat",
    "mario.garcia.7e6@itb.cat",
    "jefrey.hernandez.7e6@itb.cat",
    "kevin.herrera.7e6@itb.cat",
    "denis.jimenez.7e6@itb.cat",
    "erin.lorenzo.7e6@itb.cat",
    "david.martinez.7e6@itb.cat",
    "isaac.menendez.7e6@itb.cat",
    "trishan.mizhquiri.7e6@itb.cat",
    "victor.sempau.7e6@itb.cat",
    "alfredo.sendra.7e3@itb.cat",
    "daniel.shapoval.7e6@itb.cat",
    "bogdan.stefurak.7e6@itb.cat",
    "enric.toll.7e6@itb.cat",
    "joan.villalba.7e6@itb.cat"
];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
    var phase = 0;
    var center = 128;
    var width = 127;
    var frequency = Math.PI*2/maxitem;

    red   = Math.sin(frequency*item+2+phase) * width + center;
    green = Math.sin(frequency*item+0+phase) * width + center;
    blue  = Math.sin(frequency*item+4+phase) * width + center;

    return RGB2Color(red,green,blue);
}

function drawRouletteWheel() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var outsideRadius = 250;
        var textRadius = 160;
        //circulo central
        var insideRadius = 50;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,500,500);

        ctx.strokeStyle = "grey";
        ctx.lineWidth = 1;

        ctx.font = 'bold 12px Helvetica, Arial';

        for(var i = 0; i < options.length; i++) {
            var angle = startAngle + i * arc;
            //ctx.fillStyle = colors[i];
            ctx.fillStyle = getColor(i, options.length);

            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur    = 15;
            ctx.shadowColor   = "rgba(0,0,0,0.9)";
            ctx.fillStyle = "white";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }

        //Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
    }
}

function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';
    var text = options[index]
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();