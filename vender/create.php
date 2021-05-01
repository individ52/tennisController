<?php

require('config/connect.php');

// $list = json_decode($_POST);
$list = json_decode(file_get_contents('php://input'), true);


$playersName     = $list["OneP"]." : ".$list["TwoP"];
$dayScore        = $list["dayScore"];
$dayTime         = $list["dayTime"];
$biggestRound    = $list["biggestRound"];
$firsts          = $list["firsts"];
$roundTimeFast   = $list["roundTimeFast"];
$roundTimeSlow   = $list["roundTimeSlow"];
$fotalFailForOne = $list["fotalFailForOne"];
$fotalFailForTwo = $list["fotalFailForTwo"];
$data            = $list["data"];
echo "<pre>";
mysqli_query($connect, "INSERT INTO `maindata` 
(`id`, `playersName`, `globalScore`, `allTimeInGame`, `biggestRound`, `numOfFirst`, `roundTimeFast`, `roundTimeSlow`, `fotalFailForOne`, `fotalFailForTwo`, `lastGame`) VALUES 
(NULL, '$playersName', '$dayScore', '$dayTime', '$biggestRound', '$firsts', '$roundTimeFast', '$roundTimeSlow', '$fotalFailForOne', '$fotalFailForTwo', '$data')");


?>  