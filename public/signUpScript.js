const formName = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const passwordConfirm = document.querySelector(".passwordConfirm");
const signupform = document.querySelector(".signUp--form");

const signupFunction = async (data) => {
  try {
    console.log(data);
    const response = await axios.post("/api/v1/users/signup", data);
    console.log(response);

    if (response.data.token) {
      window.location.href = "https://todos-app-5s9u.onrender.com/todos.html";
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
signupform.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = {
    name: formName.value,
    email: email.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value,
  };
  signupFunction(data);
});
