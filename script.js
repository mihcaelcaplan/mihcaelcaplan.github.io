var ctx;

window.onload = ()=>{
    ctx = document.querySelector("canvas").getContext("2d");

    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);

    //start a path on load
    ctx.beginPath();
    ctx.moveTo(0,0);
}

var n = 0;
setInterval(()=>{
    console.log(n,n)
    ctx.lineTo(n, n)
    ctx.stroke()
    n++

}, 33)



// //vars
// n = 0; 
// backwards = 0;
// alpha_lower_bound = 0
// alpha_upper_bound = 0.15
// //color
// r = 50
// g = 50
// b = 50
// setInterval(()=>{
//     console.log(n)
//     if(backwards == 0  & n < alpha_upper_bound){
//         n+=0.001
//     }
//     else if( backwards==0 & n>=alpha_upper_bound){
//         backwards=1;
//     }
//     if (backwards == 1 & n > alpha_lower_bound ){
//         n-=0.001;
//     }
//     else if(backwards==1 & n<=alpha_lower_bound){
//         backwards = 0;
//     }
    
//     // document.querySelector(".project_list").style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${n})`; 
//     // // document.querySelector(".project_list").style.box-shadow = `5px 5px 5px 5px rgba(${r}, ${g}, ${b}, ${n});`; 

// }, 33)



