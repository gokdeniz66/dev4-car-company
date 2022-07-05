
function register(e) {
    // Check if passwords match
    if (getValue("password1") != getValue("confirm")) {
        alert("Passwords do not match");
        return;
    }


    data = {
        password: getValue("password1"),
        email: getValue("email1"),
        firstname: getValue("firstname"),
        lastname: getValue("lastname"),
    };

    // Submit data to API
    api("users", 'POST', data).then((res) => {
        if (res.message == 'success') {
            alert("User created");
        }
    });
}


function autoToevoegen(){

    data = {
        model: getValue("model4"),
        brandstof: getValue("brandstof4"),
        airco: getValue("airco4"),
        automaat: getValue("automaat4"),
        aantal_zitplaatsen: getValue("aantal_zitplaatsen4")

    };


 // Submit data to API
 api("car", 'POST', data).then((res) => {
    if (res.message == 'success') {
        alert("car created");
    } else {
        alert("Credentials are incorrect");
    }
});



}





var x = document.getElementById('reservationPageBekijken')




function reservatie(e) {
    // Fetch data from html
    api("me").then((res) => {
        if (res.message == 'success') {
            document.getElementById('welcome').innerText = `Welcome, ${res.user.firstname} ${res.user.lastname}`;

            data = {
                auto_id: selection.value,
                tijd: getValue("time"),
                datum: getValue("txtDate"),
                leveren: select.options[select.selectedIndex].value,
                klant_id: res.user.id,
                check_reservatie: '1'
            }

            // Submit data to API
            api("reservatie", 'POST', data).then((res) => {
                if (res.message == 'success') {
                    showPage("reservationPageBekijken");
                    window.onbeforeunload = function () {
                        return "Dude, are you sure you want to leave? Think of the kittens!";
                    }
                    laatReservatieZien()



                }
            });
        }
    });
}

api("me").then((res) => {
    if (res.message == 'success') {
        document.getElementById('welcome').innerText = `Welcome, ${res.user.firstname} ${res.user.lastname}`;
    }
});


function car() {
    api("car", 'GET').then((res) => {
        if (res.message == 'success') {
            for (i = 0; i < res.model.length; i++) {
                console.log(res.model[i].model);
                document.getElementById("selection").innerHTML += '<option value="' + res.model[i].id + '">' + res.model[i].model + '</option>';
            }
        }
    });
}

function admin() {
    api("admin", 'GET').then((res) => {
        if (res.message == 'success') {
            for (i = 0; i < res.model.length; i++) {
                console.log(res.model[i]);
                document.getElementById("carkeuze").innerHTML += '<option value="' + res.model[i].reservatie_id + '">' + res.model[i].firstname + " "
                    + res.model[i].lastname + "(ID " + res.model[i].reservatie_id + ")" + '</option>';
            }
        }
    });
}

function carWijzig(){
    api("carr", 'GET').then((res) => {
        if (res.message == 'success') {
            for (i = 0; i < res.model.length; i++) {
                document.getElementById("selection5").innerHTML += '<option value="' + res.model[i].id + '">' + res.model[i].model + '</option>';
            }
        }
    });

}




function laatReservatieZien() {
    api("reservatie", 'GET').then((res) => {
        if (res.message == 'success') {
            for (i = 0; i < res.reservatie.length; i++) {
                console.log(res.reservatie[i].model)
                document.getElementById("selection1").innerHTML += '<option value="' + res.reservatie[i].id + '">' + res.reservatie[i].model + '</option>';
            }
        }
    });
}

let selectionWijzig = document.querySelector('#selection5');
var hoi =[]

