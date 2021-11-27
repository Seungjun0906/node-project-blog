const btnSignup = document.getElementById("btn-signup");
const formSignup = document.getElementById("form-signup");

const postNewUser = async (e) => {
  e.preventDefault();
  try {
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const passwordConfirm = document.getElementById("password-confirm");

    const res = await fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
      }),
    });
    const data = await res.json();

    if (data.status === "ok") {
      firstName.value = "";
      lastName.value = "";
      username.value = "";
      password.value = "";
      passwordConfirm.value = "";
      alert(data.message);
      window.location.href = "/";
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

formSignup.addEventListener("submit", postNewUser);
