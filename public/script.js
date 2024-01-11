// Selecting necessary DOM elements
const form = document.querySelector(".form");
const todoInput = document.querySelector(".todo--input");
const container = document.querySelector(".todos--container");
const logoutBtn = document.querySelector(".logout--btn");
const headingText = document.querySelector(".heading--text")
// Function to update the UI based on the provided todos

const token = document.cookie.split("=")[1];
const updateUI = (todos) => {
  // Clearing the existing content inside the container
  headingText.textContent = `TODO APP (${todos?.length})`
  container.innerHTML = "";
  // Iterating through each todo and creating HTML elements to display them
  todos.forEach((todo) => {
    const html = `
    <input type="text" name="data" class="todo-text" value="${todo.title}" ${
      todo.completed ? 'style="text-decoration: line-through;"' : ""
    } disabled>
      <div class="button--box">
        <button class="done buttons">✅</button>
        <button class="delete buttons">❌</button>
        <button class="edit buttons">📝</button>
      </div>`;
    const todoElement = document.createElement("div");
    todoElement.innerHTML = html;
    container.appendChild(todoElement);
    todoElement.classList.add(`todo--row`, "active");
    todoElement.setAttribute("task-id", todo._id);
  });
};

// Function containing event listeners for various actions on todos
const methods = () => {
  container.addEventListener("click", async (e) => {
    e.preventDefault();

    // Handling "Done" button click
    if (e.target.classList.contains("done")) {
      const element = e.target.closest(".todo--row");
      const tickedEle = element.firstElementChild;
      const taskId = element.getAttribute("task-id");
      tickedEle.style.textDecoration = "line-through";
      await axios.patch(
        `/api/v1/todos/${taskId}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    // Handling "Delete" button click
    if (e.target.classList.contains("delete")) {
      const element = e.target.closest(".todo--row");
      const taskId = element.getAttribute("task-id");
      await axios.delete(`/api/v1/todos/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await axios.get("/api/v1/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTodos = response.data.todos;
      updateUI(updatedTodos);
    }

    // Handling "Edit" button click
    if (e.target.classList.contains("edit")) {
      const element = e.target.closest(".todo--row");
      const editElement = element.querySelector(".todo-text");
      const taskId = element.getAttribute("task-id");
      editElement.removeAttribute("disabled");
      editElement.focus();
      editElement.value = "";
      editElement.addEventListener("blur", async () => {
        const newTitle = editElement.value.trim();
        if (newTitle !== "") {
          // Update the title in the database
          await axios.patch(
            `/api/v1/todos/${taskId}`,
            { title: newTitle },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          editElement.setAttribute("disabled", true);
        }
      });
    }
  });
};

// Function to fetch todos from the server and update the UI
const getTodos = async () => {
  try {
    const response = await axios.get("/api/v1/todos/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response?.data)
    updateUI(response?.data?.todos);
  } catch (error) {
    console.error("Something went wrong while fetching the todos.");
  }
};
// Event listener for form submission to add a new todo

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Getting the todo data from the input field
  const todoData = todoInput.value;
  if (!todoData) {
    alert("No TODO");
    return;
  }

  // Creating a new todo object
  const newTodo = {
    title: todoData.trim(),
  };

  // Sending a request to add the new todo
  await axios.post("/api/v1/todos", newTodo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Fetching the latest todos and updating the UI
  getTodos();

  // Clearing the input field
  todoInput.value = " ";
});

const deleteCookie = (name) => {
  const expirationDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  document.cookie = `${name}=; expires=${expirationDate.toUTCString()}; path=/;`;

  if (document.cookie == "") {
    window.location.replace("https://todos-app-5s9u.onrender.com/index.html");
    window.location.reload();
  }
};

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const cookieName = document.cookie.split("=")[0];
  deleteCookie(cookieName);
});
// Initial actions to fetch todos and set up event listeners
getTodos();
methods();
