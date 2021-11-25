<?php
if (isset($_GET["playersAmount"])) {
  $playersAmount = $_GET["playersAmount"];
  if ($playersAmount != 1 && $playersAmount != 2) {
    header('Location: index.php');
  }
} else {
  header('Location: index.php');
}
?>
<div id="playersAmount" style="display:none;"><?php echo $playersAmount; ?></div>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Garden Rush</title>
  <link rel="icon" href="../Assets/Imagenes/icon.png">
  <link rel="stylesheet" href="../css/game.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<style>

</style>

<body>

  <div id="player1-health">
    <div class="progress">
      <div class="progress-done" style="width: 300px">



      </div>
    </div>


  </div>

  <div id="player2-health">

    <div class="progress">
      <div class="progress-done" style="width: 300px">



      </div>
    </div>
    <!--<input type="image" id="btnPause" data-bs-toggle="modal" data-bs-target="#pauseModal" type="image" src="../Assets/Botones/btnPause.png" class="img-fluid btnScale" width="100px" height="100px" alt=""> -->

  </div>



  <div class="modal fade" id="pauseModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content modal-content-skip">
        <div class="modal-body mx-auto d-flex">
          <img src="../Assets/Botones/Pausa_Menu.png" class="img-fluid" alt="">
          <input type="image" src="../Assets/Botones/btnResume.png" id="btnResume" class="btnScale" height="80" width="240" data-bs-dismiss="modal"></input>
          <input type="image" src="../Assets/Botones/Ir_Menu.png" id="btnMainMenu" class="btnScale" height="80" width="240"></input>
        </div>



      </div>
    </div>
  </div>

  <div class="modal fade" id="endgame1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content modal-content-skip">
        <div class="modal-body mx-auto d-flex">
          <img src="../Assets/Botones/PrimerJugadorScore.png" class="img-fluid" alt="">
          <input type="text" id="inputname1" class="inputname"></input>
          <h4 id="score1" class="score"></h4>
          <button id="facebookBtn1" class="btn btn-primary facebookBtn">Compartir en Facebook</button>
        </div>
        <input type="image" src="../Assets/Botones/FlechaDerecha.png" class="img-fluid btnScale continuebtn" id="continuebtn1" style="width:14%; height:15%;">
      </div>
    </div>
  </div>

  <div class="modal fade" id="endgame2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content modal-content-skip">
        <div class="modal-body mx-auto d-flex">
          <img src="../Assets/Botones/SegundoJugadorScore.png" class="img-fluid" alt="">
          <input type="text" id="inputname2" class="inputname"></input>
          <h4 id="score2" class="score"></h4>
          <button id="facebookBtn2" class="btn btn-primary facebookBtn">Compartir en Facebook</button>
        </div>
        <input type="image" src="../Assets/Botones/FlechaDerecha.png" class="img-fluid btnScale continuebtn" id="continuebtn2" style="width:14%; height:15%;">
      </div>
    </div>
  </div>



</body>
<script type="text/javascript" src="../js/mifacebook.js"></script>

<script type="text/javascript" src="../js/FBXLoaders/three2.js"></script>
<script type="text/javascript" src="../js/FBXLoaders/MTLLoader.js"></script>
<script type="text/javascript" src="../js/FBXLoaders/FBXLoader.js"></script>
<script type="text/javascript" src="../js/FBXLoaders/OBJLoader.js"></script>
<script type="text/javascript" src="../js/FBXLoaders/inflate.min.js"></script>
<script type="text/javascript" src="../js/models/AudioClass.js"></script>
<script type="text/javascript" src="../js/models/gameAppClass.js"></script>
<script type="text/javascript" src="../js/models/playerClass.js"></script>
<script type="text/javascript" src="../js/models/enemyClass.js"></script>
<script type="text/javascript" src="../js/models/PowerUpClass.js"></script>


<script type="text/javascript" src="../js/Scenes/firstScene.js"></script>
<script type="text/javascript" src="../js/Scenes/secondScene.js"></script>
<script type="text/javascript" src="../js/Scenes/thirdScene.js"></script>
<script type="text/javascript" src="../js/main.js"></script>

</html>