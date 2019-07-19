function eventFire(el, etype) {
    /** Simulates event, from stackoverflow.com/questions/2705583 */
    if (el.fireEvent) {
        el.fireEvent("on" + etype);
    } else {
        let evObj = document.createEvent("MouseEvents");
        evObj.initEvent(etype, true, false);
        !el.dispatchEvent(evObj);
    }
}
function hideIcon(light, opacity) {
    /** Changes night mode icon and label based on opacity */
    if (opacity == 1) {
        document.querySelector(`#${light}`).style.display = "none";
    } else {
        document.querySelector(`#${light}`).style.display = "flex";
    }
    label = document.querySelector("#nightLabel");
    if (light == "moon") {
        label.innerHTML = "Light Mode";
    } else {
        label.innerHTML = "Dark Mode";
    }
}
/** Gets cookie by name, from stackoverflow.com/questions/5639346 */
function getCookieValue(a) {
    var b = document.cookie.match("(^|[^;]+)\\s*" + a + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

window.addEventListener("DOMContentLoaded", () => {
    /** Declares header variables */
    let menuClicked = false;
    let smallMenu = false;
    const cookie = getCookieValue("style");
    if (cookie != "") {
        document.body.style.backgroundColor = cookie;
    }
    let bodyColor = document.body.style.backgroundColor;
    document.querySelector("main").style.color =
        bodyColor == "rgb(255, 255, 255)" || bodyColor == "#fff"
            ? "#000"
            : "#fff";
    function showContainers(opacity) {
        /** Toggles menu items on small screens */
        if (window.innerWidth < 540 && smallMenu == false && opacity == 1) {
            document.querySelector("#about").style.display = "initial";
            document.querySelector("#register").style.display = "initial";
            document.querySelector("#login").style.display = "initial";
            smallMenu = true;
        } else if (smallMenu && window.innerWidth < 540) {
            document.querySelector("#about").style.display = "none";
            document.querySelector("#register").style.display = "none";
            document.querySelector("#login").style.display = "none";
            smallMenu = false;
        }

        /** Changes containers' visibility based on opacity */
        document.querySelectorAll(".container").forEach(element => {
            if (opacity == 0) {
                setTimeout(() => {
                    element.style.visibility = "none";
                }, 100);
                element.style.opacity = opacity;
                element.style.display = "none";

                /** Simulates click event to reset event listeners */
                eventFire(document.querySelector("main"), "click");
            } else {
                element.style.visibility = "visible";
                element.style.display = "flex";
                setTimeout(() => {
                    element.style.opacity = opacity;
                }, 100);
            }
        });
    }
    function showMenu(opacity) {
        /** Hides containers and svg */
        hideIcon(
            bodyColor == "rgb(255, 255, 255)" || bodyColor == "#fff"
                ? "sun"
                : "moon",
            opacity
        );
        showContainers(opacity);
    }
    if (!bodyColor) {
        /** Sets default bodyColor white */
        bodyColor = "#fff";
    }
    document.querySelector("main").addEventListener("click", () => {
        if (menuClicked) {
            /** Deselects menu on main click */
            menuClicked = !menuClicked;
            showMenu(0);
        }
    });
    function changeStyle() {
        /** Deselects menu and changes styling on nightMode click */
        showMenu(0);
        //console.log(bodyColor);
        document.querySelector("main").style.color = bodyColor;
        if (bodyColor == "rgb(255, 255, 255)" || bodyColor == "#fff") {
            bodyColor = "#000";
            document.querySelector("header").style.boxShadow =
                "0 2px 2px -2px rgba(200, 200, 200, 0.5)";
        } else {
            bodyColor = "#fff";
            document.querySelector("header").style.boxShadow =
                "0 2px 2px -2px rgba(0, 0, 0, 0.5)";
        }
        //console.log(bodyColor);
        document.querySelector("body").style.backgroundColor = bodyColor;
        document.querySelectorAll(".container").forEach(element => {
            element.style.backgroundColor = bodyColor;
        });
    }

    document.querySelector("#nightMode").addEventListener("click", () => {
        changeStyle();
        document.cookie = `style=${bodyColor}`;
    });
    document.getElementById("settingicon").addEventListener("click", () => {
        /** Inverts menuClicked boolean and displays menu accordingly */
        menuClicked = !menuClicked;
        if (menuClicked) {
            showMenu(1);
        } else {
            showMenu(0);
        }
    });
});
