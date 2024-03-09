//plyer.js:玩家类，负责管理玩家的分数、位置、速度、加速度等属性
class Player {
  constructor(x, y) {
    //位置
    this.x = x;
    this.y = y;
    //分数
    this.score = 0;
    //速度
    this.dx = 0;
    this.dy = 0;
    //加速度
    this.ddx = 0;
    this.ddy = 0;
    //体力
    this.energy = 10;
    //是否轮到抓球
    this.turn = false;
    //抓球状态
    this.catching = false;
    //角度
    this.angle = 0.5*Math.PI;
  }
  reset({x, y}) {
    this.x =x;
    this.y =y;
    this.score = 0;
    this.dx = 0;
    this.dy = 0;
    this.ddx = 0;
    this.ddy = 0;
    this.energy = 10;
    this.turn = false;
    this.catching = false;
    this.angle = 0.5*Math.PI;
  }
  //设定半径
  static radius = 200;
  //设定坐标
  setPosition({x, y}) {
    this.x = x;
    this.y = y;
  }
  //设定速度
  setSpeed({dx, dy}) {
    this.dx = dx;
    this.dy = dy;
  }
  //设定加速度
  setAcceleration({ddx, ddy}) {
    this.ddx = ddx;
    this.ddy = ddy;
  }
  // 移动玩家
  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.energy<= 10)this.energy+=0.01;
    else this.energy=10;
  }
  // 加速
  accelerate() {
    this.dx += this.ddx;
    this.dy += this.ddy;
    if (this.ddx!=0)this.energy-=0.03;
    if (this.ddy!=0)this.energy-=0.03;
  }
  
  // 改变玩家的分数
  addScore(points) {
    this.score += points;
  }
  // 改变玩家的体力
  changeEnergy(points) { 
    this.energy += points;
  } 
  //射球
  shootBall(ball, speed, angle) {
    this.catching = false;
    ball.shoot(angle,speed);
  }      
}
//创建玩家1实例
const player01 = new Player(300, 300);
var player1=document.getElementById("player1");
function player1move(){
    player01.move();
    player01.accelerate();
    player1.style.left=player01.x+"px";
    player1.style.top=player01.y+"px";
    //energy1.innerHTML=player01.energy;
}

//玩家1的行为
var player1mover=null;
var bounce1y=null;
var bounce1x=null;
function player1act(){
  player01.score=0;
  score1.innerHTML="score: "+player01.score;
  //玩家1反弹
  var flag1y=true;
  var flag1x=true;
  bounce1y=setInterval(function(){
    if(flag1y){
      if(player01.y<=0||player01.y>=563){
        player01.dy=-player01.dy;
        flag1y=false;
      }
    }else{
      if(player01.y>0&&player01.y<563){
        flag1y=true;
        }
    }},10);
    bounce1x=setInterval(function(){
    if(flag1x){
      if(player01.x<=5||player01.x>=675){
        player01.dx=-player01.dx;
        flag1x=false;
      }
    }else{
      if(player01.x>5&&player01.x<675){
        flag1x=true;
        }
    }},10);
  player1mover=setInterval(player1move,10);//刷新玩家1的位置
  //添加事件监听器(移动)
  document.addEventListener("keydown", function(event) {
    if(player01.energy>=1){
    switch (event.key) {
      case "e":player01.setAcceleration({ddx: 0, ddy: -0.01}); break;
      case "d":player01.setAcceleration({ddx: 0, ddy: 0.01}); break;
      case "s":player01.setAcceleration({ddx: -0.01, ddy: 0}); break;
      case "f":player01.setAcceleration({ddx: 0.01, ddy: 0}); break;
      default: break;
    }}else{
      player01.setAcceleration({ddx: 0, ddy: 0});
    }
  });
  document.addEventListener("keyup", function(event) {
    switch (event.key) {
      case "e":player01.setAcceleration({ddx: 0, ddy: 0}); break;
      case "d":player01.setAcceleration({ddx: 0, ddy: 0}); break;
      case "s":player01.setAcceleration({ddx: 0, ddy: 0}); break;
      case "f":player01.setAcceleration({ddx: 0, ddy: 0}); break;
      default: break;
    }
  });
  //添加事件监听器(角度)
  document.addEventListener("keydown", function(event) {
    if(player01.catching){
      switch (event.key) {
          case "y":player01.angle = 0.17*Math.PI; break;    
          case "u":player01.angle = 0.34*Math.PI; break;    
          case "i":player01.angle = 0.5*Math.PI; break;    
          case "o":player01.angle = 0.67*Math.PI; break;  
          case "p":player01.angle = 0.84*Math.PI; break;
          default: break;
      }
    }
  });
  //添加事件监听器(射击)
  document.addEventListener("keydown", function(event) {
    if(player01.catching){
      if (event.key === "j"||event.key=="k"||event.key=="l"){
          player01.turn = false;
          player02.turn = true;
          setTimeout(function(){
          if(player01.energy<=4||event.key=="j"){
              player01.shootBall(ball1, 0.5, player01.angle);
          }
          else{if(player01.energy<7||event.key=="k"){
              player01.shootBall(ball1, 0.8, player01.angle);
              player01.energy-=3;
          }
          else{
              player01.shootBall(ball1, 1.1, player01.angle);
              player01.energy-=6;
          }
        }},100);
      }   
    }
  }
  );
  //添加事件监听器(抓球)
  document.addEventListener("keydown", function(event) {
    if(player01.turn){
      if(event.key=="h"){
          //判断距离球的距离
          if(Math.sqrt((ball1.x-player01.x)**2+(ball1.y-player01.y)**2)<30){
              player01.catching = true;
              var catch1=setInterval(function(){
                  //让球随人移动
                  ball1.x=player01.x;
                  ball1.y=player01.y;
                  //改变球的速度
                  ball1.dx=player01.dx;
                  ball1.dy=player01.dy;
                  if(player01.turn==false)clearInterval(catch1); 
              },10);
          }
      }
    }
  });
}  

