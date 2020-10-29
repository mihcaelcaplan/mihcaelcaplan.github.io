//nice delicious globals
var ctx;
var win_width;
var win_length;
var R1;
var R2;

class rect {
    constructor (color){
        
        this.color = color;
        this.right = getRandomInt(0,1);
        this.up = getRandomInt(0,1);
        this.x = getRandomInt(20, 80);
        this.y = getRandomInt(20, 80);
        this.width = getRandomInt(50, 200);
        this.height = getRandomInt(50, 200);
        
    }
    draw = ()=>{
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    clear = ()=>{
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    moveV = (step)=>{
        this.clear()
        this.y += step;
        this.draw()
    }

    moveH = (step)=>{
        this.clear()
        this.x += step;
        this.draw()
    }
}
  

//helpful functions 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//run when page loads 
window.onload = ()=>{
    ctx = document.querySelector("canvas").getContext("2d");
    ctx.globalAlpha = 0.1;

    //get window size 
    win_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    win_height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    console.log(`window width: ${win_width} height: ${win_height}`)
    R1 = new rect('green');
    R2 = new rect('red');
    R1.draw();
    R2.draw();
}

// //interval funcs
// setInterval(()=>{
//     stepV = .1;
//     stepH = 0.005;

//     R1.moveV(stepV);

//     // for(r in rect_l){
//     //     r.moveV(stepV);
//     //     r.moveH(stepH);
//     // }

// }, 33)