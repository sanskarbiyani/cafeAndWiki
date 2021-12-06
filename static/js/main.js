window.addEventListener('load', openSearch);
document.queryForm.reset.addEventListener('click', removeParameter);

function displayCafe(){
    const cafeContainer = document.getElementById("cafe-container");
    cafeContainer.style.display = "flex";
    const landingElem = document.getElementById("landing-page");
    landingElem.style.display = "none";
}

// Go back to Home page
function back(){
    const landingElem = document.getElementById("landing-page");
    landingElem.style.display = "flex";
    const cafeContainer = document.getElementById("cafe-container");
    cafeContainer.style.display = "none";
}

function openSearch(){
    // Automaticallu fill the form with the contents of the previous search.
    const url = window.location.href.split("?");
    if (url.length == 2){
        const urlParameters = url[1].split("&");
        let values = []
        urlParameters.forEach(param => {
            values.push(param.split("=")[1]);
        });
        const searchValue = values[0].split("+").join(" ");
        document.queryForm.query.value = `${searchValue}`;
        let array = document.querySelectorAll(".parameters span");
        array.forEach(elem => {
            if (elem.innerHTML == values[1]){
                addParameter(elem);
            }
        })
    }
    // // To open the search box
    // const cafeContainer = document.getElementById("search-container");
    // cafeContainer.style.display= "flex";
    // const landingElem = document.getElementById("landing-page");
    // landingElem.style.filter="brightness(20%)";
    // cafeContainer.style.cursor = "pointer";
    // setTimeout(()=>{
    //     cafeContainer.addEventListener('click', backToLanding);
    //     cafeContainer.lastElementChild.style.cursor = "default";
    // }, 500);
}

// // Function to go back to landing when clicked on the surrounding area.
// function backToLanding(elem){
//     // If the event is triggered by the child element, then return immediately.
//     var targetElem = elem.target;
//     if (!(targetElem.tagName == 'SECTION')) return;
    
//     const cafeContainer = document.getElementById("search-container");
//     cafeContainer.style.display= "none";
//     const landingElem = document.getElementById("landing-page");
//     landingElem.style.filter="brightness(100%)";
//     cafeContainer.style.cursor = "default";
//     setTimeout(()=>{
//         cafeContainer.removeEventListener('click', backToLanding);
//     }, 500);
// }

// Function to add the parameter to the selected parameter list when selected.
// Remove any previous parameter present
function addParameter(element){
    let parameter = element.innerHTML;
    let newParameterElem = document.createElement('span');
    let parent = document.getElementsByClassName('search-parameters')[0];
    if (parent.childElementCount > 1){
        parent.removeChild(parent.lastElementChild);
    }
    newParameterElem.innerHTML = `${parameter}&nbsp | &nbsp<i class="fas fa-times"></i>`;
    newParameterElem.addEventListener('click', removeParameter);
    parent.appendChild(newParameterElem);
    document.queryForm.parameter.value = parameter;
    parent.style.display = "flex";
}

// To remove parameter present in the selected parameters
function removeParameter(event){
    if (event.target.tagName == 'INPUT'){
        var parent = document.getElementsByClassName('search-parameters')[0];
        var elem = parent.lastElementChild;
    } else {
        if (event.target.tagName != 'SPAN'){
            var elem = event.target.parentElement;
        } else {
            var elem = event.target;
        }
        var parent = elem.parentElement;
    }
    parent.removeChild(elem);
    parent.style.display = "none";
    document.queryForm.parameter.value="";
}

// To check form details
    // Both the fields should not be empty
    // Parameter should be any of the one mentioned in the Options
    // Display the errors if any
function validate(event){
    const validParameters = ['City', 'Country', 'State', 'Locality', 'Name'];
    let searchString = document.queryForm.query.value;
    let searchParameter = document.queryForm.parameter.value;
    let errors = []

    if (searchString.length == 0){
        errors.push('<i class="fas fa-exclamation"></i> Search string should not be empty.');
    }
    if (searchParameter.length == 0){
        errors.push('<i class="fas fa-exclamation"></i> Please select a Search Parameter');
    } else if (!validParameters.includes(searchParameter)){
        errors.push('<i class="fas fa-exclamation"></i> Parameter must be from the list.');
    }
    
    if(errors.length > 0){
        let content = errors.join('<br>');
        const elem = document.getElementsByClassName('error')[0];
        elem.innerHTML = content;
        return false;
    }
    return true;
}

function checkValuePresent(elem){
    if (elem.value.length > 0){
        elem.parentElement.classList.add('input-active');
    }
    const errorElem = document.getElementsByClassName('registration-error')[0];
    errorElem.innerHTML = "";
}

function changePage(currPage){
    console.log(currPage);
    const form = document.registrationForm;
    // Not Appending the error just after the div contaning the field because it causes problems with the layout.
    // We can append the sibling element using functions like:
        // 1. beforeElement();
        // 2. insertAdjacentHTML(); --> Do not use createElement() with this.
    // StackOverflow link: https://stackoverflow.com/questions/21422337/append-element-as-sibling-after-element
    const errorElem = document.getElementsByClassName('registration-error')[0];
    if (form.cafeName.value.length == 0){
        form.cafeName.focus();
        errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Name Cannot be empty!';
        return;
    } else if (form.cafePhonenumber.value.length == 0) {
        form.cafePhonenumber.focus();
        errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Phone Number Cannot be empty!';
        return
    } else if (form.cafeEmail.value.length == 0) {
        form.cafeEmail.focus();
        errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Email Cannot be empty!';
        return 
    } else if (form.cafeWifirating.value.length == 0) {
        form.cafeWifirating.focus();
        errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Wifi Rating Cannot be empty!';
        return
    } else if (form.cafeSocket.value.length == 0) {
        form.cafeSocket.focus();
        errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Socket Rating Cannot be empty!';
        return
    } else {
        if (currPage == 1){
            const activeElem = document.getElementsByClassName('active');
            activeElem[activeElem.length - 1].nextElementSibling.classList.add('active');
            const backButton = document.getElementsByClassName('backButton')[0];
            backButton.style.display = "inline-block";
            const pages = document.getElementsByClassName('page');
            pages[0].style.display = "none";
            pages[1].style.display = "flex";
            const formHeader = document.getElementsByClassName('form-heading')[0];
            formHeader.innerHTML = "Menu Details";
        }
    }
}