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
        document.body.style.backgroundColor =
            cookie == "rgb(255, 255, 255)" || cookie == "#fffff"
                ? "rgb(0, 0, 0)"
                : "rgb(255, 255, 255)";
    }
    let bodyColor = document.body.style.backgroundColor;
    if (!bodyColor) {
        /** Sets default bodyColor black to be turned white */
        bodyColor = "rgb(255, 255, 255)";
    }
    changeStyle();

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
        document.querySelector("#icons").style.opacity = opacity;
        /** Changes containers' visibility based on opacity */
        document.querySelectorAll(".container").forEach(element => {
            if (opacity == 0) {
                setTimeout(() => {
                    element.style.visibility = "hidden";
                    element.style.display = "none";
                }, 100);
                element.style.opacity = opacity;
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
        const light = bodyColor == "rgb(255, 255, 255)" ? "sun" : "moon";
        document.querySelector(`#${light}`).style.display =
            opacity == 1 ? "none" : "flex";
        document.querySelector("#nightLabel").innerHTML =
            light == "moon" ? "Light Mode" : "Dark Mode";
        showContainers(opacity);
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
        document.querySelector("main").style.color = bodyColor;
        const contrast =
            bodyColor == "rgb(0, 0, 0)" ? "0, 0, 0" : "255, 255, 255";
        document.querySelectorAll(".circle").forEach(element => {
            if (
                element.style.borderColor != "rgb(56, 177, 56)" &&
                element.style.borderColor != "rgb(177, 56, 56)"
            ) {
                element.style.border = `2px solid rgba(${contrast}, 0.5)`;
            }
        });
        document.querySelectorAll(".mcircle").forEach(element => {
            if (
                element.style.borderColor != "rgb(56, 177, 56)" &&
                element.style.borderColor != "rgb(177, 56, 56)"
            ) {
                element.style.border = `2px solid rgba(${contrast}, 0.5)`;
            }
        });
        document.querySelector(
            "header"
        ).style.boxShadow = `0 2px 2px -2px rgba(${contrast}, 0.5)`;
        document.querySelector(
            "footer"
        ).style.boxShadow = `0 -2px 2px -2px rgba(${contrast}, 0.5)`;
        document.querySelectorAll(".container").forEach(element => {
            element.style.boxShadow = `-2px 2px 2px -2px rgba(${contrast}, 0.5)`;
        });
        bodyColor =
            bodyColor == "rgb(255, 255, 255)"
                ? "rgb(0, 0, 0)"
                : "rgb(255, 255, 255)";

        document.querySelector("body").style.backgroundColor = bodyColor;
    }

    document.querySelector("#nightMode").addEventListener("click", () => {
        showMenu(0);
        changeStyle();
        document.cookie = `style=${bodyColor}`;
    });
    document.getElementById("settingicon").addEventListener("click", () => {
        /** Inverts menuClicked boolean and displays menu accordingly */
        menuClicked = !menuClicked;
        document.querySelector("#icons").style.backgroundColor = bodyColor;
        if (menuClicked) {
            showMenu(1);
        } else {
            showMenu(0);
        }
    });
});
