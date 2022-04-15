document.addEventListener("DOMContentLoaded", todo);

function todo() {
  let todoTitle = JSON.parse(localStorage.getItem("todoTitle"));
  if (todoTitle === null) {
    localStorage.setItem("todoTitle", JSON.stringify([]));
  }

  let todo = JSON.parse(localStorage.getItem("todo"));
  if (todo === null) {
    localStorage.setItem("todo", JSON.stringify([]));
  }
  const addBtn = document.querySelector(".addBtn");
  const contentBox = document.querySelector(".contentBox");
  const todoBox = document.querySelector(".todoBox");
  const todoContainer = document.querySelector(".todoContainer");
  const xBtn = document.querySelector(".xBtn");
  const render = () => {
    todoContainer.innerHTML = todoTitle
      .map((item) => {
        return `
      <ul class="todoBox">
      <p>${item.title}</p>
      <button class="addBtn">+ Add another list</button>
      <button class="xBtn" data-id="${item.id}">🅧</button>
      <button class="editBtn" data-id="${item.id}">EDIT</button>
      <ul class="todoList">
      </ul>
      </ul>
      `;
      })
      .join("");
  };
  render();

  // const todoList = document.querySelector(".todoList");
  // const render2 = () => {
  //   if (todoList !== null) {
  //     todoList.innerHTML = todo
  //       .map((item) => {
  //         return `
  //       <li class="todoList">${item.todo}</li>`;
  //       })
  //       .join("");
  //   }
  // };
  // render2();

  document.addEventListener("click", (e) => {
    const now = new Date();
    const idNow = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getSeconds()}`;
    const id = Math.floor(Number(idNow) + Math.random() * Number(idNow));
    let editId = null;

    if (e.target.classList.contains("addTodo")) {
      e.preventDefault();
      let title = prompt("Please enter a title");
      todoTitle.push({
        title: title,
        id: id,
      });

      localStorage.setItem("todoTitle", JSON.stringify(todoTitle));

      render();

      return;
    }

    // if (e.target.classList.contains("addBtn")) {
    //   let content = prompt("Please enter a Todo");

    //   todo.push({
    //     todo: content,
    //   });

    //   localStorage.setItem("todo", JSON.stringify(todo));

    //   render2();

    //   return;
    // }

    if (e.target.classList.contains("xBtn")) {
      const data = todoTitle.filter((item) => item.id !== Number(e.target.dataset.id));
      todoTitle = data;
      localStorage.setItem("todoTitle", JSON.stringify(data));
      render();
    }

    if (e.target.classList.contains("editBtn")) {
      let newTitle = prompt("Enter New Title");
      editId = Number(e.target.dataset.id);
      todoTitle.map((item) => {
        if (item.id === editId) {
          item.title = newTitle;
        }

        return item;
      });
      localStorage.setItem("todoTitle", JSON.stringify(todoTitle));
    }
    render();
  });
}
