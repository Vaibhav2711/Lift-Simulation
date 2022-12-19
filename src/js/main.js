//Add new lift

const lifts = [];
const floors = [];
const buttons = [];
//const direction = {"Up":0,"Down":1};
const liftRequest = [];
//const lift = {};

const addLift = (numOfLifts = 2,numOfFloors = 3) =>{
	
    //buttons[0] = document.getElementById("btnSet");
	//lifts[0] = document.getElementById("set");
    //console.log("firstCll");
    const box = document.getElementById("set");
    //console.log(box);

    for(let j = 1;j<=numOfFloors;j++){
        const newFloor = document.createElement("div");
        newFloor.setAttribute("class","floor");
        newFloor.setAttribute("id","floorLayout");
        //newFloor.style.marginBottom = "50px";
        const buttonLayout = document.createElement("div");
        buttonLayout.setAttribute("class","btns");
        const levelNo = document.createElement("div");
        levelNo.setAttribute("class","level");
        levelNo.setAttribute("id",(j-1).toString());
		console.log(j);
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
        downButton.addEventListener("click",()=> startLift(z));
        buttonLayout.appendChild(levelNo);
        buttonLayout.appendChild(upDown);
        newFloor.appendChild(buttonLayout);
        const plan = document.getElementById("plan");
        buttons[j] = buttonLayout;
        plan.prepend(newFloor);
		floors[j-1] = newFloor;
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
        const box = document.createElement("div");
        box.setAttribute("class","sys");
        //console.log(box);
        box.appendChild(newLift);
        const plan = document.getElementById("plan").childNodes[numOfFloors-1];
        plan.appendChild(box);
        //console.log(plan);
        lifts.push(newLift);
        //console.log(lifts);
        //id = id+1;
        //console.log(id);
    }
    //console.log(lifts);	
};

addLift(1,6);


const startLift = (id) =>{
    //const allLifts = Array.from(document.querySelectorAll(".lift"));
    //liftRequest.push(id);
    let idleLift;
    if(lifts.find((lift) => lift.getAttribute("state") == "idle")){
        //console.log(freeLifts);
    //console.log(direction);
        idleLift = lifts.find((lift) => lift.getAttribute("state") == "idle");
        console.log(idleLift);
        //let liftNo = 0;
                //console.log(lifts[0].)
                //console.log(idleLift);
        
        if(idleLift.getAttribute("floor")== id.toString()){
            
        }
        let floorDistance = Number(idleLift.getAttribute("floor"))-id;
        let liftTime = -(floorDistance*2);
        console.log(liftTime);
        idleLift.style.transitionDuration = liftTime.toString()+"s";
        let distance = (150*(floorDistance+1)-(5*(floorDistance+2)));
        idleLift.setAttribute("state","busy");
        if(id == 0){
            idleLift.style.top = "0px";
        }else{
            console.log(distance);
            idleLift.style.top = distance.toString()+"px";
         }
         idleLift.setAttribute("state","busy");
         

    }
    else{
        liftRequest.push(id);
    }
    
        setTimeout(()=>{
                
                console.log(liftRequest);
                openDoors(idleLift);
                //if(liftRequest.length > 0){}
            },2000)
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
