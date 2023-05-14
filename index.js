//variables
let gridLength=2;
let currentColor='#111111';
let currentMode;
const array=[0,1,2,3,4,5,6,7,8,9,'A','B','c','d','e','f'];

//Dom varaibles 
let sizeSlider=document.getElementById('range-ip');
let grid=document.getElementById('grid');
let color =document.getElementById('color');
let colorMode=document.getElementById('mode');
let rainbowMode=document.getElementById('rainbow');
let eraserMode=document.getElementById('eraser');
let clear=document.getElementById('clear');

//events
color.onchange=(e)=>setColor(e.target.value);
sizeSlider.onchange=(e)=>myRange(e.target.value);

colorMode.onclick=()=>updateMode('color');
rainbowMode.onclick=()=>updateMode('rainbow');
eraserMode.onclick=()=>updateMode('eraser');
clear.onclick=()=>clearAndUpdate();


// methods
draw();//initial method;
//method =>to draw on the grid 
function draw(){
    let frame=document.getElementsByClassName('box');
    console.log(currentColor+" "+frame.length);
    for (let i = 0; i < frame.length; i++) {
        frame[i].addEventListener("mouseover", updateColor);
        }
}
function setSize(value){
   gridLength=value;
}
function setColor(colorValue)
{  
    currentColor=colorValue;
}
//update range.size,and update grid frames
function myRange(value){
    document.getElementById('grid-size').textContent=`${value}x${value}`;
    setSize(value);//method for update the grid size;
    clearGrid();//method to clear.
    updateGridFrames(value); // method to upgrade.  
}
function clearGrid(){
    grid.replaceChildren();//remove every children of the particular element.
}
function updateGridFrames(value)
{
    grid.style.gridTemplateColumns=`repeat(${value},1fr)`;
    grid.style.gridTemplateRows=`repeat(${value},1fr)`;
    for(let i=0;i<value*value;i++)
    {
        const frame=document.createElement('div');//create new element.
        frame.classList.add('box');//add class to created element.
        grid.appendChild(frame);//appemd element to grid. 
    }
    draw();
}
function clearAndUpdate(){
    updateMode('clear');
    clearGrid();
    updateGridFrames(gridLength);
}
function updateColor()
{
    if(currentMode=='color')
    {
        this.style.backgroundColor=currentColor;  
    }  
    else if(currentMode=='rainbow')
    {
        this.style.backgroundColor=createRainbowColor();
    }
    else if(currentMode=='eraser')
    {
        this.style.backgroundColor='#ffffff';
    }     
     
}
function updateMode(mode)
{
    if(mode==currentMode)
    {
      removeMode();
      currentMode=undefined;
      return;
    }
    else if(mode=='color')
    {
        colorMode.classList.add('select');
    }
    else if(mode=='rainbow')
    {
        rainbowMode.classList.add('select');
    }
    else if(mode=='eraser')
    {
        eraserMode.classList.add('select');
    }
    else if(mode=="clear")
    {
        clear.classList.add('select');
    }
    removeMode();
    currentMode=mode;
}
function removeMode()
{   
    if(currentMode==undefined)
    {
        return;
    }
    else if(currentMode=='color')
    {
        colorMode.classList.remove('select');
    }
    else if(currentMode=='rainbow')
    {
        rainbowMode.classList.remove('select');
    }
    else if(currentMode=='eraser')
    {
        eraserMode.classList.remove('select');
    }
    else if(currentMode=='clear')
    {
        clear.classList.remove('select');
    }
}
function createRainbowColor()
{
    let hexcolor='#'
    for(i=0;i<6;i++)
    {
        hexcolor+=array[Math.floor(Math.random()*array.length)]
    }
    return hexcolor;
}