function player1actoff(){
  //清除事件监听器
  document.removeEventListener("keydown", function(event) {
    if(player01.energy>=1){
    switch (event.key) {
      case "e":player01.setAcceleration({ddx: 0, ddy: -0.01}); break;
      case "d":player01.setAcceleration({ddx: 0, ddy: 0.01}); break;
      case "s":player01.setAcceleration({ddx: -0.01, ddy: 0}); break;
      case "f":player01.setAcceleration({ddx: 0.01, ddy: 0}); break;
      default: break;
    }}else{
      player01.setAcceleration({ddx: 0, ddy: 0});
    }
  });
  document.removeEventListener("keyup", function(event) {
    switch (event.key) {
      case "e":player01.setAcceleration({ddx: 0, ddy: 0}); break;
      case "d":player01.setAcceleration({ddx: 0, ddy: 0}); break;
      case "s":player01.setAcceleration({ddx: 0, ddy: 0}); break;
      case "f":player01.setAcceleration({ddx: 0, ddy: 0}); break;
      default: break;
    }
  });
  document.removeEventListener("keydown", function(event) {
    if(player01.catching){
      switch (event.key) {
          case "y":player01.angle = 0.17*Math.PI; break;    
          case "u":player01.angle = 0.34*Math.PI; break;    
          case "i":player01.angle = 0.5*Math.PI; break;    
          case "o":player01.angle = 0.67*Math.PI; break;  
          case "p":player01.angle = 0.84*Math.PI; break;
          default: break;
      }
    }
  });
  document.removeEventListener("keydown", function(event) {
    if(player01.catching){
      if (event.key === "j"||event.key=="k"||event.key=="l"){
          player01.turn = false;
          player02.turn = true;
          setTimeout(function(){
          if(player01.energy<=4||event.key=="j"){
              player01.shootBall(ball1, 0.5, player01.angle);
          }
          else{if(player01.energy<7||event.key=="k"){
              player01.shootBall(ball1, 0.8, player01.angle);
              player01.energy-=3;
          }
          else{
              player01.shootBall(ball1, 1.1, player01.angle);
              player01.energy-=6;
          }
        }},100);
      }   
    }
  }
  );
  document.removeEventListener("keydown", function(event) {
    if(player01.turn){
      if(event.key=="h"){
          //判断距离球的距离
          if(Math.sqrt((ball1.x-player01.x)**2+(ball1.y-player01.y)**2)<30){
              player01.catching = true;
              var catch1=setInterval(function(){
                  //让球随人移动
                  ball1.x=player01.x;
                  ball1.y=player01.y;
                  //改变球的速度
                  ball1.dx=player01.dx;
                  ball1.dy=player01.dy;
                  if(player01.turn==false)clearInterval(catch1); 
              },10);
          }
      }
    }
  });
  //清除定时器
  clearInterval(player1mover);
  clearInterval(bounce1y);
  clearInterval(bounce1x);
  //玩家一初始化
  player01.reset({x:300,y:300});
}


 //创建玩家2实例
 const player02 = new Player(900, 300);
 var player2=document.getElementById("player2");
 player02.angle = -0.5*Math.PI;
 function player2move(){
     player02.move();  
     player02.accelerate();
     player2.style.left=player02.x+"px";
     player2.style.top=player02.y+"px";
     //energy2.innerHTML=player02.energy;
 }
