var scrollOngoing = false;
let fetchingimage = false;
let prevScrollY = 0;
var backgroundImages = [];
let shouldScroll = false;
let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

document.addEventListener('DOMContentLoaded', (ev)=>{
    for (var i=1; i<=3; ++i){
        fetchImage('coffee', i).then((blob) => {
            let objectURL = URL.createObjectURL(blob);
            backgroundImages.push(objectURL);
            if (i != 3 && !shouldScroll){
                shouldScroll = true;
            }
        }).catch(e => {
            console.log(e);
        });
    }
});

const navBar = document.getElementsByClassName('navigation')[0];
let sections = document.getElementsByTagName("section");
const background = document.getElementsByClassName('background-image')[0];

window.addEventListener('load', (ev)=>{
    console.log(shouldScroll);
    if (shouldScroll == true) {
        setTimeout(()=>{
            Array.from(sections).forEach((element, index)=>{
                const rect = element.getBoundingClientRect();
                if (rect.bottom < 0) {
                    console.log("Hello from grp-1");
                    return;
                } else if((rect.top <= (h/2-100) && rect.top >= 0) || (rect.top < 0 && rect.bottom >h/2)){
                    console.log("Hello");
                    background.firstElementChild.src = backgroundImages[index];
                } else if (rect.top >= (h/2-100) && rect.top <= (h/2+150)){
                    console.log("Hello from grp-2");
                    background.firstElementChild.src = backgroundImages[index];
                }
            })
        }, 500);
    }
})


async function fetchImage(usedFor, number){
    let response = await fetch(`http://127.0.0.1:5000/picture/${usedFor}${number}.jpg`)
    if (!response.ok) {
        throw new Error(`Http Error! Status: ${response.status}`);
    }
    return await response.blob();
}

function whenScrolled(ev){
    if(Math.abs(window.scrollY - prevScrollY) > 50 && !scrollOngoing){
        scrollOngoing = true;
        // To get the height in vh we get the total screen length and the current Y Scroll position.
        var scrollY = window.scrollY;
        const elem = background.firstElementChild;
        for(var i=0; i<3; ++i) { 
            const rect = sections[i].getBoundingClientRect();
            if (i==0 && rect.bottom >= 0){
                const newOpacity = h/rect.bottom - 1;
                const navElem = document.getElementsByClassName('navigation')[0];
                if (rect.bottom > (h/2 + 150)){
                    navElem.style.display = "none";
                } else {
                    navElem.style.display = "block";
                }
                navElem.style.opacity = newOpacity;
            }

            if(shouldScroll){
                if (prevScrollY <= scrollY ){
                    // When Scrolled up.
                    if (rect.top <= (h/2 + 150)){
                        elem.src = backgroundImages[i];
                    }
                } else {
                    // When Scrolled down
                    if (rect.bottom >=(h/2 - 150) && rect.bottom <= (h/2 + 250)){
                        elem.src = backgroundImages[i];
                    }
                }
            }
        }
        prevScrollY = scrollY;
        scrollOngoing = false;
    }
};

document.getElementsByTagName('body')[0].onscroll = whenScrolled;

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
