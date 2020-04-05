var socket;

function setup() {
    createCanvas(500,500);
    background(0);
    fill('red')
    rect(0,0,50,50);
    fill(0);
    textSize(18);
    textAlign(CENTER);
    text("CLR", 25,30)
    socket = io.connect('https://d76c6db9.ngrok.io')
    socket.on('mouse', newDrawing);
    socket.on('clear', clearBoard);
}

function clearBoard(){
    console.log()
    clear();
    background(0);
    fill('red')
    rect(0,0,50,50);
    fill(0);
    textSize(18);
    textAlign(CENTER);
    text("CLR", 25,30)
}

function newDrawing(data){
    noStroke();
    fill(185);
    ellipse(data.x, data.y, 15,15);
}


function mouseDragged(){
    noStroke();
    fill(255);
    if(mouseX > 50 || mouseY > 50){
        ellipse(mouseX, mouseY, 15,15);
    }
    

    //how to send message out to server
    var data = {
        x: mouseX,
        y: mouseY,
    }
    socket.emit('mouse', data);
    console.log("Sending..."  + data);
}

function mousePressed(){
    if(mouseX > 0 && mouseX < 50 && mouseY > 0 && mouseY < 50){
        socket.emit('clear');
    }
}


function draw() {
    
}