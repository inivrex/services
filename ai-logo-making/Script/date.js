

function changeTime() {
    let Fulldate = new Date;
    let date = Fulldate.getDate();
    let month = Fulldate.getMonth() + 1;
    let year = Fulldate.getFullYear();
    let hours = Fulldate.getHours();
    let minutes = Fulldate.getMinutes();
    let seconds = Fulldate.getSeconds();
    let FinalDate = `${date}-${month}-${year}`;
    let FinalTime = `${hours}-${minutes}-${seconds}`;
    dateIn.value = FinalDate;
    TimeIn.value = FinalTime;
}

//Adding Date and time when someone submit query.
setInterval(() => {
    changeTime();
}, 1000);