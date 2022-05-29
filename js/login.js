const loginPage = () => {
  const goTodo = () => {
    location.href = "/page/index.html";
  };
  let users = JSON.parse(localStorage.getItem("users"));
  if (users === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }
  let user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    localStorage.setItem("user", JSON.stringify([]));
  }

  const email = document.querySelector(".emailInput");
  const name = document.querySelector(".nameInput");
  const password = document.querySelector(".passwordInput");
  const loginBtn = document.querySelector(".loginBtn");

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (email.value === "") {
      alert("이메일을 입력하세요.");
    } else if (password.value === "") {
      alert("비밀번호를 입력하세요.");
    } else {
      for (let i = 0; i < users.length; i++) {
        if (email.value === users[i].email && password.value === users[i].password) {
          let user = email.value;
          localStorage.setItem("user", JSON.stringify(user));
          alert("로그인 완료!!");
          goTodo();
          return;
        } else {
          if (i === users.length - 1) {
            return alert("아이디나 비밀번호를 확인해주세요");
          }
        }
      }
    }
  });
};
loginPage();
