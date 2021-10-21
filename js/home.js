var mainAudio = new Audio('../Assets/Sonidos/BG_main.mp3');
mainAudio.volume = 0.15;
mainAudio.loop = true;
mainAudio.muted = true;


var clicAudio = new Audio('../Assets/Sonidos/Clic.mp3');
clicAudio.volume = 0.5;
clicAudio.loop = false;
clicAudio.muted = true;




$(document).ready(function () {
    console.log("ready!");
    mainAudio.muted = false;
    clicAudio.muted = false;
    mainAudio.play();

    $(".button_sound").click(function () {
        clicAudio.play();

    })



    $(".btn-volumeOff").hide();

    $(".btn-volumeOff").click(function () {
        $(".btn-volumeOff").fadeOut(function () {
            $(".btn-volumeOn").fadeIn();
        });
    })

    $(".btn-volumeOn").click(function () {
        $(".btn-volumeOn").fadeOut(function () {
            $(".btn-volumeOff").fadeIn();
        });
    })
});