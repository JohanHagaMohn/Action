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
            setTimeout(() => {
                welcome.remove()
            }, 300);
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

    function completeTask(e) {
        e.addEventListener("click", () => {
            branchName = e.parentElement.previousElementSibling.firstElementChild.innerHTML
            taskName = e.firstElementChild.innerHTML
            $.ajax({
                type: "POST",
                url: "/app",
                data: JSON.stringify({ branch: branchName, task: taskName }),
                contentType: 'application/json;charset=UTF-8',
                success: (resp) => {
                    if (resp) {
                        e.previousElementSibling.style.opacity = 0;
                        e.previousElementSibling.style.transform = "scale(0)";
                        e.style.opacity = 0;
                        e.style.transform = "scale(0)";
                        setTimeout(() => {
                            e.previousElementSibling.remove()
                            e.remove();
                        }, 300);
                    }
                }
            });
        })
    }
    if (tasks.children) {
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

    }
    document.querySelectorAll(".task").forEach((e) => {
        completeTask(e);
    })
    document.querySelectorAll(".carousel").forEach((e) => {
        e.lastElementChild.addEventListener("click", () => {
            const hline = e.lastElementChild.firstElementChild
            const open = (hline.style.opacity == 1);
            if (open) {
                hline.style.opacity = 0;
                e.insertAdjacentHTML("beforeend", '<form class="taskForm" action="/app" method="POST" style="opacity: 0; transform: scale(0);"><div><input type="text" name="task" autofocus="" maxlength="32" required /><label for="task"><span>Task:</span></label></div><div><input type="number" name="duration" autofocus="" min="0" max="32000" required /><label for="duration"><span>Duration (minutes):</span></label></div><div class="submitForm"><button type="submit">Add task</button></div></form>')
                setTimeout(() => {
                    e.lastElementChild.style.opacity = 1;
                    e.lastElementChild.style.transform = "initial";
                }, 10);
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
                            e.lastElementChild.style.opacity = 0;
                            e.lastElementChild.style.transform = 'scale: 0';
                            setTimeout(() => {
                                e.lastElementChild.remove();
                                const bodyColor = document.body.style.backgroundColor;
                                const contrast = bodyColor == "rgb(255, 255, 255)" ? "0, 0, 0" : "255, 255, 255";
                                e.lastElementChild.insertAdjacentHTML("beforebegin", `<div class="mcircle" style="border: 2px solid rgba(${contrast}, 0.5); opacity: 0; transform: scale(0);"></div><div class="circle task" style="border: 2px solid rgba(${contrast}, 0.5); opacity: 0; transform: scale(0);"><h3>${task}</h3><span>${duration}</span></div>`)
                                setTimeout(() => {
                                    e.children[e.children.length - 2].style.opacity = "initial";
                                    e.children[e.children.length - 3].style.opacity = "initial";
                                    e.children[e.children.length - 2].style.transform = "initial";
                                    e.children[e.children.length - 3].style.transform = "initial";
                                }, 100);
                                completeTask(e.children[e.children.length - 2]);
                            }, 300);
                        }
                    });
                }
            } else {
                e.children[e.children.length - 2].firstElementChild.style.opacity = 1;
                e.lastElementChild.style.opacity = 0;
                e.lastElementChild.style.transform = "scale(0)";
                setTimeout(() => {
                    e.lastElementChild.remove();
                }, 300);
            }
        })
    })
})