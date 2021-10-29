let star_svg = `


<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="transparent" stroke="yellow" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
`;let bad_svg = `

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orangered" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-slash"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
`; let Y = 5;
let X = 10;
let score = 0;
let reward_count = 1;
let container = document.createElement("div");
container.classList.add('game-container')

for (i = 0; i <= Y; i++) {
  let flex = document.createElement("div");
  flex.classList.add('game-container-row');

  for (j = 0; j <= X; j++) {
    let box = document.createElement("div");
    box.classList.add('box')
    box.setAttribute("data-y", i);
    box.setAttribute("data-x", j);
    box.classList.add("box");
    flex.appendChild(box);
  }
  container.appendChild(flex);
}
document.body.appendChild(container);
UpdateScore =  (animate = false)=>{
  document.querySelector('.score').textContent = score;
if(animate){
  document.querySelector('.score').classList.add('animate__rotateInDownRight')
  setTimeout(()=>{
    document.querySelector('.score').classList.remove('animate__rotateInDownRight')
  },1000)
}

}
DrawRewards = (count)=>{
  

  let rewards = count || 20;
  for(t= 0 ; t<= rewards ; t++){
    
  let random_x = (Math.random() * 10).toFixed();
  let random_y = (Math.random() * 10).toFixed();
  
  let random_box = document.querySelector(`[data-x='${random_x}'][data-y='${random_y}']`)
  
  try{
   if(!random_box.classList.contains('current-box') && !random_box.classList.contains('bad-reward-box')){
    random_box.classList.add('reward-box')
    random_box.innerHTML = star_svg;
    anime({
      targets: 'svg path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInQuart',
      duration: 800,
     
      delay: 0,
      loop: false
    });
   }
    
  }catch{
    throw new Error('s')
  }
  }

}

DrawBadRewards = (count)=>{
  

  let rewards = count || 5;
  for(t= 0 ; t<= rewards ; t++){
    
  let random_x = (Math.random() * 10).toFixed();
  let random_y = (Math.random() * 10).toFixed();
  
  let random_box = document.querySelector(`[data-x='${random_x}'][data-y='${random_y}']`)
  console.log(random_box)
if(random_box){
  if(!random_box.classList.contains('current-box')){
    random_box.classList.add('bad-reward-box');
    random_box.innerHTML=bad_svg;
    anime({
      targets: 'svg line , svg circle',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInQuart',
      duration: 800,
      delay: 200,
      loop: false
    });
   }
}
  }

}
DrawBadRewards();
ShowGameOver = ()=>{
  document.querySelector('.instructions').remove();
  document.querySelector('.score__').remove()
  document.querySelector('div').innerHTML=`
  <div class='text-center'>
  <h1 class='animate__animated animate__fadeIn'>إنتهت اللعبة</h1>
  <span class='animate__animated animate__fadeInDown animate__faster' >عدد نقاطك :
  ${score}</span>
  <button onclick='location.reload()' class='play-again-button'>حاول مرة أخرى</button>
  </div>
  `;
}

Move =  (x, y) => {
 
  document.querySelectorAll(".box").forEach((box) => {
    box.classList.remove('current-box')
  });
  let currentBox = document.querySelector(
    `[data-x='${x}'][data-y='${y}']`
  );
  if(currentBox.classList.contains('bad-reward-box')){
   
    var scoreEl = document.querySelector('.score');

    var scoreJson = {
     score:score
    }
    
    anime({
      targets: scoreJson,
      score:score-4,
      round: 1,
      easing: 'linear',
     
  duration: 700,
      update: function() {
        scoreEl.innerHTML = scoreJson.score
        scoreEl.style.color = 'orangered'
      }
      ,
      complete:function(){
        scoreEl.style.color = 'white'
      }
    });
   score-=4;
 
   if(score < 0 || score == 0){
     score = 0;
    ShowGameOver()
   }
  }
  if(currentBox.classList.contains('reward-box')){


    score+=reward_count;
    ///

    //
    currentBox.innerHTML='';
    currentBox.classList.remove('reward-box')
  
 
 
     UpdateScore(true);
    
   
  }
  currentBox.classList.add('current-box')
  
   
  
   UpdateScore();

};
let x = y = 0;
RemoveOldBox = (x,y)=>{
  document.querySelector(
    `[data-x='${x}'][data-y='${y}']`
  ).classList.remove('current-box')
}
Move(x, y);
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      RemoveOldBox(x,y);
      x += 1;
      if(x > X){
        x=0;
      }
   

      Move(x, y);
    
      break;
    case "ArrowRight":
      RemoveOldBox(x,y);
      x -= 1;
      if(x<0){
        x= X;
      }
      Move(x, y);
    
      break;
    case "ArrowDown":
      RemoveOldBox(x,y);
      y += 1;
      if(y > Y){
        y=0;
      }
   
      Move(x, y);
      
      break;
    case "ArrowUp":
      RemoveOldBox(x,y);
      y -= 1;
      if(y<0){
        y= Y;
      }
      Move(x, y);
    
      break;
    case "Enter":
     
      DrawRewards();
      DrawBadRewards(4);
      

      break;
      case "Escape": 
      ShowGameOver();
      break;
  }
});
window.onload = ()=>{
  DrawBadRewards();
  DrawRewards();
  
}


