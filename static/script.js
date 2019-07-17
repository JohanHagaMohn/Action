window.addEventListener("DOMContentLoaded", () => {
    var menuClicked = false;
    var bodyColor = document.body.style.backgroundColor;
    function showMenu(opacity) {
        function change(item) {
            item.opacity = 1 - opacity;
            if (opacity == 0) {
                setTimeout(() => {
                    item.visibility = "none";
                    item.display = "none";
                }, 150);
                item.pointerEvents = "none";
                item.opacity = opacity;
            } else {
                item.cursor = "pointer";
                item.pointerEvents = "all";
                item.visibility = "visible";
                item.display = "flex";
                setTimeout(() => {
                    item.opacity = opacity;
                }, 5);
            }
        }
        document.querySelectorAll(".container").forEach(element => {
            change(element.style);
        });
        document.querySelectorAll(".label").forEach(element => {
            change(element.style);
        });
        const light = bodyColor == "#fff" ? "moon" : "sun";
        const icon = document.querySelector(`#${light}`).style;
        change(icon);
    }
    if (!bodyColor) {
        bodyColor = "#fff";
    }
    document.querySelector("main").addEventListener("click", () => {
        if (menuClicked) {
            menuClicked = false;
            showMenu(0);
        }
    });
    document.querySelector(".container").addEventListener("click", () => {
        showMenu(0);
        if (bodyColor == "#fff") {
            bodyColor = "#000";
            document.querySelector("body").style.backgroundColor = "#000";
            document.querySelector("header").style.boxShadow =
                "0 2px 2px -2px rgba(255, 255, 255, 0.5)";
            document.querySelector(".container").style.boxShadow =
                "-2px 2px 2px -2px rgba(255, 255, 255, 0.5)";
            document.querySelector(".container").style.outline =
                "1px solid rgba(50, 50, 50, 0.25)";
            document.querySelector("#bars").style.color = "#777";
            document.querySelector("#bars").style.opacity = "0.5";
        } else {
            bodyColor = "#fff";
            document.querySelector("body").style.backgroundColor = "#fff";
            document.querySelector("header").style.boxShadow =
                "0 2px 2px -2px rgba(0, 0, 0, 0.5)";
            document.querySelector(".container").style.boxShadow =
                "-2px 2px 2px -2px rgba(0, 0, 0, 0.5)";
        }
        showMenu(0.5);
    });

    document.getElementById("settingicon").addEventListener("click", () => {
        menuClicked = !menuClicked;
        if (bodyColor == "") {
            document.body.style.backgroundColor = "#fff";
        }
        if (menuClicked) {
            showMenu(1);
        } else {
            showMenu(0);
        }
    });
});
