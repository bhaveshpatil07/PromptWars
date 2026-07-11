export function calculateRisk(weather:any){


let score=0;


if(weather.rain>5){
    score+=40;
}


if(weather.humidity>80){
    score+=20;
}


if(weather.temperature<20){
    score+=10;
}



let level="LOW";


if(score>=60){
    level="HIGH";
}
else if(score>=30){
    level="MEDIUM";
}


return {

score,

level

};

}