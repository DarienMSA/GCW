


var clicAudio = new Audio('../Assets/Sonidos/Clic.mp3');
clicAudio.volume = 0.5;
clicAudio.loop = false;
clicAudio.muted = true;

var gp;


$(document).ready(function () {
    var mainAudio = document.getElementById("homeAudio");
    mainAudio.play();
    gp = navigator.getGamepads()[0];


    $(".button_sound").click(function () {
        clicAudio.play();

    })

    isMuted = localStorage.getItem("Muted");
    if (isMuted == "false" || isMuted == null) {

        mainAudio.muted = false;
        clicAudio.muted = false;
        $(".btn-volumeOn").show();
        $(".btn-volumeOff").hide();


    } else {
        mainAudio.muted = true;
        clicAudio.muted = true;
        $(".btn-volumeOff").show();
        $(".btn-volumeOn").hide();

    }

    $(".btn-volumeOff").click(function () {
        localStorage.setItem("Muted", false);
        mainAudio.muted = false;
        clicAudio.muted = false;
        $(".btn-volumeOff").fadeOut(function () {
            $(".btn-volumeOn").fadeIn();

        });
    })

    $(".btn-volumeOn").click(function () {
        localStorage.setItem("Muted", true);
        mainAudio.muted = true;
        clicAudio.muted = true;
        $(".btn-volumeOn").fadeOut(function () {
            $(".btn-volumeOff").fadeIn();

        });
    })

    $("#orderByScore").click(function () {
        $("#orderByScore").addClass("orderSelected");
        $("#orderByDate").removeClass("orderSelected");
        orderByAJAX("score")
    })

    $("#orderByDate").click(function () {
        $("#orderByDate").addClass("orderSelected");
        $("#orderByScore").removeClass("orderSelected");
        orderByAJAX("date")
    })

});

function orderByAJAX(order) {
    $.ajax({
        dataType: "JSON",
        method: "GET",
        url: "../controllers/scoreOrderBy.php",
        data: {
            "order": order
        },
        success: function (result) {
            $("tbody").empty();
            let order = 0;
            let div = "";

            $.each(result, function (k, v) {
                order++;
                div += `
                            <tr>
                            <th>${order}</th>
                            <td>${v.score}</td>
                            <td>${v.username}</td>
                            <td>${v.date}</td>
                            </tr>
                    `;

            })
            $('tbody').append(div);


        },
        error: function (error) {
            console.log(error);
        }
    });
}

function gamepadDetector(playerAmount) {
    gp = navigator.getGamepads()[0];
    if (playerAmount == 1) {
        if (gp == null) {
            if (confirm("No se ha detectado un gamepad. \nSolo podrá jugar con teclado.\n\nConecte un gamepad y presione cualquier botón para detectarlo.\n¿Continuar de todos modos?")) {
                window.location.href = "game.php?playersAmount=" + playerAmount;
            }
        } else {
            window.location.href = "game.php?playersAmount=" + playerAmount;
        }


    } else if (playerAmount == 2) {
        if (gp == null) {
            alert("No se ha detectado un gamepad. \nEl segundo jugador debe jugar con un gamepad.\n\nConecte un gamepad y presione cualquier botón para detectarlo.")
        } else {
            window.location.href = "game.php?playersAmount=" + playerAmount;
        }
    }
}



