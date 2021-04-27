<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css.css">
    <title>Play tennis</title>
</head>
<body>
    <div class="whoPlay">
        <p>Кто играет? (два игрока)</p>
        <div class="player" id="Dima">Дима</div>
        <div class="player" id="Leonid">Леонид</div>
        <div class="player" id="Hilda">Хильда</div>
        <div class="player" id="Papa">Папа</div>
        <div class="player" id="Maksim">Максим</div>
        <div class="player" id="Mama">Мама</div>
        <div class="btns">
            <button class="nextFirst">вперед</button>
        </div>
    </div>
    <div class="whoIsFirst">
        <!-- <p>Кто первый?</p> -->
        <div class="mainPlace">
            <div class="mainPlace_block globalTime">
            </div>
            <div class="mainPlace_block globalFullScore">
                
            </div>
        </div>
        <div class="chooseFirst">

        </div>
        <div class="btns">
            <button class="prev">
            Назад</button>
            <button class="next">Вперед</button>
        </div>
    </div>
    <div class="playSpace">
        <div class="general">
            <div class="time-game">00 : 00</div>
        </div>
        <div class="generalscore">
            <div class="scorePart">
                <div class="whoIsWho"></div>
                <div class="globalScore"></div>
                <div class="block firstPlayer"></div>
                <div class="block secondPlayer"></div>
            </div>
        </div>

        <div class="btnwins">

        </div>
    </div>
    <div class="winnermessage">
        <div class="wrap">
            <p class="GameTime">Time of game ...</p>
            <p class="winnerIs">winner is ...</p>
            <p class="totalScore">total score is ...</p>
            <div class="btns">
                <button class="return-in-game">Вернуться</button>
                <button class="repeat">Продолжить</button>
            </div>
    
        </div>
    </div>
    <script src="js.js"></script>
</body>
</html>
<?php 

?>