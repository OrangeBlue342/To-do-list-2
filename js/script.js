{
    let tasks = [];
    let hideDoneTasks = false;

    const toggleTaskDone = (taskIndex) => {
      tasks = [
        ...tasks.slice(0, taskIndex),
        {
          ...tasks[taskIndex],
          done: !tasks[taskIndex].done,
        },
        ...tasks.slice(taskIndex + 1),
      ];

        render();
    }

    const bindEvents =() => {
      const removeButtons = document.querySelectorAll(".js-remove");

      removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
         tasks.splice(index, 1);
         render();
        });
      })
   

   const toggleDoneButtons = document.querySelectorAll(".js-done");

   toggleDoneButtons.forEach((toggleDoneButton, index) => {
       toggleDoneButton.addEventListener("click", () => {
           toggleTaskDone(index);
           render();
       })
   })
    }

    const renderButtons = () => {
      const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
        <button class="js-toggleHideDoneTasksButton">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} skończone zadania</button>
        <button class="js-toggleAllTasksDoneButton"
        ${tasks.every(({done}) => done) ? " disabled" : ""}>
        Oznacz wszystkie jako ukończone</button>`;
      };

        const toggleAllTasksDone = () => {
          tasks = tasks.map((task) => ({
            ...task, 
            done: true,
          }));
          
        render();
        };

        const toggleHideDoneTasks = () => {
          hideDoneTasks= !hideDoneTasks;

          render();
        };
    

    const bindButtonsEvents = () => {

      const toggleAllTasksDoneButtonElement = document.querySelector(".js-toggleAllTasksDoneButton")

      if(toggleAllTasksDoneButtonElement) {
        toggleAllTasksDoneButtonElement.addEventListener("click", toggleAllTasksDone);
      }

    };

    const toggleHideDoneTasksButtonElement = document.querySelector(".js-toggleHideDoneTasksButton")

    if(toggleHideDoneTasksButtonElement) {
      toggleHideDoneTasksButtonElement.addEventListener("click", toggleHideDoneTasks)
    };


    const renderTasks = () => {
       let htmlString = "";

       for (const task of tasks) {
        htmlString += `
        <li class=
        "list_item ${toggleAllTasksDone && toggleHideDoneTasks ? "tasks_item--hidden" : ""}">
        <button 
        class="button_done js-done">
        ${task.done ? "&#10004;" : ""}
        </button>
        <span class="${task.done ? "list_item_done" : ""}">
          ${task.content}
          </span>
          <button 
          class="button_remove js-remove">&#128465</button>
        </li>
        `;
       }

       document.querySelector(".js-tasks").innerHTML = htmlString;
};

const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
}

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
          });

          render();
    }
    
    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", (event) => {
          event.preventDefault();

          const newTaskContent = document.querySelector(".js-newTask").value.trim();

          if(newTaskContent === "") {
            return;
          }

          addNewTask(newTaskContent);
        });
    };

    init();
}
    