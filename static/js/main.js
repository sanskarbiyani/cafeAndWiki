function displayCafe(){
    const cafeContainer = document.getElementById("cafe-container");
    cafeContainer.style.display = "flex";
    const landingElem = document.getElementById("landing-page");
    landingElem.style.display = "none";
}

function back(){
    const landingElem = document.getElementById("landing-page");
    landingElem.style.display = "flex";
    const cafeContainer = document.getElementById("cafe-container");
    cafeContainer.style.display = "none";
}

function openSearch(){
    const url = window.location.href.split("?");
    if (url.length == 2){
        const urlParameters = url[1].split("&");
        let values = []
        urlParameters.forEach(param => {
            values.push(param.split("=")[1]);
        });
        // const searchValue = values[0].split("+");
        // if(searchValue.length == 1){
        //     document.queryForm.query.value = `${values[0]}`;
        // } else {
        //     document.queryForm.query.value = `${searchValue[0]} ${searchValue[1]}`
        // }
        const searchValue = values[0].split("+").join(" ");
        document.queryForm.query.value = `${searchValue}`;
        let array = document.querySelectorAll(".parameters span");
        array.forEach(elem => {
            if (elem.innerHTML == values[1]){
                addParameter(elem);
            }
        })
    }
    const cafeContainer = document.getElementById("search-container");
    cafeContainer.style.display= "flex";
    const landingElem = document.getElementById("landing-page");
    landingElem.style.filter="brightness(20%)";
    cafeContainer.style.cursor = "pointer";
    setTimeout(()=>{
        cafeContainer.addEventListener('click', backToLanding);
        cafeContainer.lastElementChild.style.cursor = "default";
    }, 500);
}

function backToLanding(elem){
    // If the event is triggered by the child element, then return immediately.
    var targetElem = elem.target;
    if (!(targetElem.tagName == 'SECTION')) return;
    
    const cafeContainer = document.getElementById("search-container");
    cafeContainer.style.display= "none";
    const landingElem = document.getElementById("landing-page");
    landingElem.style.filter="brightness(100%)";
    cafeContainer.style.cursor = "default";
    setTimeout(()=>{
        cafeContainer.removeEventListener('click', backToLanding);
    }, 500);
}

function addParameter(element){
    let parameter = element.innerHTML;
    let newParameterElem = document.createElement('span');
    let parent = document.getElementsByClassName('search-parameters')[0];
    if (parent.childElementCount > 1){
        parent.removeChild(parent.lastElementChild);
    }
    newParameterElem.innerHTML = `${parameter}&nbsp | &nbsp<i class="fas fa-times"></i>`;
    newParameterElem.addEventListener('click', removeParamter);
    parent.appendChild(newParameterElem);
    document.queryForm.parameter.value = parameter;
    parent.style.display = "flex";
}

function removeParamter(event){
    if (event.target.tagName != 'SPAN'){
        var elem = event.target.parentElement;
    } else {
        var elem = event.target;
    }
    const parent = elem.parentElement;
    parent.removeChild(elem);
    parent.style.display = "none";
    document.queryForm.parameter.removeAttribute('value');
}

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