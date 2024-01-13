const selectMenu = document.querySelectorAll('select'),
currentTime = document.querySelector('h1'),
content = document.querySelector('.content'),
setAlarmBtn = document.querySelector('button');

let alarmTime, isAlarmSet = false,
ringTone = new Audio("../Audio/IphoneRingtone.mp3");

function optionsRendering(){
    selectMenu[0].innerHTML = selectMenu[1].innerHTML = selectMenu[2].innerHTML = "";
    selectMenu[0].innerHTML = `<option value="Hour" selected disabled hidden>Hour</option>`;
    for(let i = 12; i > 0; i--){
        i = i < 10 ? "0" + i : i;
        let option = `<option value="${i}"> ${i} </option>`;
        selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
    };

    selectMenu[1].innerHTML = `<option value="Minute" selected disabled hidden>Minute</option>`;
    for(let i = 59; i >= 0; i--){
        i = i < 10 ? "0" + i : i;
        let option = `<option value="${i}"> ${i} </option>`;
        selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
    };

    selectMenu[2].innerHTML = `<option value="AM/PM" selected disabled hidden>AM/PM</option>`;
    for(let i = 2; i > 0; i--){
        let AM_PM = i === 1 ? "AM" : "PM";
        let option = `<option value="${AM_PM}"> ${AM_PM} </option>`;
        selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
    };
};
optionsRendering();

function timeRendering(){
    setInterval(() => {
        // getting hour, minute, second.
        let date = new Date(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        AM_PM = "AM";
    
        if(hour > 12){
            hour -= 12;
            AM_PM = "PM";
        };
        // if hour value is 0, set this value to 12
        hour = hour === 0 ? hour = 12 : hour;
        // adding 0 before hour, minute, second if this value is less than 10.
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        currentTime.innerText = `${hour}:${minute}:${second} ${AM_PM}`;
        
        if(alarmTime === `${hour}:${minute} ${AM_PM}`){
            ringTone.play();
            ringTone.loop = true;
        };
    }, 1000);
};
timeRendering();

function setAlarm(){
    if(isAlarmSet){ // if is alarmTime is True;
        alarmTime = ''; // clear the value of alarmTime;
        ringTone.pause(); // pause the ringTone;
        content.classList.remove('disable');
        setAlarmBtn.innerText = "Set Alarm";
        isAlarmSet = false; // return is alarm set value to false;
        return optionsRendering();
    };

    // getting hour, minute and AM_PM select tag value.
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')){
        return alert('Enter your goal time please.');
    };
    alarmTime = time;
    isAlarmSet = true;
    content.classList.add('disable');
    setAlarmBtn.innerText = "Clear Alarm";
};
setAlarmBtn.addEventListener('click', setAlarm);

setAlarmBtn.addEventListener("click", (Event) => {
    console.log(Event);
});