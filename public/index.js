var ws = new WebSocket("ws://127.0.0.1:3001/"); 
window.onload=function(){
    let tyt = new TYTGame();
   
    let send = document.getElementById('send');
    send.onclick=function(){
        tyt.sendClick();
    }
    // 获取点击坐标

    let tytphoto = document.querySelector("#tyt-photo");
    tytphoto.onmousedown=function(e){
        tyt.setXY({'x':e.clientX,'y':e.clientY});
        let XYstyle = `
                width:20px;
                height:20px;
                border-radius: 50%;
                background-color: red;
                position: fixed;
                font-size:12px;
                text-align:center;
                line-height:20px;
                cursor:pointer;
                left:${e.clientX-7}px;
                top:${e.clientY-7}px;
            `;  
        if(tyt.tytxy.length==1){
            let quan = document.createElement('div');
            quan.innerText='始';
            quan.style=XYstyle;
            this.appendChild(quan);
            document.getElementById('tytx').innerHTML='('+tyt.tytxy[0].x+','+tyt.tytxy[0].y+')';
        }else if(tyt.tytxy.length==2){
            let quan = document.createElement('div');
            quan.innerText='终';
            quan.style=XYstyle;
            this.appendChild(quan);
            document.getElementById('tyty').innerHTML='('+tyt.tytxy[1].x+','+tyt.tytxy[1].y+')';


            document.getElementById('tytj').innerHTML=tyt.getxyj();
        }
        
        
    }

}

let TYTGame = function(){
    this.tytxy=[];
}
TYTGame.prototype.setXY=function(xy){
    if(this.tytxy.length<=1){
        this.tytxy.push(xy);
    }
};
TYTGame.prototype.getxyj=function(){
    let x = Math.abs(this.tytxy[0].x*4-this.tytxy[1].x*4);
    let y = Math.abs(this.tytxy[0].y*4-this.tytxy[1].y*4);
    return Math.floor(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)));
};
TYTGame.prototype.sendClick=function(){
    console.log('发送点击事件');
    let time =this.getxyj()+200;
    ws.send(`{'type':'send','x':200,'y':300,'time':${time}}`);  
}
  
ws.onopen = function() {    
   console.log("连接设备成功");    
   ws.send("{'type':'init'}");    
};
ws.onmessage = function (evt) {     
    let message = eval('(' + evt.data + ')');
    switch (message.type){
        case 'send':
            document.getElementById("tyt-photo").innerHTML = `<img src='photo/4.png?v=${ Date.parse( new Date())}' />`;   
        break;
    } 
};    
      
ws.onclose = function() {    
    console.log("Closed");    
};    
      
ws.onerror = function(err) {    
    console.log("Error: " + err);    
};