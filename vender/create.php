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
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        array_push($maindata, $row);
    }
} else {
    add_new($connect, $playersName, $dayScore, $dayTime, $biggestRound, $firsts, $roundTimeFast, $roundTimeSlow, $fotalFailForOne, $fotalFailForTwo, $data);
}

// проверка существование пользователя
foreach($maindata as $key) {
    if($key["playersName"] === $playersName) {
        // echo $key["playersName"]."  is in base<br>";
        print_r($key);
        
        echo "<br>";
        $new_globalScore = explode_string($dayScore, $key['globalScore']);
        $new_allTimeInGame = $dayTime + $key['allTimeInGame'];
        $new_numOfFirst = explode_string($firsts, $key['numOfFirst']);
        $lastGame = $data;

        mysqli_query($connect, 
        "UPDATE `maindata` SET 
        `globalScore` = '$new_globalScore', `allTimeInGame` = '$new_allTimeInGame', `numOfFirst` = '$new_numOfFirst' 
        WHERE `playersName` = '$playersName'");
    }
}

function explode_string($new, $old) {
    $n_a = explode(":", $new);
    $o_b = explode(":", $old);
    return ($n_a[0]+$o_b[0])." : ".($n_a[1]+$o_b[1]);

}
function add_new($c, $p, $ds, $dt, $br, $f, $rtf, $rts, $fffo, $ffft, $da) {
    mysqli_query($c, "INSERT INTO `maindata`(`id`, `playersName`, `globalScore`, `allTimeInGame`, `biggestRound`, `numOfFirst`, `roundTimeFast`, `roundTimeSlow`, `fotalFailForOne`, `fotalFailForTwo`, `lastGame`) 
    VALUES (NULL, '$p', '$ds', '$dt', '$br', '$f', '$rtf', '$rts', '$fffo', '$ffft', '$da')");
}




?>      