window.addEventListener('DOMContentLoaded', function() {
    
    let whoPlay = document.querySelector('.whoPlay'),
        whoIsFirst = document.querySelector('.whoIsFirst'),
        playSpace = document.querySelector('.playSpace'),
        winnermessage = document.querySelector('.winnermessage'),
        players = whoPlay.querySelectorAll('.player'),
        chooseFirst = document.querySelector('.chooseFirst'),
        whoseStep = document.querySelector('.whoseStep'),
        btnwins =  document.querySelector('.btnwins'),
        globalScore = document.querySelector('.globalScore'),
        whoIsWho = document.querySelector('.whoIsWho'),
        totalFP = document.querySelector('.firstPlayer'),
        totalSP = document.querySelector('.secondPlayer'),
        restart = document.querySelector('.repeat'),
        timeGame = document.querySelector('.time-game'),
        contDayTime = document.querySelector('.globalTime');
    // totalwins.style.display = "none";

    whoIsFirst.style.display = 'none';
    playSpace.style.display = 'none';
    winnermessage.style.display = 'none';

    let currentScore = {};
    let totalScore = {};
    let steps = [whoPlay, whoIsFirst, playSpace];
    let sum = 0;
    let intervalGame;
    let gameTimeSec;
    let oldVer;
    let dayTime = 0;
    let today = getDay();
    let dataForSend = {
        data: today,
        OneP: "", // done
        TwoP: "", // done
        dayTime: 0, // done
        roundTimeFast: 0, 
        roundTimeSlow: 0, 
        firsts: "", // done
        fotalFailForOne: "", //фотальный для первого означает, что он ПРОИГРАЛ с большим разбросом
        fotalFailForTwo: "", 
        biggestRound: "", // done
        dayScore: "",
    };
    // получить имя игроков
    players.forEach(item => {
        item.addEventListener('click', () => {
            // получить имя игрока из блока
            let playerName = item.innerHTML;
            if(Object.keys(currentScore).length < 2 || item.classList.contains('playerChoosen')) {
                if(item.classList.contains('playerChoosen')) {
                    for (let prop in currentScore) {
                        if(prop === playerName) delete currentScore[prop]; 
                    }
                    item.classList.remove('playerChoosen');
                } else {
                    currentScore[playerName] = 0;
                    item.classList.add('playerChoosen');
                }
            } else {
                alert('Только 2 игрока!');
            }
        });
    });
    // переход на выбор первого игрока 
    whoPlay.querySelector('.nextFirst').addEventListener('click', ()=> {
        if(Object.keys(currentScore).length < 2) {
            alert("Выбери двух игроков!");
        } else {
            // 00:00
            console.log(currentScore);
            document.querySelector('.globalTime').textContent = "00:00";
            document.querySelector('.globalFullScore').textContent = Object.keys(currentScore)[0][0]+" 0 : 0 "+Object.keys(currentScore)[1][0];
            // показать поля для выбора первого игрока
            steps[0].style.display = "none";
            steps[1].style.display = "block";
            // создать блоки, чтобы выбрать ПИ
            for (let prop in currentScore) {
                let block = document.createElement('div');
                    block.classList.add('player');
                    block.textContent = prop;
                    chooseFirst.appendChild(block);
            }
            // выбор первого игрока
            let playersForGame = chooseFirst.querySelectorAll('.player');
            playersForGame.forEach(item => {
                item.addEventListener('click', ()=> {
                    playersForGame.forEach(i => i.classList.remove('playerChoosen'));
                    item.classList.add('playerChoosen');
                    currentScore["firstPlayer"] = item.innerHTML;
                    playersForGame.forEach(i => {if (i.innerHTML != currentScore["firstPlayer"]) currentScore["secondPlayer"] = i.innerHTML;});
                });
            });
        }
    });
    // вернуться к выбору игроков
    whoIsFirst.querySelector('.prev').addEventListener('click', ()=> {
        steps[1].style.display = "none";
        steps[0].style.display = "block";
        chooseFirst.querySelectorAll('div').forEach(item => item.remove());
        delete currentScore["firstPlayer"];
        delete currentScore["secondPlayer"]; 
    });
    // начать игру
    whoIsFirst.querySelector('.next').addEventListener('click', ()=> {  
        if(Object.keys(currentScore).length === 4) {
            // 00:00
            timeGame.textContent = "00:00";
            // добавитеь первого и второго игрока во временную базу
            if(Object.keys(currentScore)[0] > Object.keys(currentScore)[1]) {
                dataForSend["OneP"] = Object.keys(currentScore)[0];
                dataForSend["TwoP"] = Object.keys(currentScore)[1];
            } else {
                dataForSend["OneP"] = Object.keys(currentScore)[1];
                dataForSend["TwoP"] = Object.keys(currentScore)[0];

            };
            // кто сколько раз был первым?
            if(dataForSend["firsts"]) {
                let bigArr = dataForSend["firsts"].split(':');
                let one = Number(bigArr[0]);
                let two = Number(bigArr[1]);
                (dataForSend["OneP"] == currentScore["firstPlayer"]) ? one += 1 : two += 1;
                dataForSend['firsts'] = one +" : "+two;
            } else {
                let one = (dataForSend["OneP"] == currentScore["firstPlayer"]) ? 1 : 0;
                let two = (dataForSend["TwoP"] == currentScore["firstPlayer"]) ? 1 : 0;
                dataForSend['firsts'] = one +" : "+two;
            }
            // переключить в игровой режим
            steps[1].style.display = "none";
            steps[2].style.display = "block";
            // вывести имена участников
            whoIsWho.textContent = Object.keys(currentScore)[0] + " vs " + Object.keys(currentScore)[1]; 
            // вывести счет участников
            globalScore.textContent = currentScore[Object.keys(currentScore)[0]] + " : " + currentScore[Object.keys(currentScore)[1]];
            if(!totalScore[Object.keys(currentScore)[0]]) totalScore[Object.keys(currentScore)[0]] = 0; 
            if(!totalScore[Object.keys(currentScore)[1]]) totalScore[Object.keys(currentScore)[1]] = 0;
            oldVer = Object.assign({}, totalScore);
            totalFP.textContent = totalScore[Object.keys(totalScore)[0]];
            totalSP.textContent = totalScore[Object.keys(totalScore)[1]];
            createBlockScore(Object.keys(currentScore)[0], (Object.keys(currentScore)[0] == currentScore["firstPlayer"]) ? true : false);
            createBlockScore(Object.keys(currentScore)[1], (Object.keys(currentScore)[1] == currentScore["firstPlayer"]) ? true : false);
            // время игры
            gameTimeSec = 0;
            intervalGame = setInterval(()=> {
                gameTimeSec += 1;
                let minCont = Math.trunc(gameTimeSec / 60);
                let secCont = gameTimeSec % 60;
                timeGame.textContent = ((minCont <= 9) ? "0" + minCont : minCont) + " : " + ((secCont <= 9) ? "0" + secCont : secCont);
            }, 1000);
        } else {
            alert("Выберите первого игрока!");            
        }
    });
    // изменнить currentScore
    btnwins.addEventListener('click', (e)=> {
        let target = e.target;
        if(target.classList.contains('btnwin') || target.parentNode.classList.contains('btnwin')) {
            // проверка на + или -
            if(target.classList.contains('minus')) {
                minusScore(target.parentNode);
            } else {
                (target.classList.contains('btnwin')) ? changeScore(target) : changeScore(target.parentNode);
            }
            // провека чей ход
            if(sum != 0 && sum != 1) {
                // если четное, то первый 
                if(Math.trunc(sum/2) % 2 == 0 ) {
                    btnwins.querySelectorAll('.btnwin').forEach(item => {
                        // (item.classList.contains('stroke')) ? item.classList.remove('stroke') : item.classList.add('stroke');
                        (item.querySelector('.btnwinName').innerHTML === currentScore['firstPlayer']) ? item.classList.add('stroke') : item.classList.remove('stroke'); 
                    });
                } 
                // если нечетное, то второй
                else if(Math.trunc(sum/2) % 2 == 1) {
                    btnwins.querySelectorAll('.btnwin').forEach(item => {
                        // (item.classList.contains('stroke')) ? item.classList.remove('stroke') : item.classList.add('stroke');
                        (item.querySelector('.btnwinName').innerHTML === currentScore['secondPlayer']) ? item.classList.add('stroke') : item.classList.remove('stroke'); 
                    });
                }
            } 
            else {
                btnwins.querySelectorAll('.btnwin').forEach(item => {
                    // (item.classList.contains('stroke')) ? item.classList.remove('stroke') : item.classList.add('stroke');
                    (item.querySelector('.btnwinName').innerHTML === currentScore['firstPlayer']) ? item.classList.add('stroke') : item.classList.remove('stroke'); 
                });
                
            }

            let FP = Object.keys(currentScore)[0];
            let SP = Object.keys(currentScore)[1];

            // проверка на выйгрыш
            if(sum >= 20) {
                if(currentScore[FP] + 2 == currentScore[SP] || currentScore[SP] + 2 == currentScore[FP]) {
                    finish();
                }
            } else {
                if(currentScore[FP] === 11 && currentScore[SP] < 10) {
                    finish();
                }
                if(currentScore[SP] === 11 && currentScore[FP] < 10) {
                    finish();
                }
            }
            
            function finish() {
                let winner = (currentScore[FP] > currentScore[SP]) ? FP : SP;
                (currentScore[FP] > currentScore[SP]) ? totalScore[FP] += 1 : totalScore[SP] += 1;
                clearInterval(intervalGame);
                winnermessage.style.display = 'block';
                let min = Math.trunc(gameTimeSec / 60);
                winnermessage.querySelector('.GameTime').textContent = "Время игры " + ((min <= 9) ? "0"+ min : min) + " : " +  ((gameTimeSec % 60 <= 9) ? "0"+(gameTimeSec % 60 ) : (gameTimeSec % 60 ));
                winnermessage.querySelector('.winnerIs').textContent = "Победил " + winner;
                winnermessage.querySelector('.totalScore').textContent = totalScore[FP] + " : " + totalScore[SP];
            }
            
        } 
    });
    // начать новый раунт
    restart.addEventListener('click', ()=> {   
        winnermessage.style.display = 'none';
        playSpace.style.display = 'none';
        whoIsFirst.style.display = 'block';
        // время добавить
        dayTime += gameTimeSec;
        let sec = dayTime % 60;
        let min = Math.trunc(dayTime / 60);
        let hour = Math.trunc(dayTime / 3600);
        contDayTime.textContent = ((hour <= 9) ? "0"+hour : hour) + " : " + ((min <= 9) ? "0"+min : min) + " : " + ((sec <= 9) ? "0"+sec : sec); 
        console.log(totalScore);
        document.querySelector('.globalFullScore').textContent = `${Object.keys(totalScore)[0][0]} ${totalScore[Object.keys(totalScore)[0]]} : ${totalScore[Object.keys(totalScore)[1]]}  ${Object.keys(totalScore)[1][0]} `;
        // добавить данные в dataForSend
        ChangeSendObj();
        // сбросить данные
        currentScore[Object.keys(currentScore)[0]] = 0;
        currentScore[Object.keys(currentScore)[1]] = 0;
        oldVer = Object.assign({}, totalScore);
        document.querySelectorAll('.btnwin').forEach(item => item.remove());
        // 
        console.log(dataForSend);
        startQuery();
    });
    // вернуться в игру
    document.querySelector('.return-in-game').addEventListener("click", () => {
        winnermessage.style.display = 'none';
        intervalGame = setInterval(()=> {
            gameTimeSec += 1;
            let minCont = Math.trunc(gameTimeSec/60);
            let secCont = gameTimeSec % 60;
            timeGame.textContent = ((minCont <= 9) ? "0" + minCont : minCont) + " : " + ((secCont <= 9) ? "0" + secCont : secCont);
        }, 1000);
        totalScore = Object.assign({}, oldVer);
    });
    function createBlockScore(item, first = false) {
        let block = document.createElement('div');
        block.classList.add('btnwin');
        if(first) block.classList.add('stroke');
        let p = document.createElement('p');
        // if(first) p.textContent = "Сейчас ходит";
        let name = document.createElement('div');
        name.classList.add('btnwinName');
        name.textContent = item;
        let num = document.createElement('div');
        num.classList.add('score');
        num.textContent = 0;
        let min = document.createElement('div');
        min.classList.add('minus');
        min.textContent = "-";
        block.appendChild(p);
        block.appendChild(name);
        block.appendChild(num);
        block.appendChild(min);
        btnwins.appendChild(block);
    }
    function changeScore(target) {
        let playerTarget = target.querySelector('.btnwinName').innerHTML;
        currentScore[playerTarget] += 1; 
        let playerScore = target.querySelector('.score');
        playerScore.textContent = currentScore[playerTarget];
        sum = currentScore[Object.keys(currentScore)[0]] + currentScore[Object.keys(currentScore)[1]];
        globalScore.textContent = currentScore[Object.keys(currentScore)[0]] + " : " + currentScore[Object.keys(currentScore)[1]];

    }
    function minusScore(node) {
        let playerTarget = node.querySelector('.btnwinName').innerHTML;
        if(currentScore[playerTarget] > 0) currentScore[playerTarget] -= 1; 
        let playerScore = node.querySelector('.score');
        playerScore.textContent = currentScore[playerTarget];
        sum = currentScore[Object.keys(currentScore)[0]] + currentScore[Object.keys(currentScore)[1]];
        globalScore.textContent = currentScore[Object.keys(currentScore)[0]] + " : " + currentScore[Object.keys(currentScore)[1]];
    }
    function ChangeSendObj() {
        let nameOne = dataForSend["OneP"];
        let nameTwo = dataForSend["TwoP"];
        // Все время за день
        dataForSend["dayTime"] = dayTime;
        // Самая быстрая/долгая игра 
        dataForSend["roundTimeFast"] = (dataForSend["roundTimeFast"] < gameTimeSec && dataForSend["roundTimeFast"] != 0) ? dataForSend["roundTimeFast"] : gameTimeSec;
        dataForSend["roundTimeSlow"] = (dataForSend["roundTimeSlow"] > gameTimeSec && dataForSend["roundTimeSlow"] != 0) ? dataForSend["roundTimeSlow"] : gameTimeSec;
        // Наибольший раунд
        if(dataForSend["biggestRound"]) {
            let bigArr = dataForSend["biggestRound"].split(":");
            let oldsum =Number(bigArr[0]) + Number(bigArr[1]); 
            if(sum > oldsum) {
                dataForSend["biggestRound"] = currentScore[nameOne] + " : " + currentScore[nameTwo];
            }
        } else {
            dataForSend["biggestRound"] = currentScore[nameOne] + " : " + currentScore[nameTwo];
        }
        // общий счет за день
        dataForSend["dayScore"] = totalScore[nameOne] + " : " + totalScore[nameTwo]; 
        // Обсолютный провал
        let curOne = currentScore[nameOne];
        let curTwo = currentScore[nameTwo];
        if(curOne > curTwo) {
            // фотальный счет для второго (второй проиграл)
            changeLoser("fotalFailForTwo");
        } else {
            // фотальный счет для первого (первый проиграл)
            changeLoser("fotalFailForOne");
        }
        function changeLoser(loser) {
            if(dataForSend[loser]) {
                let bigArr = dataForSend[loser].split(":");
                let olddifference = Math.abs(bigArr[0]-bigArr[1]);
                let newdifference = Math.abs(currentScore[nameOne] - currentScore[nameTwo]);
                if(newdifference > olddifference) {
                    dataForSend[loser] = currentScore[nameOne] + " : " + currentScore[nameTwo];
                }
            } else {
                dataForSend[loser] = currentScore[nameOne] + " : " + currentScore[nameTwo];
            }
        }

    }
    function getDay() {
        let data = new Date();
        let day = (data.getDate() <=9) ? "0"+data.getDate() : data.getDate();
        let month = ((data.getMonth()+1) <=9) ? "0"+(data.getMonth()+1) : (data.getMonth()+1);
        let year = data.getFullYear();
        return day+"."+month+"."+year;
    }

    function startQuery() {
        let xhr = new XMLHttpRequest();

        let formData = JSON.stringify(dataForSend);
        xhr.open("POST", "vender/create.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(formData);
        xhr.onreadystatechange = ()=> {
            if(xhr.readyState === 4 && xhr.status === 200) {
                console.log('All is ok!');
            }
        }
    }
});