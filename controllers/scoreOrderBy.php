<?php

include_once '../model/databaseClass.php';
include_once '../model/scoretableClass.php';

$database = new Database();
$db = $database->connect();

$score = new scoreTable($db);

$order = $_GET["order"];

if ($order == "score") {
    echo getScores($score->getScoresbyScore());
} else if ($order == "date") {
    echo getScores($score->getScoresbyDate());
}

$score = null;
$db = null;
$database = null;


function getScores($result)
{
    $num = $result->rowCount();
    $score_arr = array();

    if ($num > 0) {
        //$users_arr['data'] = array();

        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $score_item = array(
                'id_scoreTable' => $id_scoreTable,
                'username'          => $username,
                'score'    => $score,
                'date'          => $date
            );

            //array_push($users_arr['data'], $user_item);
            array_push($score_arr, $score_item);
        }
    }
    return json_encode($score_arr);
}
