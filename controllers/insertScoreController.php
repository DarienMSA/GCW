<?php


include_once '../model/databaseClass.php';
include_once '../model/scoretableClass.php';

$database = new Database();
$db = $database->connect();

$score = new scoreTable($db);
$score->username = $_POST["name"];
$score->score = $_POST["score"];

echo $score->insertScore();
