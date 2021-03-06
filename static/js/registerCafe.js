window["currRegistrationPage"] = 0;
menuItems = {};
menu = {};

function preventSubmit(event){
    return false;
}

function checkValuePresent(elem){
    if (elem.value.length > 0){
        elem.parentElement.classList.add('input-active');
    }
    const errorElem = document.getElementsByClassName('registration-error')[0];
    errorElem.innerHTML = "";
}

function changePage(triggerElem){
    // console.log(currPage);
    const form = document.registrationForm;

    // Not Appending the error just after the div contaning the field because it causes problems with the layout.
    // We can append the sibling element using functions like:
        // 1. beforeElement();
        // 2. insertAdjacentHTML(); --> Do not use createElement() with this.
    // StackOverflow link: https://stackoverflow.com/questions/21422337/append-element-as-sibling-after-element
    // const errorElem = document.getElementsByClassName('registration-error')[0];
    // if (form.cafeName.value.length == 0){
    //     form.cafeName.focus();
    //     errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Name Cannot be empty!';
    //     return;
    // } else if (form.cafePhonenumber.value.length == 0) {
    //     form.cafePhonenumber.focus();
    //     errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Phone Number Cannot be empty!';
    //     return
    // } else if (form.cafeEmail.value.length == 0) {
    //     form.cafeEmail.focus();
    //     errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Email Cannot be empty!';
    //     return 
    // } else if (form.cafeWifirating.value.length == 0) {
    //     form.cafeWifirating.focus();
    //     errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Wifi Rating Cannot be empty!';
    //     return
    // } else if (form.cafeSocket.value.length == 0) {
    //     form.cafeSocket.focus();
    //     errorElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Socket Rating Cannot be empty!';
    //     return
    //} // else {
        // if (currPage == 1){
        //     // Increase the progess bar
        //     const activeElem = document.getElementsByClassName('active');
        //     activeElem[activeElem.length - 1].nextElementSibling.classList.add('active');
        //     const backButton = document.getElementsByClassName('backButton')[0];
        //     backButton.style.display = "inline-block";

        //     // Change the page
        //     const pages = document.getElementsByClassName('page');
        //     pages[0].style.display = "none";
        //     pages[1].style.display = "flex";

        //     // Change the form name
        //     const formHeader = document.getElementsByClassName('form-heading')[0];
        //     formHeader.innerHTML = "Menu Details";
        //     document.getElementsByClassName('menu-header-input')[0].focus()
        // } 
        // else if (currPage == 2){
        //     const activeElem = document.getElementsByClassName('active');
        //     activeElem[activeElem.length - 1].nextElementSibling.classList.add('active');

        //     // Change the page
        //     const pages = document.getElementsByClassName('page');
        //     pages[1].style.display = "none";
        //     pages[2].style.display = "block";

        //     const formHeader = document.getElementsByClassName('form-heading')[0];
        //     formHeader.innerHTML = "";

        //     const submit = document.querySelector('#registration-form>input');
        //     submit,style.display = "inline-block";
        //     const nextButton = document.getElementsByClassName('nextButton')[0];
        //     nextButton.style.display = "inline-block";
        // }
        if (triggerElem.classList.contains('nextButton')){
            // console.log(window.currRegistrationPage);
            window.currRegistrationPage += 1;
            const currPage = window.currRegistrationPage;
            const activeElem = document.getElementsByClassName('active');
            activeElem[activeElem.length - 1].nextElementSibling.classList.add('active');
            const backButton = document.getElementsByClassName('backButton')[0];
            backButton.style.display = "inline-block";

            // Change the page
            const pages = document.getElementsByClassName('page');
            // console.log(window.currRegistrationPage);
            pages[currPage-1].style.display = "none";
            pages[currPage].style.display = "flex";

            // Change the form name
            document.getElementsByClassName('menu-header-input')[0].focus()
            if (currPage == 2){
                triggerElem.style.display = "none";
                const submit = document.querySelector("#registration-form>input");
                submit.style.display = "inline-block";
            }  else {
                triggerElem.style.display = "inline-block";
                const submit = document.querySelector("#registration-form>input");
                submit.style.display = "none";
            }
        } else {
            console.log(window.currRegistrationPage);
            const currPage = window.currRegistrationPage;
            window.currRegistrationPage -= 1;
            const activeElem = document.getElementsByClassName('active');
            activeElem[activeElem.length - 1].classList.remove('active');
            if (currPage == 1){
                const backButton = document.getElementsByClassName('backButton')[0];
                backButton.style.display = "none";
            }

            // Change Page
            const pages = document.getElementsByClassName('page');
            pages[currPage].style.display = "none";
            pages[currPage-1].style.display = "flex";
        }
    // }
}

function menuHeader(elem){
    if (elem.innerText.length == 0 || elem.innerText=="Enter Menu Header"){
        elem.innerHTML = ""
    }
    elem.style.opacity = "1";
}

