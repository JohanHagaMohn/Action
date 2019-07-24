window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector("#landing").style.opacity = "0";
        setTimeout(() => {
            document.querySelector("#landing").style.display = "none";
            document.querySelector("#text1").style.transform = "translateX(0)";
            document.querySelector("#text1").style.opacity = "0.5";
            setTimeout(() => {
                document.querySelector("#text2").style.opacity = "0.75";
                document.querySelector("#down").style.opacity = "0.5";
                document.body.style.overflowY = "visible";
                setTimeout(() => {
                    document.querySelector("#carousel").style.opacity = "0.65";
                }, 500);
            }, 500);
        }, 500);
    }, 100);
    window.addEventListener("scroll", function scrolling() {
        if (window.scrollY > window.innerHeight * 0.15) {
            document.querySelector("#down").style.transform =
                "opacity 2s ease-out";
            document.querySelector("#down").style.opacity = 0;
            setTimeout(() => {
                document.querySelector("#arrow").style.display = "none";
                window.removeEventListener("scroll", scrolling);
            }, 500);
        }
    });
    const green = "rgb(56, 177, 56)";
    const red = "rgb(177, 56, 56)";
    const carouselItems = 4;
    const carouselItemWidth = 6;
    const carouselItemsWidth = (14 / 18) * (carouselItemWidth / 25) * 100;
    function getContrast() {
        return document.querySelector("main").style.color == "rgb(0, 0, 0)"
            ? "0, 0, 0"
            : "255, 255, 255";
    }
    function setColor(item, circleColor, textColor) {
        item.style.borderColor = circleColor;
        item.childNodes[1].style.color = textColor;
        item.childNodes[3].style.color = textColor;
    }
    function moveCircles(item, circleType, circleAmount) {
        if (item.id == `${circleType}1`) {
            item.style.transform = `translateX(${-carouselItemsWidth}vw) scale(0.1)`;
            item.style.opacity = "0";
            setTimeout(() => {
                item.style.opacity = "";
                if (circleType == "circle") {
                    setColor(item, `rgba(${getContrast()}, 0.5)`, "");
                    clicked = false;
                } else {
                    item.style.borderColor = `rgba(${getContrast()}, 0.5)`;
                }
            }, 300);
        } else if (item.id == `${circleType}${circleAmount}`) {
            item.style.display = "flex";
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateX(0) scale(1)";
            }, 10);
        } else {
            item.style.transform = `translateX(${-carouselItemsWidth}vw)`;
        }
        setTimeout(() => {
            item.style.transition = "transform 0ms ease";
            item.style.transform = "";
            setTimeout(() => {
                item.style.transition = "";
            }, 10);
        }, 350);
    }
    function swapID(items, prefix) {
        for (let i = 1; i < carouselItems + items; i++) {
            document.querySelector(`#${prefix}circle${i}`).id =
                i == 1
                    ? `${prefix}to${carouselItems + items - 1}`
                    : `${prefix}to${i - 1}`;
        }
        for (let i = 1; i < carouselItems + items; i++) {
            document.querySelector(
                `#${prefix}to${i}`
            ).id = `${prefix}circle${i}`;
        }
    }
    function scrollNodes() {
        document.querySelectorAll(".circle").forEach(item => {
            item.style.pointerEvents = "none";
            setTimeout(() => {
                item.style.pointerEvents = "all";
            }, 750);
            moveCircles(item, "circle", carouselItems + 1);
        });
        document.querySelectorAll(".mcircle").forEach(item => {
            moveCircles(item, "mcircle", carouselItems + 2);
        });
        setTimeout(() => {
            swapID(2, "");
            swapID(3, "m");
            setTimeout(() => {
                if (
                    document.querySelector("#circle1").style.borderColor ==
                    green
                ) {
                    scrollNodes();
                }
            }, 350);
        }, 350);
    }
    function checkNodes(id) {
        const first = id > 1 ? false : true;
        if (document.querySelector(`#circle${id}`).style.borderColor == green) {
            if (first) {
                document.querySelector(
                    `#mcircle${id}`
                ).style.borderColor = green;
                scrollNodes();
            } else {
                document.querySelector(
                    `#mcircle${id}`
                ).style.borderColor = checkNodes(id - 1) ? green : red;
            }
            return true;
        } else {
            setColor(document.querySelector(`#circle${id}`), red, red);
            document.querySelector(`#mcircle${id}`).style.borderColor = red;
            if (!first) {
                checkNodes(id - 1);
            }
            return false;
        }
    }
    function makeGray(id) {
        if (document.querySelector(`#circle${id}`).style.borderColor != green) {
            setColor(
                document.querySelector(`#circle${id}`),
                `rgba(${getContrast()}, 0.5)`,
                ""
            );
            document.querySelector(
                `#mcircle${id}`
            ).style.borderColor = `rgba(${getContrast()}, 0.5)`;
            if (id > 1) {
                makeGray(id - 1);
            }
        }
    }
    document.querySelectorAll(".circle").forEach(element => {
        element.addEventListener("click", () => {
            if (element.style.borderColor != green) {
                setColor(element, green, green);
            } else {
                setColor(element, `rgba(${getContrast()}, 0.5)`, "");
            }
            for (let i = 1; i < carouselItems + 1; i++) {
                if (element.id == `circle${i}`) {
                    checkNodes(i);
                    if (
                        i < carouselItems &&
                        document.querySelector(`#circle${i + 1}`).style
                            .borderColor == green
                    ) {
                        document.querySelector(
                            `#mcircle${i + 1}`
                        ).style.borderColor =
                            document.querySelector(`#circle${i}`).style
                                .borderColor == red
                                ? red
                                : green;
                    }
                    makeGray(carouselItems);
                    break;
                }
            }
        });
    });
});
