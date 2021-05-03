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
// получить данные из базы
$result = mysqli_query($connect, "SELECT * FROM `maindata`");
$maindata = [];
$add_new;
// print_r($maindata->num_rows);
if ($result->num_rows > 0) {
    $add_new= true;
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "push all Data<br>";
        array_push($maindata, $row);
    }
  } else {
      echo "first players<br>";
    mysqli_query($connect,"INSERT INTO `maindata`(`id`, `playersName`, `globalScore`, `allTimeInGame`, `biggestRound`, `numOfFirst`, `roundTimeFast`, `roundTimeSlow`, `fotalFailForOne`, `fotalFailForTwo`, `lastGame`) VALUES  
    (NULL, '$playersName', '$dayScore', '$dayTime', '$biggestRound', '$firsts', '$roundTimeFast', '$roundTimeSlow', '$fotalFailForOne', '$fotalFailForTwo', '$data')");

  }
// проверка существование пользователя
foreach($maindata as $key) {
    if($key["playersName"] === $playersName) {
        echo "it is in base<br>";
        $add_new = false;
    }
}
if($add_new){
    echo "add new players in data<br>";
    mysqli_query($connect,"INSERT INTO `maindata`(`id`, `playersName`, `globalScore`, `allTimeInGame`, `biggestRound`, `numOfFirst`, `roundTimeFast`, `roundTimeSlow`, `fotalFailForOne`, `fotalFailForTwo`, `lastGame`) VALUES  
    (NULL, '$playersName', '$dayScore', '$dayTime', '$biggestRound', '$firsts', '$roundTimeFast', '$roundTimeSlow', '$fotalFailForOne', '$fotalFailForTwo', '$data')");
}

?>      