//玩家2的行为
var player2mover=null;
var bounce2y=null;
var bounce2x=null;
function player2act(){
 player02.score=0;
 score2.innerHTML="score: "+player02.score;
 console.log(player02.score);
//玩家2反弹
var flag2y=true;
var flag2x=true;
  bounce2y=setInterval(function(){
    if(flag2y){
      if(player02.y<=0||player02.y>=563){
        player02.dy=-player02.dy;
        flag2y=false;
      }
    }else{
      if(player02.y>0&&player02.y<563){
        flag2y=true;
        }
    }},10);
  bounce2x=setInterval(function(){
    if(flag2x){
      if(player02.x<=700||player02.x>=1375){
        player02.dx=-player02.dx;
        flag2x=false;
      }
    }else{
      if(player02.x>700&&player02.x<1375){
        flag2x=true;
        }
    }},10);
  player2mover=setInterval(player2move,10);//刷新玩家2的位置 
  //添加事件监听器(移动)
  document.addEventListener("keydown", function(event) {
    if(player02.energy>=1){
    switch (event.key) {
      case "ArrowUp":player02.setAcceleration({ddx: 0, ddy: -0.01}); break;
      case "ArrowRight":player02.setAcceleration({ddx: 0.01, ddy: 0}); break;
      case "ArrowDown":player02.setAcceleration({ddx: 0, ddy: 0.01}); break;
      case "ArrowLeft":player02.setAcceleration({ddx: -0.01, ddy: 0}); break;
      default: break;
    }}else{
      player02.setAcceleration({ddx: 0, ddy: 0});
    }
  });
  document.addEventListener("keyup", function(event) {
    switch (event.key) {
      case "ArrowUp":player02.setAcceleration({ddx: 0, ddy: 0}); break;
      case "ArrowRight":player02.setAcceleration({ddx: 0, ddy: 0}); break;
      case "ArrowDown":player02.setAcceleration({ddx: 0, ddy: 0}); break;
      case "ArrowLeft":player02.setAcceleration({ddx: 0, ddy: 0}); break;
      default: break;
    }

  });
  //添加事件监听器(角度)
  document.addEventListener("keydown", function(event) {
    if(player02.catching){
      switch (event.key) {
          case "1":player02.angle = -0.17*Math.PI; break;    
          case "2":player02.angle = -0.34*Math.PI; break;    
          case "3":player02.angle = -0.5*Math.PI; break;    
          case "4":player02.angle = -0.67*Math.PI; break;  
          case "5":player02.angle = -0.84*Math.PI; break;
          default: break;
      }
    }
  });
  //添加事件监听器(射击)
  document.addEventListener("keydown", function(event) {
    if(player02.catching){
      if (event.key === "7"||event.key=="8"||event.key=="9"){
          player02.turn = false;
          player01.turn = true;
          setTimeout(function(){
          if(player02.energy<4||event.key=="7"){
              player02.shootBall(ball1, 0.5, player02.angle);
          }
          else{if(player02.energy<7||event.key=="8"){
              player02.shootBall(ball1, 0.8, player02.angle);
              player02.energy-=3
          }
          else{
              player02.shootBall(ball1, 1.1, player02.angle);
              player02.energy-=6
          }
        }},100);
      }   
    }
  }
  );
  //添加事件监听器(抓球)
  document.addEventListener("keydown", function(event) {
    if(player02.turn){
      if(event.key=="0"){
          //判断距离球的距离
          if(Math.sqrt((ball1.x-player02.x)**2+(ball1.y-player02.y)**2)<30){
              player02.catching = true;
              var catch2=setInterval(function(){
                  //让球随人移动
                  ball1.x=player02.x;
                  ball1.y=player02.y;
                  //改变球的速度
                  ball1.dx=player02.dx;
                  ball1.dy=player02.dy;
                  if(player02.turn==false)clearInterval(catch2); 
              },10);
          }
      }
    }
  });
} 
function player2actoff()
{
  //清除事件监听器
  document.addEventListener("keyup", function(event) {
    switch (event.key) {
      case "ArrowUp":player02.setAcceleration({ddx: 0, ddy: 0}); break;
      case "ArrowRight":player02.setAcceleration({ddx: 0, ddy: 0}); break;
      case "ArrowDown":player02.setAcceleration({ddx: 0, ddy: 0}); break;
      case "ArrowLeft":player02.setAcceleration({ddx: 0, ddy: 0}); break;
      default: break;
    }
  });
  document.addEventListener("keyup", function(event) {
    if(player02.catching){
      switch (event.key) {
          case "1":player02.angle = -0.17*Math.PI; break;    
          case "2":player02.angle = -0.34*Math.PI; break;    
          case "3":player02.angle = -0.5*Math.PI; break;    
          case "4":player02.angle = -0.67*Math.PI; break;  
          case "5":player02.angle = -0.84*Math.PI; break;
          default: break;
      }
    }
  });
  document.addEventListener("keyup", function(event) {
    if(player02.catching){
      if (event.key === "7"||event.key=="8"||event.key=="9"){  
          player02.turn = false;
          player01.turn = true;
          setTimeout(function(){  
          if(player02.energy<4||event.key=="7"){
              player02.shootBall(ball1, 0.5, player02.angle);
          }
          else{if(player02.energy<7||event.key=="8"){  
              player02.shootBall(ball1, 0.8, player02.angle);
              player02.energy-=3;
          }
          else{   
              player02.shootBall(ball1, 1.1, player02.angle);
              player02.energy-=6;
          }
        }},100);
        }   
    }
  });
  //清除定时器
  clearInterval(player2mover);
  clearInterval(bounce2y);
  clearInterval(bounce2x);
  //玩家二初始化
  player02.reset({x:900,y:300});
  player02.angle = -0.5*Math.PI;
}  
  