selectionWijzig.addEventListener('change', () => {
    api("carr", 'GET').then((res) => {
        if (res.message == 'success') {
            for (i = 0; i < res.model.length; i++) {
                if (res.model[i].id == selectionWijzig.value) {
                    document.getElementsByClassName("test4")[0].placeholder = res.model[i].model;

                    document.getElementsByClassName("test")[0].placeholder = res.model[i].brandstof;
                    if (res.model[i].airco === 0) {
                        document.getElementsByClassName("test1")[0].placeholder = "Aicro niet inbegrepen";
                    } else {
                        document.getElementsByClassName("test1")[0].placeholder = "Airco wel inbegrepen";
                    }
                    if (res.model[i].automaat === 0) {
                        document.getElementsByClassName("test2")[0].placeholder = "Geen automaat";
                    } else {
                        document.getElementsByClassName("test2")[0].placeholder = "Wel een automaat";
                    }
                    hoi.push(res.model[i].id);
                   
                    document.getElementsByClassName("test3")[0].placeholder = res.model[i].aantal_zitplaatsen;
                    console.log(res.model[i].brandstof)
                    console.log(res.model[i].aantal_zitplaatsen)


                    break;
                }
                

        }

            
        }
    })
})

function popsmoke(){

    console.log(hoi)
}

let selectionAdmin = document.querySelector('#carkeuze');

selectionAdmin.addEventListener('change', () => {
    api("admin", 'GET').then((res) => {
        if (res.message == 'success') {
            for (i = 0; i < res.model.length; i++) {
                if (res.model[i].reservatie_id == selectionAdmin.value) {
                    console.log(res.model[i])
                    
                    document.getElementById("model2").innerHTML = "Model: " + res.model[i].model;
                    document.getElementById("brandstof2").innerHTML = "Brandstof: " + res.model[i].brandstof;
                    document.getElementById("airco2").innerHTML = "Airco : " + res.model[i].airco;
                    if (res.model[i].airco === 0) {
                        document.getElementById("airco2").innerHTML = "Aicro niet inbegrepen";
                    } else {
                        document.getElementById("airco2").innerHTML = "Airco wel inbegrepen";
                    }
                    if (res.model[i].automaat === 0) {
                        document.getElementById("automaat2").innerHTML = "Geen automaat";
                    } else {
                        document.getElementById("automaat2").innerHTML = "Wel een automaat";
                    }
                    document.getElementById("zitplaatsen2").innerHTML = "Aantal zitplaatsen: " + res.model[i].aantal_zitplaatsen;
                   

                    break;
                }


            }



        }
    })
})




let selection1 = document.querySelector('#selection1');

selection1.addEventListener('change', () => {
    api("reservatie", 'GET').then((res) => {
        if (res.message == 'success') {
            for (i = 0; i < res.reservatie.length; i++) {
                if (res.reservatie[i].id == selection1.value) {

                    console.log(res.reservatie[i]);
                    document.getElementById("brandstof1").innerHTML = "Brandstof: " + res.reservatie[i].brandstof;
                    if (res.reservatie[i].airco === 0) {
                        document.getElementById("airco1").innerHTML = "Aicro niet inbegrepen";
                    } else {
                        document.getElementById("airco1").innerHTML = "Airco wel inbegrepen";
                    }
                    if (res.reservatie[i].automaat === 0) {
                        document.getElementById("automaat1").innerHTML = "Geen automaat";
                    } else {
                        document.getElementById("automaat1").innerHTML = "Wel een automaat";
                    }
                    document.getElementById("zitplaatsen1").innerHTML = "Aantal zitplaatsen: " + res.reservatie[i].aantal_zitplaatsen;
                    document.getElementById("time1").innerHTML = res.reservatie[i].tijd;
                    document.getElementById("txtDate1").innerHTML = res.reservatie[i].datum;


                    break;
                }


            }



        }
    })
})

// let selection1 = document.querySelector('.car1');

// selection1.addEventListener('change',() => {
//     api("reservatie", 'GET').then((res) => {
//         if (res.message == 'success') {
//             for (i = 0; i < res.reservatie.length; i++) {
//                 console.log(res.reservatie[selection1.value].model);
//                 document.getElementById("brandstof1").innerHTML = res.reservatie[selection1.value].model;

//             }


//         } 
//     });
// })










const select = document.getElementById('selectionLeveren');

select.addEventListener('change', function handleChange(event) {
    // 👇️ get selected VALUE even outside event handler
    console.log(select.options[select.selectedIndex].value);

});


let selection = document.querySelector('select')

