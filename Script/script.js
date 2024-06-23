//Global Variables Here
const smallProjects = document.getElementById("smallProjects");
const NavMoreLnkBtn = document.getElementById("NavMoreLnkBtn");
const MoreNavWin = document.getElementById("MoreNavWin");
const MoreNavMWin = document.getElementById("MoreNavMWin");
const dateIn = document.getElementById("dateIn");
const TimeIn = document.getElementById("TimeIn");
const section = document.querySelector("section");
const navlinks = document.getElementsByClassName("navlinks");


section.addEventListener("click", () => {
    MoreNavMWin.style.display = "none";
    MoreNavWin.style.height = "0rem";
})
for (let i = 0; i < navlinks.length; i++) {
    navlinks[i].addEventListener("click", () => {
        MoreNavMWin.style.display = "none";
        MoreNavWin.style.height = "0rem";
    })

}
NavMoreLnkBtn.addEventListener("click", () => {
    if (MoreNavWin.style.height != "10rem") {
        MoreNavWin.style.height = "10rem";
        MoreNavMWin.style.display = "flex";
    } else {
        MoreNavMWin.style.display = "none";
        MoreNavWin.style.height = "0rem";
    }
})
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

//Remove the id name from url when someone click on nav links

for (let i = 0; i < navlinks.length; i++) {
    navlinks[i].addEventListener("click", () => {
        window.addEventListener("hashchange", () => window.history.pushState({}, "", '/'), {});
    });
};

//Adding Date and time when someone submit query.
setInterval(() => {
    changeTime();
}, 1000);