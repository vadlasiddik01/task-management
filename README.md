# Task Manager

A task management application built with Next.js. This application allows users to create, edit, and delete tasks, as well as mark them as completed and Task sorting based on completion status and due date.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, edit, and delete tasks
- Mark tasks as completed
- Responsive design for both desktop and mobile devices
- Task sorting based on completion status and due date

## Technologies Used

- [Next.js](https://nextjs.org/)
- [CSS] 
- [MongoDB](https://www.mongodb.com/) 

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env.local` file in the root directory and add your environment variables (e.g., database connection string).

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- To add a new task, fill out the form on the left side of the application and click "Add Task".
- To edit a task, click the "Edit" button next to the task you want to modify.
- To delete a task, click the "Delete" button next to the task.
- Tasks can be marked as completed by clicking the "Complete" button.

## API Endpoints

- **GET** `/api/tasks` - Fetch all tasks
- **POST** `/api/tasks` - Create a new task
- **PUT** `/api/tasks` - Update an existing task
- **DELETE** `/api/tasks/:id` - Delete a task by ID

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