selection.addEventListener('change', () => {

    api("car", 'GET').then((res) => {
        if (res.message == 'success') {
            for (i = 0; i < res.model.length; i++) {

                if (res.model[i].id == selection.value) {
                    console.log(res.model[i].brandstof);

                    document.getElementById("brandstof").innerHTML = res.model[i].brandstof;

                    if (res.model[i].airco === 0) {
                        document.getElementById("airco").innerHTML = "Aicro niet inbegrepen";
                    } else {
                        document.getElementById("airco").innerHTML = "Airco wel inbegrepen";
                    }
                    if (res.model[i].automaat === 0) {
                        document.getElementById("automaat").innerHTML = "Geen automaat";
                    } else {
                        document.getElementById("automaat").innerHTML = "Wel een automaat";
                    }

                    document.getElementById("aantal_zitplaatsen").innerHTML = "Aantal Zitplaatsen: " + res.model[i].aantal_zitplaatsen;
                    break;
                }

            }
        }
    });
})









function login() {
    // Fetch data from html
    data = {
        password: getValue("password2"),
        email: getValue("email2"),
    };

    // Submit data to API
    api("auth", 'POST', data).then((res) => {
        if (res.message == 'success') {
            // Save the received JWT in a cookie
            setCookie("token", res.access_token, 365);
            showPage('reservationPage');
            getUser();
            car();

        } else {
            alert("Credentials are incorrect");
        }
    });
}

function getUser() {
    // Fetch user data from API
    api("me").then((res) => {
        if (res.message == 'success') {
            document.getElementById('welcome').innerText = `Welcome, ${res.user.firstname} ${res.user.lastname}`;
            console.log("user id: " + res.user.id)
            console.log(res.user.admin)
            if (res.user.admin === 1) {
                showPage('adminPage');
                admin();
            } else {
                showPage('reservationPage');
            }
        }
    });


}

function logout() {
    deleteCookie("token");
    showPage('loginPage');
}

function loginPage() {
    showPage('loginPage');
    var x = document.getElementById("area-mainpage");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function reservatieLatenZien() {
    showPage('reservationPageBekijken');
}


// Helper functions

function showPage(id) {
    let pages = document.getElementsByClassName("container");
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    document.getElementById(id).style.display = "block";
}

function showAutoToevoegen(){
    showPage('autoToevoegen')
}
function showAutoWijzigen(){
    showPage('autoWijzigen')
    carWijzig()
}

function bindEvents() {
    connectButton("register", register);
    connectButton("login", login);
    connectButton("reserverenButton", reservatie);
    connectButton("auto_toevoegen", showAutoToevoegen);
    connectButton("auto_wijzigen", showAutoWijzigen);
    connectButton("auto_toevoegen1", autoToevoegen);
    connectButton("auto_toevoegen2", popsmoke);


    enableSubmits();
}

function enableSubmits() {
    document.body.addEventListener("keydown", function (e) {
        if (e.key == "Enter") { // if enter is pressed
            console.log(e);
            let target = e.target;
            while (!target.className.includes('input')) {
                console.log(target);
                target = target.parentElement;
            }
            target.parentElement.getElementsByTagName("button")[0].click(); // click the first button
        }
    });
}

function connectButton(id, event) {
    let element = document.getElementById(id);
    if (element) {
        element.addEventListener("click", event);
    }
}

function getValue(id) {
    let element = document.getElementById(id);
    if (element) {
        return element.value;
    }
    return "";
}

function api(endpoint, method = 'GET', data = {}) {
    const API = "http://localhost:5000/";
    return fetch(API + endpoint, {
        method: method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("token"),
        },
        body: method == 'GET' ? null : JSON.stringify(data),
    }).then((res) => res.json());
}

// Cookie functions stolen from w3schools (https://www.w3schools.com/js/js_cookies.asp)
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }


    return "";

}

function deleteCookie(cname) {
    setCookie(cname, "", -1);
}

bindEvents();

// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
// }

let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 7000); // Change image every 2 seconds
}

// let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Calendar disable past dates
var today = new Date().toISOString().split('T')[0];
// document.getElementsByName("txtDate")[0].setAttribute('min', today);
