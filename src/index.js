//球的初始化
ball1.init();
function setball(){
    var randomX = Math.floor(Math.random() * 400) + 100;
if(randomX%2){
    player01.turn=false;
    player02.turn=true;
    ball1.dx=0.5;
}else{
    player01.turn=true;
    player02.turn=false;
    ball1.dx=-0.5;
}
var energy1=document.getElementById("player1energy");
var energy2=document.getElementById("player2energy");
var score1=document.getElementById("player1score");
var score2=document.getElementById("player2score");
}

//进球
function ballin(){
    energy1.innerHTML="energy: "+player01.energy;
    energy2.innerHTML="energy: "+player02.energy;
    //玩家1输球
    if (ball1.x <3) {
        player02.score++;
        score2.innerHTML="score: "+player02.score;
        player01.turn=true;
        player02.turn=false;
        player01.catching=true;
        player02.catching=false;
        var shooted=false;
        var catch1=setInterval(function(){
            //让球随人移动
            ball1.x=player01.x;
            ball1.y=player01.y;
            //改变球的速度
            ball1.dx=player01.dx;
            ball1.dy=player01.dy;
            if(player01.turn==false){
                shooted=true;
                clearInterval(catch1);
            } 
        },10);
        setTimeout(function(){
            if(shooted==false){
                player01.turn = false;
                player02.turn = true;
                player01.shootBall(ball1, 0.5, player01.angle);
                clearInterval(catch1);
            }
        },3000);
    }
    //玩家2输球
    else if (ball1.x > 1395) {
        player01.score++;
        score1.innerHTML="score: "+player01.score;
        player01.turn=false;
        player02.turn=true;
        player02.catching=false;
        player02.catching=true;
        var shooted=false;
        var catch2=setInterval(function(){
            //让球随人移动
            ball1.x=player02.x;
            ball1.y=player02.y;
            //改变球的速度
            ball1.dx=player02.dx;
            ball1.dy=player02.dy;
            if(player02.turn==false){
                shooted=true;
                clearInterval(catch2);
            } 
        },10);
        setTimeout(function(){
            if(shooted==false){
                player01.turn = true;
                player02.turn = false;
                player02.shootBall(ball1, 0.5, player01.angle);
                clearInterval(catch2);
            }
        },3000);
    }

}
//计时器
var time=0;
var timecounter=null;
function settime(){
var timer=document.getElementById("timer");
    time=0;
    timecounter=setInterval(function(){
    time++;
    timer.innerHTML="time: "+time;
},1000);
}
function settimeoff(){
    clearInterval(timecounter);
}
//开始游戏
var identifierer=null;
var balliner=null;
function begingame(){
    settime();
    player1act();
    player2act();
    setball();
    document.body.removeChild(gameoverer);
    //移除开始事件监听器
    document.getElementById("start").removeEventListener("click",begingame);
    //添加进球与游戏结束事件监听器
    document.getElementById("gameover").addEventListener("click",gameover);
    identifierer=setInterval(identify,1000);
    balliner=setInterval(ballin,100);
}
//开始监听器
var begin=document.getElementById("start").addEventListener("click",begingame);
//游戏结束
  //游戏结束的判定
  function identify(){
        if(player01.score==5 || player02.score==5||time>180)gameover();
    }
  //游戏结束的处理
  var gameoverer=document.createElement("div");
    gameoverer.innerHTML="Click to start!";
    gameoverer.style.position="absolute";
    gameoverer.style.top="50%";
    gameoverer.style.left="50%";
    gameoverer.style.transform="translate(-50%,-50%)";
    gameoverer.style.textAlign="center";
    gameoverer.style.color="black";
    gameoverer.style.fontSize="100px";
    document.body.appendChild(gameoverer);
  function gameover(){
    console.log("gameover");
    ball1.init();
    clearInterval(identifierer);
    clearInterval(balliner);
    settimeoff();
    document.getElementById("gameover").removeEventListener("click",gameover);
    document.getElementById("start").addEventListener("click",begingame);
    var result;
    if(player01.score>player02.score){
        result="Player 1 wins!";
    }else if(player02.score>player01.score){
        result="Player 2 wins!";
    }else{
        result="It's a tie!";
    }
    gameoverer.innerHTML=result;
    document.body.appendChild(gameoverer);
    player1actoff();
    player2actoff();
  }
        