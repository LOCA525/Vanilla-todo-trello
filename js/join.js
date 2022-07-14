const joinPage = () => {
  let users = JSON.parse(localStorage.getItem("users"));
  if (users === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }
  const goLogin = () => {
    location.href = "../page/login.html";
  };

  const email = document.querySelector(".emailInput");
  const name = document.querySelector(".nameInput");
  const password = document.querySelector(".passwordInput");
  const pwConfirm = document.querySelector(".passwordConfirmInput");
  const joinBtn = document.querySelector(".joinBtn");

  joinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (email.value === "") {
      alert("이메일을 입력하세요.");
    } else if (name.value === "") {
      alert("이름을 입력하세요.");
    } else if (password.value === "") {
      alert("비밀번호를 입력하세요.");
    } else if (pwConfirm.value === "") {
      alert("비밀번호 확인을입력하세요.");
    } else if (password.value !== pwConfirm.value) {
      alert("비밀번호가 서로 다릅니다.");
    } else if (users.length === 0) {
      users.push({
        email: email.value,
        name: name.value,
        password: password.value,
      });
      localStorage.setItem("users", JSON.stringify(users));

      alert("회원가입에 성공하였습니다");
      goLogin();
      return;
    } else {
      for (let i = 0; i < users.length; i++) {
        if (email.value === users[i].email) {
          console.log(i);
          alert("이미 가입된 이메일 입니다!");
          return;
        } else {
          if (i === users.length - 1) {
            users.push({
              email: email.value,
              name: name.value,
              password: password.value,
            });

            localStorage.setItem("users", JSON.stringify(users));
            alert("회원가입에 성공하였습니다");
            goLogin();
            return;
          }
        }
      }
    }
  });
};
joinPage();
