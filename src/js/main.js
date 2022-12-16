//Add new lift

const lifts = [];
const floors = [];
const buttons = [];
const direction = {"Up":0,"Down":1};
const liftRequest = [];
//const lift = {};

const addLift = (numOfLifts = 2,numOfFloors = 3) =>{
	
	
	
	//buttons[0] = document.getElementById("btnSet");
	//lifts[0] = document.getElementById("set");
    //console.log("firstCll");
    const box = document.getElementById("set");
    //console.log(box);

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
        console.log(newLift);
        const box = document.getElementById("set");
        //console.log(box);
        box.appendChild(newLift);	
        lifts.push(newLift);
        //console.log(lifts);
        //id = id+1;
        //console.log(id);
    }

    for(let j = 1;j<=numOfFloors;j++){
        const newFloor = document.createElement("div");
        newFloor.setAttribute("class","floor");
        let spacing = 150*j;
        let floorSpacing = "-"+spacing.toString()+"px";
        //console.log(floorSpacing);
        newFloor.style.top = floorSpacing;
        const plan = document.getElementById("plan");
        plan.appendChild(newFloor);
		floors[j-1] = newFloor;
    }

    //console.log(lifts);

	for(let z = 0;z<=numOfFloors;z++){
		const buttonLayout = document.createElement("div");
        buttonLayout.setAttribute("class","btns");
        const levelNo = document.createElement("div");
        levelNo.setAttribute("class","level");
        levelNo.setAttribute("id",z.toString());
		//console.log(z);
        levelNo.innerHTML = "Floor "+(z).toString();
        const upButton = document.createElement("button");
        upButton.setAttribute("class","up");
        upButton.setAttribute("id",z.toString());
        upButton.addEventListener("click",()=> startLift(z));
        //upButton.setAttribute("onclick","buttonClick(this.className,this.id);this.onclick=null;")   ;
		upButton.innerHTML = "UP";
        //console.log(upButton);
        const downButton = document.createElement("button");
        downButton.setAttribute("class","down");
		downButton.innerHTML = "DOWN";
        downButton.addEventListener("click",()=> startLift(z));
        buttonLayout.appendChild(levelNo);
        buttonLayout.appendChild(upButton);
        buttonLayout.appendChild(downButton);
        let buttonSpacing = 400-(70*(z-1));
        let layoutSpacing = buttonSpacing.toString()+"px";
		//console.log(layoutSpacing);
        buttonLayout.style.top = layoutSpacing;
		buttons[z] = buttonLayout;
        const plan1 = document.getElementById("floorLevel");
        //console.lo
        //plan1.appendChild(newFloor);
        plan1.insertBefore(buttonLayout,plan1.children[0]);
	}
	//console.log(lifts[3]);
	//console.log(floors);
	//console.log(buttons);
};

addLift(2,6);


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
        idleLift.style.transitionDuration = "2s";
        if(idleLift.getAttribute("floor")== id.toString()){
            
        }
        let floorDistance = Number(idleLift.getAttribute("floor"))-id;
        let distance = (150*floorDistance+(5*(Number(id)+1)));
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
        lift.setAttribute("state","idle");
        if(liftRequest.length > 0){
            startLift(liftRequest[0]);
            liftRequest.shift();
        }
    },2000)
}


//Track of up down button
//Track of which floor the button was pressed
//Track of the lift