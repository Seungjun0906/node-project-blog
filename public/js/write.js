const formContent = document.getElementById("form-content");

const postContent = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  const author = document.getElementById("author");
  const password = document.getElementById("password");

  try {
    const res = await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        author: author.value,
        password: password.value,
      }),
    });
    const data = await res.json();
    if (data.status === "ok") {
      alert(data.message);
      window.location.href = "/";
    } else {
    }
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

formContent.addEventListener("submit", postContent);
