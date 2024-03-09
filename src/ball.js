//ball.js: 球类，包括位置，速度，大小，颜色，碰撞检测，发射，射击

class Ball {
  constructor(x, y, dx, dy) {
    //坐标
    this.x = x;
    this.y = y;
    //速度
    this.dx = dx;
    this.dy = dy;
    //图像
    this.img = new Image();
    this.img.src = "../public/logo192.png";
  }
  //坐标获取与设定
  get position() {
    return { x: this.x, y: this.y };
  }
  set position({ x, y }) {
    this.x = x;
    this.y = y;
  }
  //速度获取与设定
  get velocity() {
    return { dx: this.dx, dy: this.dy };
  }
  set velocity({ dx, dy }) {
    this.dx = dx;
    this.dy = dy;
  }
  
  //半径
  static radius =400;
  /*draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }*/
  //移动
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
  //位置
  setPosition({ x, y }) {
    this.x = x;
    this.y = y;
  }
  //速度
  setVelocity({ dx, dy }) {
    this.dx = dx;
    this.dy = dy;
  }
  //碰撞检测
  collidesWith(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    return (distance < radius + other.radius);
  }
  //射击
  shoot(angle, speed) {
    this.dx += speed * Math.sin(angle);
    this.dy -= speed * Math.cos(angle);
  }
  //反弹
  bounce() {
    if (this.y<=25||this.y>=563)this.dy=-this.dy;
  }
  //初始化
  init() {
    this.x = 700;
    this.y = 294;
    this.dx = 0;
    this.dy = 0;
    console.log("初始化");
  } 
}

//球的实例化
var flag=true;
const ball1 = new Ball(700, 294, 0, 0);
var ball=document.getElementById("ball");
function move(){
  ball1.update();
  ball.style.left=ball1.x+"px";
  ball.style.top=ball1.y+"px";
}
//反弹
setInterval(function(){
  if(flag){
    if(ball1.y<=25||ball1.y>=563){
      ball1.dy=-ball1.dy;
      flag=false;
      console.log("反弹");
    }
  }else{
    if(ball1.y>25&&ball1.y<563){
      flag=true;
      }
  };
},10);
setInterval(move,10);//刷新球的位置

