<?php


include_once '../controllers/scoreFillController.php';

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Garden Rush</title>
  <link rel="icon" href="../Assets/Imagenes/icon.png">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>


  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

  <link rel="stylesheet" href="../css/home.css">
  <script src="../js/home.js"></script>


</head>

<body>

  <div class="row">
    <div class="col-6">
      <input class="config-button button_sound" data-bs-toggle="modal" data-bs-target="#configModal" type="image" src="../Assets/Botones/Config_btn.png" alt="">
    </div>
    <div class="col-6 mt-5">
      <a class="button_sound" onclick="gamepadDetector(1);"><input class="home-buttons " type="image" src="../Assets/Botones/Button_1_Jugador.png" alt=""></a>
      <a class="button_sound" onclick="gamepadDetector(2);"><input class="home-buttons " type="image" src="../Assets/Botones/Button_2_Jugadorer.png" alt=""></a>
      <input class="home-buttons button_sound" data-bs-toggle="modal" data-bs-target="#controlModal" type="image" src="../Assets/Botones/Button_Controles.png" alt="">
      <input class="home-buttons button_sound" data-bs-toggle="modal" data-bs-target="#puntuacionesModal" type="image" src="../Assets/Botones/Button_Puntuaciones.png" alt="">
    </div>
  </div>

  <!-- <audio src="../Assets/Sonidos/BG_main.mp3" autoplay loop></audio> -->

  <div class="modal fade" id="configModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modal-content-skip">
        <div class="modal-body mx-auto d-flex">
          <img src="../Assets/Botones/CuerpoConfiguracion.png" class="img-fluid" alt="">
          <input type="image" src="../Assets/Botones/volumeOn.png" class="img-fluid btn-volumeOn soundbtn btnScale">
          <input type="image" src="../Assets/Botones/volumeOff.png" class="img-fluid btn-volumeOff soundbtn btnScale">
        </div>

        <input type="image" src="../Assets/Botones/Close.png" class="img-fluid btnScale btnCloseSettings button_sound" style="width:14%; height:15%;" data-bs-dismiss="modal">

      </div>
    </div>
  </div>

  <div class="modal fade" id="controlModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered  modal-lg">
      <div class="modal-content modal-content-skip">
        <div class="modal-body mx-auto d-flex">
          <img src="../Assets/Botones/CuerpoControles.png" class="img-fluid" alt="">
        </div>

        <input type="image" src="../Assets/Botones/Close.png" class="img-fluid btnScale btnCloseControls button_sound" style="width:14%; height:15%;" data-bs-dismiss="modal">

      </div>
    </div>
  </div>

  <div class="modal fade" id="puntuacionesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content modal-content-skip">
        <div class="modal-body mx-auto d-flex">
          <img src="../Assets/Botones/Puntuaciones.png" class="img-fluid" alt="">
          <div class="tableFixHead">
            <table class="table bold table-puntuaciones text-center">
              <thead>
                <tr>
                  <th scope="col">Posición</th>
                  <th scope="col" id="orderByScore" class="orderBy">Puntuación</th>
                  <th scope="col">Nombre</th>
                  <th scope="col" id="orderByDate" class="orderBy">Fecha</th>
                </tr>
              </thead>
              <tbody>
                <?php
                $pos = 0;
                foreach ($score_arr as $score) {
                  $pos++;
                  echo ('
                  <tr>
                    <th>' . $pos . '</th>
                    <td>' . $score["score"] . '</td>
                    <td>' . $score["username"] . '</td>
                    <td>' . $score["date"] . '</td>
                  </tr>
                  ');
                }

                ?>

              </tbody>
            </table>
          </div>

        </div>

        <input type="image" src="../Assets/Botones/Close_2.png" class="img-fluid btnScale btnCloseScore button_sound" style="width:14%; height:15%;" data-bs-dismiss="modal">

      </div>
    </div>
  </div>

  <audio src="../Assets/Sonidos/BG_main.mp3" preload="auto" id="homeAudio" loop autoplay></audio>


</body>

</html>