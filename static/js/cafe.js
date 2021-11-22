var scrollOngoing = false;
let fetchingimage = false;
let prevScrollY = 0;
let newOpacity = 0.1;
var backgroundImages = [];
const background = document.getElementsByClassName('background-image')[0].firstElementChild;
getImage('coffee', 1);
const navBar = document.getElementsByClassName('navigation')[0];

function getImage(usedFor, number){
    if(!fetchingimage){
        fetchingimage = true;
        fetch(`http://127.0.0.1:5000/picture/${usedFor}${number}.jpg`)
        .then(res => res.blob())
        .then(result => {
            image = URL.createObjectURL(result);
            background.src = image;
            backgroundImages.push(image);
        })
        .catch(err => console.log(err));
    } else {
        setTimeout(()=>{
            fetchingimage = false;
        }, 500);
    }
}


document.getElementsByTagName('body')[0].onscroll = (e) => {
    if(Math.abs(window.scrollY - prevScrollY) > 60 && !scrollOngoing){
        scrollOngoing = true;
        // To get the height in vh we get the total screen length and the current Y Scroll position.
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var scrollY = window.scrollY;
        prevScrollY = scrollY;
        var screenHeight = scrollY/h;
        navBar.style.opacity = Math.ceil(screenHeight*10)/10;
        if(navBar.style.opacity > 0.4){
            navBar.style.display = "block";
        } else {
            navBar.style.display = "none";
        }
        const elem = document.querySelector(".background-image");
        const height = Math.ceil(screenHeight);
        if (backgroundImages.length >= height){
            elem.lastElementChild.src = backgroundImages[height - 1];
        } else {
            getImage('coffee', height);
        }
        scrollOngoing = false;
    }
};

var container = document.getElementsByClassName('items-container')[0];
var numMenuGrps = container.childElementCount;
var menuGrps = document.getElementsByClassName("items");
Array.from(menuGrps).forEach(element => {
    if (numMenuGrps <= 4){
        element.style.width = "50%";
    } else if (numMenuGrps <= 6) {
        element.style.width = "30%";
    } else {
        element.style.width = "25%";
    }
});
