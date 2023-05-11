(function($) {
    $.fn.extend({

        roulette: function(options) {

            var defaults = {
                angle: 0,
                angleOffset: -45,
                speed: 10000,
                easing: "easeInOutElastic",
            };

            var opt = $.extend(defaults, options);

            return this.each(function() {
                var o = opt;

                var data = [
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'mauro.arena'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'onur.aynali'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'oriol.barba'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'ruben.blas'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'gerard.cano'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'juan.carretero'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'claudia.catot'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'samir.channagui'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'gerardo.chavarry'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'younes.derraz'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'soulaimane.elharrak'
                    },

                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'hector.escribano'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'joel.fernandez'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'mario.garcia'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'jefrey.hernandez'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'kevin.herrera'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'denis.jimenez'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'erin.lorenzo'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'david.martinez'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'isaac.menendez'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'victor.sempau'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'alfredo.sendra'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'daniel.shapoval'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'bogdan.stefurak'
                    },
                    {
                        color: 'rgb(105, 105, 105)',
                        text: 'joan.villalba'
                    },
                ];

                var $wrap = $(this);
                var $btnStart = $wrap.find("#btn-start");
                var $roulette = $wrap.find(".roulette");
                var wrapW = $wrap.width();
                var angle = o.angle;
                var angleOffset = o.angleOffset;
                var speed = o.speed;
                var esing = o.easing;
                var itemSize = data.length;
                var itemSelector = "item";
                var labelSelector = "label";
                var d = 360 / itemSize;
                var borderTopWidth = wrapW;
                var borderRightWidth = tanDeg(d);

                for (i = 1; i <= itemSize; i += 1) {
                    var idx = i - 1;
                    var rt = i * d + angleOffset;
                    var itemHTML = $('<div class="' + itemSelector + '">');
                    var labelHTML = '';
                    labelHTML += '<p class="' + labelSelector + '">';
                    labelHTML += '	<span class="text">' + data[idx].text + '<\/span>';
                    labelHTML += '<\/p>';

                    $roulette.append(itemHTML);
                    $roulette.children("." + itemSelector).eq(idx).append(labelHTML);
                    $roulette.children("." + itemSelector).eq(idx).css({
                        "left": wrapW / 2,
                        "top": -wrapW / 2,
                        "border-top-width": borderTopWidth,
                        "border-right-width": borderRightWidth,
                        "border-top-color": data[idx].color,
                        "transform": "rotate(" + rt + "deg)"
                    });

                    var textH = parseInt(((2 * Math.PI * wrapW) / d) * .11);

                    $roulette.children("." + itemSelector).eq(idx).children("." + labelSelector).css({
                        "height": textH + 'px',
                        "line-height": textH + 'px',
                        "transform": 'translateX(' + (textH * 1.03) + 'px) translateY(' + (wrapW * -.40) + 'px) rotateZ(' + (90 + d * .5) + 'deg)'
                    });

                }

                function tanDeg(deg) {
                    var rad = deg * Math.PI / 180;
                    return wrapW / (1 / Math.tan(rad));
                }

                var audioRotacion = document.getElementById('audioRotacion');
                var audioFinal = document.getElementById('audioFinal');

                function rotation() {
                    var completeA = 360 * r(5, 10) + r(0, 360);

                    audioRotacion.play();

                    $roulette.rotate({
                        angle: angle,
                        animateTo: completeA,
                        center: ["50%", "50%"],
                        easing: $.easing.esing,
                        callback: function() {
                            var currentA = $(this).getRotateAngle();

                            audioRotacion.pause();
                            audioRotacion.currentTime = 0;
                            audioFinal.play();

                            console.log(currentA);
                        },
                        duration: speed
                    });
}

                $btnStart.on("click", function() {
                    rotation();
                });

                function rotation() {

                    var completeA = 360 * r(5, 10) + r(0, 360);

                    $roulette.rotate({
                        angle: angle,
                        animateTo: completeA,
                        center: ["50%", "50%"],
                        easing: $.easing.esing,
                        callback: function() {
                            var currentA = $(this).getRotateAngle();

                            console.log(currentA);

                        },
                        duration: speed
                    });
                }

                function r(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

            });
        }
    });
})(jQuery);

$(function() {

    $('.box-roulette').roulette();

});