//Add new lift

const lifts = [];
const floors = [];
const buttons = [];
//const direction = {"Up":0,"Down":1};
const liftRequest = [];
let liftTime;
//const lift = {};

let inputsSection = document.getElementById("inputSection");
let enteredFloor = document.getElementById("enterFloors");
let floorValue = enteredFloor.value;
let enteredLift = document.getElementById("enterLifts");
let liftValue = enteredLift.value;
let startBtn = document.getElementById("generateBtn");
let topBtn = document.getElementById("top-btn");
let action = document.getElementById("action");
let reset = document.getElementById("reset");
let back = document.getElementById("back"); 

const box = document.createElement("div");
box.setAttribute("class","liftWrapper");
box.setAttribute("id","lifts");

back.addEventListener("click",(e) =>{
    e.preventDefault();
    /*let plan = document.getElementById("plan");
    let child = plan.lastElementChild;
    let lift = box.lastChild;
    //console.log(lift); 
    while (child) {
        plan.removeChild(child);
        child = plan.lastElementChild;
    }
    while(lift){
        box.removeChild(lift);
        lift = box.lastChild;
    }
    console.log(plan);
    action.style.display = "none";
    inputsSection.style.display = "flex";*/
    location.reload();
});

reset.addEventListener("click",(e) => {
    e.preventDefault();
    let child = box.childNodes; 
    console.log(child);
    for(let i = 0;i<child.length;i++) {
        child[i].style.transitionDuration = "0s"
        child[i].style.top = "0px";
    }
});

