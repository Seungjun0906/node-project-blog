const board = document.getElementById("board");

// Modal
const modal = document.getElementById("modal");
const navBtnSignin = document.getElementById("item-signin");
const navBtnSignout = document.getElementById("item-signout");
const navBtnSignup = document.getElementById("item-signup");

// FORM ELEMENT SELECOTR
const formSignin = document.getElementById("form-signin");
const btnSignin = document.getElementById("btn-signin");
const btnSignup = document.getElementById("btn-signup");

// GET POST AND RENDER
const getPostAndRender = async (e) => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    navBtnSignin.classList.add("hidden");
    navBtnSignup.classList.add("hidden");
    navBtnSignout.classList.remove("hidden");
  }

  try {
    const res = await fetch("/posts");
    const data = await res.json();
    if (!data.stauts === "ok") return;

    const { posts } = data;
    console.log(posts);
    for (let i = 0; i < posts.length; i++) {
      const fetch = document.getElementById("board").innerHTML;
      const title = posts[i].title;
      const date = new Date(posts[i].createdAt).toLocaleDateString();
      const author = posts[i].author;
      const content = posts[i].content;
      const id = posts[i]._id;
      console.log(date);
      board.innerHTML =
        `<div class="card" id="post">
      <div class="card-description">
      <a class="title-link" href="/posts/${id}"><h2 class="title">${title}</h2></a>
        <span class="createdAt">${date}</span>
        <span class="author">${author}</span>
      </div>
    </div>
      ` + fetch;
    }
  } catch (err) {
    console.log(err);
  }
};

// Sign in
const singnHandler = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const res = await fetch("/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });
  const data = await res.json();
  console.log(data);
  try {
    if (data.status === "ok") {
      alert(data.message);
      username.value = "";
      password.value = "";
      // UI
      modal.style.display = "none";
      navBtnSignin.classList.add("hidden");
      navBtnSignup.classList.add("hidden");
      navBtnSignout.classList.remove("hidden");
      // Token
      localStorage.setItem("token", data.token);
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

// Sign out
const signOutHandler = (e) => {
  e.preventDefault();
  navBtnSignin.classList.remove("hidden");
  navBtnSignup.classList.remove("hidden");
  navBtnSignout.classList.add("hidden");
  localStorage.clear();
};

// get post
window.addEventListener("load", getPostAndRender);

navBtnSignin.addEventListener("click", (e) => {
  modal.style.display = "block";
});

navBtnSignout.addEventListener("click", signOutHandler);

btnSignin.addEventListener("click", singnHandler);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// //Sign
// const postSignin = async () => {
//   const apiPostUrl = "/auth/signin";
//   const username = document.getElementById("username");
//   const password = document.getElementById("password");

//   try {
//     const result = await fetch(apiPostUrl, {
//       method: "POST",
//       header: { "Content-type": "application/json" },
//       body: JSON.stringify({
//         username: username.value,
//         password: password.value,
//       }),
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// };
