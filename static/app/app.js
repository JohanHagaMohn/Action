window.addEventListener("DOMContentLoaded", () => {
    const submit = document.querySelector("#submit");
    const welcome = document.querySelector("#welcome");
    const tasks = document.querySelector("#tasks");
    const newBranch = document.querySelector("#newBranch");
    const branchForm = document.querySelector("#branchForm");
    const line = newBranch.firstElementChild.firstElementChild;

    function show() {
        tasks.style.opacity = 1;
        newBranch.style.opacity = 1;
        newBranch.style.pointerEvents = "All";
    }

    try {
        submit.addEventListener("click", () => {
            welcome.style.opacity = 0;
            welcome.style.pointerEvents = "None";
            show()
        })
    } catch (TypeError) {
        show()
    }

    newBranch.firstElementChild.addEventListener("click", () => {
        branchForm.style.opacity = (branchForm.style.opacity == 0) ? 1 : 0;
        branchForm.style.pointerEvents = (branchForm.style.pointerEvents == "all") ? "none" : "all";
        line.style.opacity = (line.style.opacity == 0) ? 1 : 0;
    })

    Array.from(tasks.children).forEach((e) => {
        e.firstElementChild.addEventListener("click", () => {
            branchName = e.firstElementChild.firstElementChild.innerHTML
            $.ajax({
                type: "POST",
                url: "/app",
                data: JSON.stringify({ branch: branchName }),
                contentType: 'application/json;charset=UTF-8',
                success: (resp) => {
                    if (resp) {
                        e.remove();
                    }
                }
            });
        })
    })
})