startBtn.addEventListener("click",(e) => {
    e.preventDefault();
    //console.log("yo");
    //console.log(liftValue);
    //floorValue = Number(enteredFloor.value);
    //liftValue = Number(enteredLift.value);

    console.log(window.innerWidth);

    if (window.innerWidth <= 500 && lifts > 2) {
        alert("This screen size can't have more than 2 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 768 && liftValue > 4) {
        alert("This screen size can't have more than 4 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 1024 && liftValue > 6) {
        alert("This screen size can't have more than 7 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 1440 && liftValue > 10) {
        alert("This screen size can't have more than 10 lifts");
    }
    else if (window.innerWidth > 500 && window.innerWidth <= 2560 && liftValue > 19) {
        alert("This screen size can't have more than 19 lifts");
    }else{
        addLift(liftValue,floorValue);
        action.style.display = "flex";
        inputsSection.style.display = "none";
    }
    
    //console.log(box);

})

enteredFloor.addEventListener("change",(e) => {
    //console.log(e);
    floorValue = e.target.value;
})

enteredLift.addEventListener("change",(e) => {
    liftValue = e.target.value;
})

const addLift = (numOfLifts,numOfFloors) =>{
	
    //buttons[0] = document.getElementById("btnSet");
	//lifts[0] = document.getElementById("set");
    //console.log("firstCll");
    //const box = document.getElementById("set");
    //console.log("box");
    //console.log(numOfLifts);
    for(let j = 1;j<=numOfFloors;j++){
        //console.log("34");
        const newFloor = document.createElement("div");
        newFloor.setAttribute("class","floor");
        newFloor.setAttribute("id","floorLayout");
        //newFloor.style.marginBottom = "50px";
        const buttonLayout = document.createElement("div");
        buttonLayout.setAttribute("class","btns");
        const levelNo = document.createElement("div");
        levelNo.setAttribute("class","level");
        levelNo.setAttribute("id",(j-1).toString());
		//console.log(j);
        levelNo.innerHTML = "Floor "+(j).toString();
        const upButton = document.createElement("button");
        upButton.setAttribute("class","up");
        upButton.setAttribute("id",j.toString());
        upButton.addEventListener("click",()=> startLift(j));
        //upButton.setAttribute("onclick","buttonClick(this.className,this.id);this.onclick=null;")   ;
		upButton.innerHTML = "UP";
        //console.log(upButton);
        const downButton = document.createElement("button");
        downButton.setAttribute("class","down");
		downButton.innerHTML = "DOWN";
        const upDown = document.createElement("div");
        upDown.setAttribute("class","upDown");
        upDown.appendChild(upButton);
        upDown.appendChild(downButton);
        downButton.addEventListener("click",()=> startLift(j));
        buttonLayout.appendChild(levelNo);
        buttonLayout.appendChild(upDown);
        newFloor.appendChild(buttonLayout);
        const plan = document.getElementById("plan");
        buttons[j] = buttonLayout;
        plan.prepend(newFloor);
		floors[j-1] = newFloor;
        //console.log("plan");
    }

    for(let i = 0;i<numOfLifts;i++){
        //let id = 1;
        let newLift = document.createElement("div");
        const leftDoor = document.createElement("div");
        const rightDoor = document.createElement("div");
        leftDoor.setAttribute("class","left");
        rightDoor.setAttribute("class","right");
        newLift.setAttribute("class","lift");
        newLift.setAttribute("id",i.toString());
        newLift.setAttribute("state","idle");
        newLift.setAttribute("floor","0");
        newLift.appendChild(leftDoor);
        newLift.appendChild(rightDoor);
        //let liftPosition = 
        //newLift.style.top = 
        
        //console.log(box);
        box.appendChild(newLift);
        
        //console.log(plan);
        lifts.push(newLift);
        //console.log(lifts);
        //id = id+1;
        //console.log(id);
    }
    //const box = document.getElementById("lifts")
    //console.log(box);
    const plan = document.getElementById("plan").childNodes[numOfFloors-1];
    plan.appendChild(box);
    //console.log(lifts);	
};

//addLift(3,10);


const startLift = (id) =>{
    //const allLifts = Array.from(document.querySelectorAll(".lift"));
    //liftRequest.push(id);
    //console.log("fire");
    let idleLift;
    //console.log("160");
    if(lifts.find((lift) => lift.getAttribute("state") == "idle")){
    //    console.log("162");
    //console.log(direction);
        idleLift = lifts.find((lift) => lift.getAttribute("state") == "idle");
    //    console.log(idleLift);
        //let liftNo = 0;
                //console.log(lifts[0].)
                //console.log(idleLift);
        
        if(idleLift.getAttribute("floor")== id.toString()){
            openDoors(idleLift);
            return;
        }
        let floorDistance = Number(idleLift.getAttribute("floor"))-id;
        //console.log(floorDistance);
        liftTime = -(floorDistance*2);
        //console.log(liftTime);
        idleLift.style.transitionDuration = liftTime.toString()+"s";
        let distance = (150*(floorDistance+1)+(5*(floorDistance+1)));
        idleLift.setAttribute("state","busy");
        if(id == 0){
            idleLift.style.top = "0px";
        }else{
        //    console.log(distance);
            idleLift.style.top = distance.toString()+"px";
         }
         idleLift.setAttribute("state","busy");
         

    }
    else{
        liftRequest.push(id);
    }
    
        setTimeout(()=>{
                
        //        console.log(liftRequest);
                openDoors(idleLift);
                //if(liftRequest.length > 0){}
            },liftTime*1000)
};

const openDoors = (lift) =>{
    const left = lift.childNodes[0];
    const right = lift.childNodes[1];
    left.style.transform = `translate(-25px,0px)`;
    left.style.transitionDuration = "2.5s";
    right.style.transform = `translate(25px,0px)`;
    right.style.transitionDuration = "2.5s";
    setTimeout(()=>{
        left.style.transform = `translate(0px,0px)`;
        left.style.transitionDuration = "2.5s";
        right.style.transform = `translate(0px,0px)`;
        right.style.transitionDuration = "2.5s";
    },2500)
    setTimeout(()=>{
        lift.setAttribute("state","idle");
        if(liftRequest.length > 0){
            startLift(liftRequest[0]);
            liftRequest.shift();
        }
    },5000)
};