function checkMenuHeader(elem){
    if (elem.innerText.length == 0 || elem.innerText.length == 1){
        elem.innerText = "Enter Menu Header";
        elem.style.opacity = "0.5";
        return
    } else {
        // console.log(elem.innerText);
        document.registrationForm.menuHeaderName.value = elem.innerText
    }
}

function addMenuItem(){
    const paraElem = document.getElementsByClassName('coffee-details')[0];
    if (paraElem.innerHTML.length != 0){
        paraElem.innerHTML = "";
    }
    const coffeeName = document.registrationForm.coffeeName.value;
    const coffeePrice = document.registrationForm.coffeePrice.value;
    if (coffeeName.length == 0){
        document.registrationForm.coffeeName.focus();
        paraElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Please enter coffee name';
        setTimeout(()=>{
            paraElem.innerHTML = "";
        }, 2000);
    } else if (coffeePrice == 0) {
        document.registrationForm.coffeePrice.focus();
        paraElem.innerHTML = '<i class="fas fa-exclamation"> &nbsp;Please enter coffee price';
    } else {
        const table = document.querySelector('.current-menu-details>.items');
        table.parentElement.style.visibility = "visible";
        const newRow = document.createElement('DIV');
        newRow.innerHTML = `<span>${coffeeName}</span><span>${coffeePrice}</span>`;
        table.appendChild(newRow);
        document.registrationForm.coffeeName.value="";
        document.registrationForm.coffeePrice.value="";
        menuItems[coffeeName] = coffeePrice;
        console.log(menuItems);
        document.registrationForm.coffeeName.focus();
    }
}

function keyAddItem(event){
    event.preventDefault();
    if (event.keyCode == 13) {
        addMenuItem();
    }
    // console.log(event);
}


function addMenuPart(){
    var header = document.getElementsByClassName('menu-header-input')[0].innerText;
    if (header.length == 0 || header=="Enter Menu Header"){
        console.log('Header not given');
        return
    } else if(menuItems.length == 0){
        console.log("Please enter Menu Items");
        return
    } else {
        header = header.trim();
        // const part = {[header]: menuItems};
        // console.log(part);
        menu[header] = menuItems;
    }
    // menu.forEach(item=>{
    //     console.log(item);
    // });
    console.log(menu);
    const newGrp = document.createElement('DIV');
    newGrp.classList.add('menu-part');
    var string = `<h6>${header}</h6>
    <div class="menu-group">
        <div class="items">`
    Object.keys(menuItems).forEach(key => {
        var newStr = `<div>
                        <span>${key}</span>
                        <span>...</span>
                        <span>${menuItems[key]}</span>
                    </div>`;
        string += newStr;
    })    
    string += `</div>`;
    newGrp.innerHTML = string;
    const parentElem = document.getElementsByClassName('menu-content')[0];
    parentElem.appendChild(newGrp);

    // Clearing the previous elements
    const menuHeader = document.getElementsByClassName('menu-header-input')[0];
    menuHeader.innerHTML = "";
    checkMenuHeader(menuHeader);
    const table = document.getElementsByClassName('current-menu-details')[0];
    table.removeChild(table.lastElementChild);
    const newItems = document.createElement('DIV');
    newItems.classList.add('items');
    table.appendChild(newItems)
    table.style.visibility = "hidden";
    menuItems = {};
}

function sendData(){
    console.log(menu)
    cafeDetails = {};
    const form = document.registrationForm;
    cafeDetails["name"] = form.cafeName.value;
    cafeDetails['address'] = {
        "main": form.cafeAddress.value,
        "locality": form.cafeLocality.value,
        "city": form.cafeCity.value,
        "state": form.cafeState.value,
        "country": form.cafeCountry.value
    }
    cafeDetails["contact"] = {
        "email": form.cafeEmail.value,
        "phone": form.cafePhonenumber.value,
        "website": form.cafeWebsite.value
    }
    cafeDetails["established"] = form.cafeEstDate.value;
    feature = {}
    wifiRating = form.cafeWifirating.value;
    socketRat = form.cafeSocket.value;
    if(wifiRating>0){
        feature["wifi"] = "Yes",
        feature["wifiRating"] = wifiRating;
    } else {
        feature["wifi"] = "No"
    }

    if(socketRat>0){
        feature["socket"] = "Yes",
        feature["socketRating"] = wifiRating;
    } else {
        feature["socket"] = "No"
    }
    cafeDetails["features"] = feature;
    cafeDetails["menu"] = menu;
    cafeDetails["description"] = form.desc.value;
    cafeDetails["owner"] = form.cafeOwner.value;

    // Sending the data to the server
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000/register";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var result;
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200){
            result = JSON.parse(this.responseText);
            console.log(result.redirectURL);
            window.location.replace(result.redirectURL)
        }
    }

    var data = JSON.stringify(cafeDetails);
    xhr.send(data);
}