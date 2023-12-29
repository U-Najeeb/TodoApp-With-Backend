# ToDo App

## Overview

Welcome to the ToDo App! This application provides a straightforward way to manage your tasks. Built with HTML, CSS, JavaScript, Express.js, and MongoDB, it allows you to add, mark as completed, edit, and delete tasks effortlessly.

## Features

- **Add ToDo:** Easily add new tasks to your list through the input form.

- **Mark as Completed:** Keep track of completed tasks by clicking the "Done" button. Completed tasks will be visually marked with a strikethrough.

- **Edit ToDo:** Modify a task by clicking the "Edit" button. Save changes by clicking outside the input field.

- **Delete ToDo:** Remove tasks from your list with the "Delete" button.

## Getting Started

Follow these steps to set up and run the ToDo App on your local machine:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/U-Najeeb/TodoApp-With-Backend.git
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Configure MongoDB:**
    - Ensure MongoDB is installed and running on your machine.
    - Update the MongoDB connection details in the `app.js` file.

4. **Start the Server:**
    ```bash
    npm start
    ```
    Access the app at [http://localhost:5500](http://localhost:5500) in your browser.

## Usage

1. **Add Tasks:**
    - Enter a task in the input field.
    - Submit the form to add the task to your list.

2. **Manage Tasks:**
    - Mark tasks as completed with the "Done" button.
    - Edit tasks using the "Edit" button.
    - Delete tasks with the "Delete" button.

3. **Persistence:**
    - The app uses MongoDB for data storage, ensuring your tasks persist across sessions.

## Dependencies

- **Express.js:** Web application framework for Node.js
- **MongoDB:** NoSQL database for data storage
- **Axios:** Promise-based HTTP client for server communication

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
