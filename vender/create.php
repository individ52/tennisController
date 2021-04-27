<?php

require_once 'config/create.php'

$post = json_decode($_POST);

$playersName     = $post => "OneP";
$biggestRound    = $post => "biggestRound";
$data            = $post => "data";
$dayScore        = $post => "dayScore";
$dayTime         = $post => "dayTime";
$firsts          = $post => "firsts";
$fotalFailForOne = $post => "fotalFailForOne";
$fotalFailForTwo = $post => "fotalFailForTwo";
$roundTimeFast   = $post => "roundTimeFast";
$roundTimeSlow   = $post => "roundTimeSlow";

mysqli_query($connect, INSERT INTO `maindata` (`id`, `playersName`, `globalScore`, `allTimeInGame`, `biggestRound`, `numOfFirst`, `roundTimeFast`, `roundTimeSlow`, `fotalFailForOne`, `fotalFailForTwo`, `lastGame`) VALUES ('NULL', $playersName, $dayScore, $dayScore, $biggestRound, $firsts, $roundTimeFast, $roundTimeSlow, $fotalFailForOne, $fotalFailForTwo, $data));

?>