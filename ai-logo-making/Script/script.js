//Global Variables Here
const smallProjects = document.getElementById("smallProjects");
const NavMoreLnkBtn = document.getElementById("NavMoreLnkBtn");
const MoreNavWin = document.getElementById("MoreNavWin");
const AFterSub = document.getElementById("AFterSub");
const MoreNavMWin = document.getElementById("MoreNavMWin");
const dateIn = document.getElementById("dateIn");
const TimeIn = document.getElementById("TimeIn");
const formParent = document.getElementById("formParent");
const FilThisFormHead = document.getElementById("FilThisFormHead");
const plansSectionPrnt = document.getElementById("plansSectionPrnt");
const ThnkSubCusOrder = document.getElementById('ThnkSubCusOrder');
const section = document.querySelector("section");
const navlinks = document.getElementsByClassName("navlinks");
const hiddenExtra = document.getElementsByClassName("hiddenExtra");
const LoadingWin = document.getElementById('LoadingWin');


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

//Remove the id name from url when someone click on nav links

for (let i = 0; i < navlinks.length; i++) {
    navlinks[i].addEventListener("click", () => {
        window.addEventListener("hashchange", () => window.history.pushState({}, "", '/'), {});
    });
};



// Scroll Navigation Show 
// window.addEventListener('scroll', function () {

//     MoreNavMWin.style.display = "none";
//     MoreNavWin.style.height = "0rem";
//     var navbar = document.querySelector('nav');
//     var navbarHeight = navbar.offsetHeight;

//     if (window.pageYOffset >= navbarHeight + 100) {
//         navbar.classList.add('fixed');
//         MoreNavWin.style.position = 'fixed';
//         MoreNavWin.style.zIndex = '120';
//         MoreNavWin.style.top = '3.7rem';
//         document.body.style.marginTop = '8rem';
//     } else {
//         navbar.classList.remove('fixed');
//         MoreNavWin.style.position = 'absolute';
//         document.body.style.marginTop = '0rem';
//         document.body.style.transition = '0s';
//     }
// });


//Move effect 
document.addEventListener('DOMContentLoaded', function () {
    var elements = document.querySelectorAll('.scroll-animate');

    function checkVisibility() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        elements.forEach(function (element) {
            var rect = element.getBoundingClientRect();
            if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0) {
                element.classList.add('visible');
            }
        });

        // Reset elements if scroll offset is 0
        if (scrollTop === 1) {
            elements.forEach(function (element) {
                element.classList.remove('visible');
                // Trigger reflow to restart animation
                void element.offsetWidth;
            });
        }
    }

    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Initial check
    checkVisibility();
});

// Function to show dialog and return a promise
let DiaBtns = document.getElementsByClassName("DiaBtns");
function showDialogue(diaText, btn1Text = 'Cancel', btn2Text = 'Ok') {
    // Set dialog text and button texts
    document.getElementById("Dialoguetext").innerText = diaText;
    document.getElementById("button1Text").innerText = btn1Text;
    document.getElementById("button2Text").innerText = btn2Text;

    // Show dialog
    dialogueBoxPrnt.style.display = "flex";
    setTimeout(() => {
        dialogueBoxPrnt.style.opacity = '1';
        mainWindDialo.style.opacity = '1';
        mainWindDialo.style.transform = 'scale(1)';
        document.body.classList.add('no-scroll');
    }, 50);

    // Return a promise that resolves with the button click value
    return new Promise((resolve) => {
        // Add click event listeners to buttons
        DiaBtns[0].addEventListener("click", () => {
            resolve(false); // Button 1 clicked, return false
            closeDialog();
        }, { once: true });
        DiaBtns[1].addEventListener("click", () => {
            resolve(true); // Button 2 clicked, return true
            closeDialog();
        }, { once: true });
    });
}

// Function to close dialog
function closeDialog() {
    mainWindDialo.style.opacity = '0';
    mainWindDialo.style.transform = 'scale(0.7)';
    dialogueBoxPrnt.style.opacity = '0';
    setTimeout(() => {

        dialogueBoxPrnt.style.display = "none";
        document.body.classList.remove('no-scroll');
    }, 300);
}

function successfullSubDeta() {
    LoadingWin.style.display = 'none';
    ThnkSubCusOrder.style.display = 'flex';
    setTimeout(() => {
        ThnkSubCusOrder.style.display = 'none';
        formParent.innerHTML = "";
        document.body.classList.remove('no-scroll');
    }, 5000);
}
