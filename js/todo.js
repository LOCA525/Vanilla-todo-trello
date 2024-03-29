function todo() {
  const todoContainer = document.querySelector(".todoContainer");
  const date = new Date();
  const user = JSON.parse(localStorage.getItem("user"));

  function goLogin() {
    location.href = "../page/login.html";
  }

  if (user === null) {
    alert("로그인이 필요합니다!");

    goLogin();
  }

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
          <p class="title1" data-id="${item.id}">
            ${item.title}
            <p class="user">user : ${item.user}</p>
          </p>
          
          <form type="submit" class="title1 Input on" data-id="${item.id}">
                <input type="text" data-id="${item.id}" placeholder="" class= "titleEditInput">
          </form>
          
          
          
          <button class="xBtn" data-id="${item.id}" >🅧</button>
         
        
          <ul class="todos">
            ${item.content
              .map((e) => {
                return `
                <li class="todoList" data-id="${e.id}">
                  ${e.todo}
                
                  <button class="delBtn" data-id="${e.id}" >🅧</button>
                
                </li>
                <form type="submit" class= "todoList Input on" data-id="${e.id}">
                  <input type="text" data-id="${e.id}" placeholder="수정내용을 입력하세요" class= "todoListEditInput" >
                </form>`;
              })
              .join("")}
          </ul>
          <button class="addBtn" data-id="${item.id}">+ Add Todo</button>
        
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
          user: user,
        });
        localStorage.setItem("data", JSON.stringify(data));
      }
      if (data !== null) {
        render();
      }
    }

    if (e.target.classList.contains("xBtn")) {
      const newData = data.filter((item) => item.id !== Number(e.target.dataset.id));
      data = newData;
      localStorage.setItem("data", JSON.stringify(data));
      if (data !== null) {
        render();
      }
    }

    if (e.target.classList.contains("delBtn")) {
      data.map((item) => {
        const newContent = item.content.filter((item) => item.id !== Number(e.target.dataset.id));
        item.content = newContent;
      });

      localStorage.setItem("data", JSON.stringify(data));
      if (data !== null) {
        render();
      }
    }

    if (e.target.classList.contains("title1")) {
      const titleEditInput = document.querySelectorAll(".titleEditInput");
      const conBox = document.querySelectorAll(".container .title1");

      const editTitle = (e) => {
        conBox.forEach((elem) => {
          if (elem.dataset.id === e.target.dataset.id) {
            elem.classList.add("on");
            if (elem.classList.contains("Input")) {
              elem.classList.remove("on");

              elem.addEventListener("submit", (e) => {
                e.preventDefault();
                titleEditInput.forEach((elem) => {
                  if (elem.dataset.id === e.target.dataset.id) {
                    let newTitle = elem.value;

                    if (newTitle) {
                      data.map((item) => {
                        if (item.id === Number(e.target.dataset.id)) {
                          item.title = newTitle;
                        }
                      });
                    }
                    localStorage.setItem("data", JSON.stringify(data));
                    if (data !== null) {
                      render();
                    }
                  }
                });
              });
            }
          }
        });
      };
      editTitle(e);
    }

    if (e.target.classList.contains("todoList")) {
      const conTodoBox = document.querySelectorAll(".container .todoList");
      const editTodo = (e) => {
        conTodoBox.forEach((elem) => {
          if (e.target.dataset.id === elem.dataset.id) {
            elem.classList.add("on");
            if (elem.classList.contains("Input")) {
              elem.classList.remove("on");
              document.addEventListener("submit", (e) => {
                e.preventDefault();
                const todoListEditInput = document.querySelectorAll(".todoListEditInput");

                todoListEditInput.forEach((elem) => {
                  if (e.target.dataset.id === elem.dataset.id) {
                    let newTodo = elem.value;
                    if (newTodo) {
                      data.map((item) => {
                        item.content.map((item) => {
                          if (item.id === Number(e.target.dataset.id)) {
                            item.todo = newTodo;
                          }
                        });
                      });
                    }
                  }
                  localStorage.setItem("data", JSON.stringify(data));
                  if (data !== null) {
                    render();
                  }
                });
              });
            }
          }
        });
      };

      editTodo(e);
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
      if (data !== null) {
        render();
      }
    }
  });

  if (data !== null) {
    render();
  }
}
todo();
