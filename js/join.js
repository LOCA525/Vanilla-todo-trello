const joinPage = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user === null) {
    localStorage.setItem("user", JSON.stringify([]));
  }
  const goLogin = () => {
    location.href = "/page/login.html";
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
    } else if (user.length === 0) {
      user.push({
        email: email.value,
        name: name.value,
        password: password.value,
      });
      localStorage.setItem("user", JSON.stringify(user));

      alert("회원가입에 성공하였습니다");
    } else {
      for (let i = 0; i < user.length; i++) {
        if (email.value === user[i].email) {
          console.log(i);
          alert("이미 가입된 이메일 입니다!");
          return;
        } else {
          if (i === user.length - 1) {
            user.push({
              email: email.value,
              name: name.value,
              password: password.value,
            });

            localStorage.setItem("user", JSON.stringify(user));
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
