window.addEventListener("DOMContentLoaded", () => {
    /** Landing page animation */
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

    /** Removes anchor tag on scroll */
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

    /** Declares carousel variables */
    const green = "rgb(56, 177, 56)";
    const red = "rgb(177, 56, 56)";

    /** Sets default carousel variables */
    let carouselItems = 4;
    let carouselItemWidth = 6 / 25;
    let carouselItemsWidth = (14 / 18) * carouselItemWidth * 100;

    /** Declares media queries */
    if (matchMedia) {
        window.matchMedia("(max-width: 1068px)").addListener(WidthChange);
        window.matchMedia("(max-width: 767px)").addListener(WidthChange);
        window.matchMedia("(max-width: 539px)").addListener(WidthChange);
        WidthChange();
    }

    /** Changes carousel item count on width change */
    function WidthChange() {
        if (window.matchMedia("(max-width: 539px)").matches) {
            carouselItems = 1;
            carouselItemWidth = 6 / 7;
        } else if (window.matchMedia("(max-width: 767px)").matches) {
            carouselItems = 2;
            carouselItemWidth = 6 / 13;
        } else if (window.matchMedia("(max-width: 1068px)").matches) {
            carouselItems = 3;
            carouselItemWidth = 6 / 19;
        } else {
            carouselItems = 4;
            carouselItemWidth = 6 / 25;
        }
        carouselItemsWidth = (14 / 18) * carouselItemWidth * 100;
    }

    /** Gets current theme contrast color */
    function getContrast() {
        return document.querySelector("main").style.color == "rgb(0, 0, 0)"
            ? "0, 0, 0"
            : "255, 255, 255";
    }

    /** Changes carousel item color */
    function setColor(item, circleColor, textColor) {
        item.style.borderColor = circleColor;
        item.childNodes[1].style.color = textColor;
        item.childNodes[3].style.color = textColor;
    }

    /** Animates circle move with special properties for aside circles */
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
                setTimeout(() => {
                    item.style.display = "";
                }, 350);
            }, 10);
        } else {
            item.style.transform = `translateX(${-carouselItemsWidth}vw)`;
        }
        setTimeout(() => {
            item.style.transition = "transform 0ms ease";
            item.style.transform = "";
            setTimeout(() => {
                item.style.transition = "";
            }, 349);
        }, 350);
    }

    /** Lowers the id by 1, wrapping around */
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

    /** Animates circles, swaps ids, and rescrolls if necessary */
    function scrollNodes() {
        document.querySelectorAll(".circle").forEach(item => {
            /** Disables pointer events while animation takes place */
            item.style.pointerEvents = "none";
            setTimeout(() => {
                item.style.pointerEvents = "all";
            }, 699);
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

    /** Recursively makes nodes green or red */
    function changeColor(id) {
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
                ).style.borderColor = changeColor(id - 1) ? green : red;
            }
            return true;
        } else {
            setColor(document.querySelector(`#circle${id}`), red, red);
            document.querySelector(`#mcircle${id}`).style.borderColor = red;
            if (!first) {
                changeColor(id - 1);
            }
            return false;
        }
    }
    /** Recursively makes items gray when deselected */
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

    /** Adds event listeners for each circle */
    document.querySelectorAll(".circle").forEach(element => {
        element.addEventListener("click", () => {
            /** Switches between green and gray color */
            if (element.style.borderColor != green) {
                setColor(element, green, green);
            } else {
                setColor(element, `rgba(${getContrast()}, 0.5)`, "");
            }
            /** Gets current element id */
            for (let i = 1; i < carouselItems + 1; i++) {
                if (element.id == `circle${i}`) {
                    /** Makes other items green or red if necessary */
                    changeColor(i);
                    /** Changes color of mini circle above current element if above circle is green depending on current circle's color */
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
                    /** Makes items gray if deselected */
                    makeGray(carouselItems);
                    /** Breaks out of loop */
                    break;
                }
            }
        });
    });
});
