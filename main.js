function todo() {
  const todoContainer = document.querySelector(".todoContainer");
  const date = new Date();

  const createId = () => {
    const idDate =
      `${date.getFullYear()}` +
      `${date.getMonth() + 1}` +
      `${date.getDate()}` +
      `${date.getHours()}` +
      `${date.getMinutes()}`;
    const id = Math.floor(Number(idDate) + Math.random() * Number(idDate));
    return id;
  };

  let data = JSON.parse(localStorage.getItem("data"));
  if (data === null) {
    localStorage.setItem("data", JSON.stringify([]));
  }

  function render() {
    todoContainer.innerHTML = data
      .map((item) => {
        return `
        <ul class="todoBox">
          <p>${item.title}</p>
          <button class="addBtn" data-id="${item.id}">+ Add Todo</button>
          <button class="xBtn" data-id="${item.id}" >🅧</button>
          <button class="editBtn" data-id="${item.id}">EDIT</button>
        
          <ul class="todos">
            ${item.content
              .map((e) => {
                return `
                <li class="todoList" data-id="${e.id}">${e.todo}
                <button class="delBtn" data-id="${e.id}" >🅧</button>
                
                </li>`;
              })
              .join("")}
          </ul>
        
        </ul>
      `;
      })
      .join("");
  }

  document.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("addTodo")) {
      let title = prompt("제목을 입력하세요");
      if (title) {
        data.push({
          title: title,
          id: createId(),
          content: [],
        });
        localStorage.setItem("data", JSON.stringify(data));
      }
      render();
    }

    if (e.target.classList.contains("xBtn")) {
      const newData = data.filter((item) => item.id !== Number(e.target.dataset.id));
      data = newData;
      localStorage.setItem("data", JSON.stringify(data));
      render();
    }

    if (e.target.classList.contains("delBtn")) {
      data.map((item) => {
        const newContent = item.content.filter((item) => item.id !== Number(e.target.dataset.id));
        item.content = newContent;
      });

      localStorage.setItem("data", JSON.stringify(data));
      render();
    }

    if (e.target.classList.contains("editBtn")) {
      let editData = prompt("수정할내용을 입력하세요.");
      if (editData) {
        data.map((item) => {
          if (item.id === Number(e.target.dataset.id)) {
            item.title = editData;
          }
        });
      }

      localStorage.setItem("data", JSON.stringify(data));
      render();
    }
    if (e.target.classList.contains("todoList")) {
      let editTodo = prompt("수정할 내용을 입력하세요.");
      if (editTodo) {
        data.map((item) => {
          item.content.map((item) => {
            if (item.id === Number(e.target.dataset.id)) {
              item.todo = editTodo;
            }
          });
        });
      }

      localStorage.setItem("data", JSON.stringify(data));
      render();
    }

    if (e.target.classList.contains("addBtn")) {
      let todo = prompt("할일을 입력하세요.");
      if (todo) {
        data.map((item) => {
          if (item.id === Number(e.target.dataset.id)) {
            item.content.push({
              todo: todo,
              id: createId(),
            });
          }
        });
      }

      localStorage.setItem("data", JSON.stringify(data));
      render();
    }
  });

  render();
}
todo();
