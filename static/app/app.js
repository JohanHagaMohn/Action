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
    document.querySelectorAll(".carousel").forEach((e) => {
        e.firstElementChild.addEventListener("click", () => {
            const hline = e.lastElementChild.firstElementChild
            const open = (hline.style.opacity == 1);
            if (open) {
                hline.style.opacity = 0;
                e.insertAdjacentHTML("beforeend", '<form class="taskForm" action="/app" method="POST"><div><input type="text" name="task" autofocus="" maxlength="32" required /><label for="task"><span>Task:</span></label></div><div><input type="number" name="duration" autofocus="" min="0" required /><label for="duration"><span>Duration (minutes):</span></label></div><div class="submitForm"><button type="submit">Add task</button></div></form>')
                e.lastElementChild.onsubmit = (form) => {
                    form.preventDefault();
                    const task = e.lastElementChild.firstElementChild.firstElementChild.value;
                    const duration = e.lastElementChild.childNodes[1].firstElementChild.value;
                    const branch = e.previousElementSibling.firstElementChild.innerHTML;
                    $.ajax({
                        type: "POST",
                        url: "/app",
                        data: JSON.stringify({ task: task, duration: duration, branch: branch }),
                        contentType: 'application/json;charset=UTF-8',
                        success: (resp) => {
                            hline.style.opacity = 1;
                            e.lastElementChild.remove();
                            e.insertAdjacentHTML("afterbegin", `<div class="mcircle"></div><div class="circle"><h3>${task}</h3><span>${duration}</span></div>`)
                        }
                    });
                }
            } else {
                e.children[e.children.length - 2].firstElementChild.style.opacity = 1;
                e.lastElementChild.remove();
            }
        })
    })
})