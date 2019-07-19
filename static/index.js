window.addEventListener("DOMContentLoaded", () => {
    landing = document.querySelector("#landing").style;
    text1 = document.querySelector("#text1").style;
    text2 = document.querySelector("#text2").style;
    setTimeout(() => {
        landing.opacity = "0";
        setTimeout(() => {
            landing.display = "none";
            text1.transform = "translateX(-35%)";
            text1.opacity = "0.75";
            setTimeout(() => {
                text2.opacity = "0.5";
            }, 750);
        }, 500);
        document.body.style.overflowY = "visible";
    }, 100);
    window.addEventListener("scroll", function scrolling() {
        if (window.scrollY > window.innerHeight * 0.1) {
            document.querySelector("#down").style.opacity = 0;
            setTimeout(() => {
                document.querySelector("#arrow").style.display = "none";
                window.removeEventListener("scroll", scrolling);
            }, 500);
        }
    });
});
