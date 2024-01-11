const loginForm = document.querySelector(".login--form");
const passwordForm = document.querySelector(".password");
const emailForm = document.querySelector(".email");

const loginFunction = async (data) => {
  try {
    const response = await axios.post("/api/v1/users/login", data);
    console.log(response)
    
    if (response.data.token) {
      window.location.href = "https://todos-app-5s9u.onrender.com/todos.html";
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = { email: emailForm.value, password: passwordForm.value };

  loginFunction(data);
});
