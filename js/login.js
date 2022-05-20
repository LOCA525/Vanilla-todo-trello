const loginPage = () => {
  const goTodo = () => {
    location.href = "/page/index.html";
  };
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
      for (let i = 0; i < user.length; i++) {
        if (email.value === user[i].email && password.value === user[i].password) {
          alert("로그인 완료!!");
          goTodo();
          return;
        } else {
          if (i === user.length - 1) {
            return alert("아이디나 비밀번호를 확인해주세요");
          }
        }
      }
    }
  });
};
loginPage();
