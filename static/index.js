window.addEventListener("DOMContentLoaded", () => {
    landing = document.querySelector("#landing").style;
    text1 = document.querySelector("#text1").style;
    text2 = document.querySelector("#text2").style;
    setTimeout(() => {
        landing.opacity = "0";
        setTimeout(() => {
            landing.display = "none";
            text1.transform = "translateX(-30%)";
            text1.opacity = "0.5";
            setTimeout(() => {
                text2.opacity = "0.75";
                document.querySelector("#down").style.opacity = "0.5";
                document.body.style.overflowY = "visible";
                setTimeout(() => {
                    document.querySelector("#carousel").style.opacity = "0.65";
                }, 500);
            }, 500);
        }, 500);
    }, 100);
    window.addEventListener("scroll", function scrolling() {
        if (window.scrollY > window.innerHeight * 0.1) {
            document.querySelector("#down").style.transform =
                "opacity 2s ease-out";
            document.querySelector("#down").style.opacity = 0;
            setTimeout(() => {
                document.querySelector("#arrow").style.display = "none";
                window.removeEventListener("scroll", scrolling);
            }, 500);
        }
    });
    const green = "#38b138";
    const red = "#b13838";
    document.querySelectorAll(".circle").forEach(element => {
        let clicked = false;
        element.addEventListener("click", () => {
            clicked = !clicked;
            if (clicked) {
                element.style.borderColor = green;
                element.childNodes[1].style.color = green;
                element.childNodes[3].style.color = green;
                function checkNodes(id) {
/*                      if id > 1
                            if circle(self) is green
                                make self green
                                if checkNodes(self - 1) returns true
                                    make mcircle between self and self - 1 green
                                else
                                    make mcircle between self and self - 1 red
                                return true
                            else
                                make self red
                                return false
                        else
                            if circle(self) is green
                                make self green
                                make mcircle(self)
                            else
                                make self red

                    if (id = 1) {

                    }

                    if (document.querySelector(`#circle${id}`).style.borderColor == rgb(56, 177, 56)) {

                    }
                }


                const elementNumber;
                for (let i = 1; i < 5; i++) {
                    if (element.id == `circle${i}`) {
                        elementNumber = i;
                    }
                }
            } else {
                const contrast =
                    document.querySelector("main").style.color == "rgb(0, 0, 0)"
                        ? "0, 0, 0"
                        : "255, 255, 255";
                element.style.borderColor = `rgba(${contrast}, 0.5)`;
                element.childNodes[1].style.color = `rgba(${contrast}, 1)`;
                element.childNodes[3].style.color = `rgba(${contrast}, 1)`;
            }
        });
    });
});
