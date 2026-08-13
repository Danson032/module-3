/**
 * app.js - Main Application Logic
 *
 * This file contains core functionality for the Student Task Manager application,
 * including localStorage management, data persistence, and utility functions.
 */

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEY = "taskManagerData";

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generates a unique ID for new tasks using timestamp and random number.
 * @returns {string} A unique task ID
 */
function generateTaskId() {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Gets the current date in YYYY-MM-DD format.
 * @returns {string} Today's date
 */
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

/**
 * Compares two dates and returns the difference in days.
 * Negative means date1 is before date2, positive means date1 is after date2.
 * @param {string} date1 - Date in YYYY-MM-DD format
 * @param {string} date2 - Date in YYYY-MM-DD format
 * @returns {number} Number of days difference
 */
function getDaysDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const timeDiff = d2 - d1;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

/**
 * Determines if a task is overdue based on due date and completion status.
 * @param {object} task - The task object
 * @returns {boolean} True if task is overdue
 */
function isTaskOverdue(task) {
  if (task.completed) {
    return false;
  }
  const today = getTodayDate();
  return task.dueDate < today;
}

/**
 * Determines if a task is due today.
 * @param {object} task - The task object
 * @returns {boolean} True if task is due today
 */
function isTaskDueToday(task) {
  return task.dueDate === getTodayDate() && !task.completed;
}

/**
 * Determines if a task is due soon (within 7 days).
 * @param {object} task - The task object
 * @returns {boolean} True if task is due within 7 days
 */
function isTaskDueSoon(task) {
  if (task.completed) {
    return false;
  }
  const today = getTodayDate();
  const daysDiff = getDaysDifference(today, task.dueDate);
  return daysDiff > 0 && daysDiff <= 7;
}

/**
 * Formats a date string from YYYY-MM-DD to a readable format.
 * @param {string} dateStr - Date in YYYY-MM-DD format
 * @returns {string} Formatted date like "Jan 15, 2026"
 */
function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Shows a notification message to the user.
 * @param {string} message - Message to display
 * @param {string} type - Type of message: 'success', 'error', 'info'
 * @param {number} duration - Duration in milliseconds before removing
 */
function showNotification(message, type = "success", duration = 3000) {
  const container = document.getElementById("form-message");
  if (!container) return;

  container.textContent = message;
  container.className = `message ${type}`;
  container.style.display = "block";

  setTimeout(() => {
    container.style.display = "none";
  }, duration);
}

/**
 * Shows a confirmation dialog to the user.
 * @param {string} message - Confirmation message
 * @returns {boolean} True if user confirms, false if cancels
 */
function showConfirmDialog(message) {
  return confirm(message);
}

// ============================================
// LOCALSTORAGE MANAGEMENT
// ============================================

/**
 * Initializes the application storage with empty data if it doesn't exist.
 */
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const initialData = {
      tasks: [],
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
}

/**
 * Gets all tasks from localStorage.
 * @returns {array} Array of all task objects
 */
function getAllTasks() {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  const parsed = JSON.parse(data);
  return parsed.tasks || [];
}

/**
 * Gets a specific task by ID from localStorage.
 * @param {string} taskId - The task ID to retrieve
 * @returns {object|null} The task object or null if not found
 */
function getTaskById(taskId) {
  const tasks = getAllTasks();
  return tasks.find((task) => task.id === taskId) || null;
}

/**
 * Saves all tasks to localStorage and updates the last modified timestamp.
 * @param {array} tasks - Array of task objects to save
 */
function saveTasks(tasks) {
  const data = {
    tasks: tasks,
    lastUpdated: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  dispatchStorageEvent();
}

/**
 * Adds a new task to localStorage.
 * @param {object} taskData - Task object to add
 * @returns {object} The added task with generated ID
 */
function addTask(taskData) {
  const task = {
    id: generateTaskId(),
    ...taskData,
    completed: false,
    dateAdded: getTodayDate(),
    dateCompleted: null,
  };

  const tasks = getAllTasks();
  tasks.push(task);
  saveTasks(tasks);

  return task;
}

/**
 * Updates an existing task in localStorage.
 * @param {string} taskId - The ID of the task to update
 * @param {object} updates - Object containing fields to update
 * @returns {object|null} The updated task or null if not found
 */
function updateTask(taskId, updates) {
  const tasks = getAllTasks();
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updates,
    id: taskId,
    dateAdded: tasks[taskIndex].dateAdded,
  };

  saveTasks(tasks);
  return tasks[taskIndex];
}

/**
 * Deletes a task from localStorage by ID.
 * @param {string} taskId - The ID of the task to delete
 * @returns {boolean} True if deleted, false if not found
 */
function deleteTask(taskId) {
  const tasks = getAllTasks();
  const filteredTasks = tasks.filter((t) => t.id !== taskId);

  if (filteredTasks.length === tasks.length) {
    return false;
  }

  saveTasks(filteredTasks);
  return true;
}

/**
 * Toggles the completion status of a task.
 * @param {string} taskId - The ID of the task to toggle
 * @returns {object|null} The updated task or null if not found
 */
function toggleTaskCompletion(taskId) {
  const task = getTaskById(taskId);

  if (!task) {
    return null;
  }

  const updates = {
    completed: !task.completed,
    dateCompleted: !task.completed ? getTodayDate() : null,
  };

  return updateTask(taskId, updates);
}

/**
 * Clears all tasks from localStorage.
 * WARNING: This is destructive and cannot be undone.
 */
function clearAllTasks() {
  saveTasks([]);
}

/**
 * Gets statistics about all tasks.
 * @returns {object} Object containing task statistics
 */
function getTaskStatistics() {
  const tasks = getAllTasks();
  const completedTasks = tasks.filter((t) => t.completed);
  const pendingTasks = tasks.filter((t) => !t.completed);
  const overdueTasks = tasks.filter((t) => isTaskOverdue(t));

  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const completionPercent =
    totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  return {
    totalTasks,
    completedTasks: completedCount,
    pendingTasks: pendingTasks.length,
    overdueTasks: overdueTasks.length,
    completionPercent,
    tasksDueToday: tasks.filter((t) => isTaskDueToday(t)).length,
    tasksDueSoon: tasks.filter((t) => isTaskDueSoon(t)).length,
  };
}

/**
 * Dispatches a custom storage event to trigger updates across tabs and windows.
 */
function dispatchStorageEvent() {
  window.dispatchEvent(new Event("localStorageUpdated"));
}

/**
 * Loads sample/demo tasks into localStorage for demonstration.
 */
function loadSampleTasks() {
  const today = getTodayDate();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const nextWeekStr = nextWeek.toISOString().split("T")[0];

  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 30);
  const nextMonthStr = nextMonth.toISOString().split("T")[0];

  const sampleTasks = [
    {
      id: generateTaskId(),
      title: "Complete Programming Assignment #3",
      courseCode: "CSE 310",
      courseName: "Applied Programming",
      description:
        "Implement a student task manager application with HTML, CSS, and JavaScript. Must include CRUD operations, localStorage persistence, and responsive design.",
      dueDate: tomorrowStr,
      priority: "high",
      category: "assignment",
      studyTime: 4,
      completed: false,
      dateAdded: today,
      dateCompleted: null,
    },
    {
      id: generateTaskId(),
      title: "Study for Database Exam",
      courseCode: "CS 345",
      courseName: "Database Systems",
      description:
        "Review chapters 8-12 on indexing, transactions, and query optimization. Prepare flashcards for key concepts.",
      dueDate: nextWeekStr,
      priority: "high",
      category: "exam",
      studyTime: 6,
      completed: false,
      dateAdded: today,
      dateCompleted: null,
    },
    {
      id: generateTaskId(),
      title: "Mathematics Problem Set 5",
      courseCode: "MATH 201",
      courseName: "Calculus II",
      description:
        "Complete exercises 1-25 on integration techniques. Show all work and provide step-by-step solutions.",
      dueDate: today,
      priority: "medium",
      category: "assignment",
      studyTime: 2,
      completed: false,
      dateAdded: today,
      dateCompleted: null,
    },
    {
      id: generateTaskId(),
      title: "Read Chapter 7: Web Security",
      courseCode: "CS 380",
      courseName: "Cybersecurity Fundamentals",
      description:
        "Read and summarize Chapter 7 on web application security vulnerabilities and mitigation strategies.",
      dueDate: tomorrow.toISOString().split("T")[0],
      priority: "medium",
      category: "reading",
      studyTime: 1.5,
      completed: true,
      dateAdded: today,
      dateCompleted: today,
    },
    {
      id: generateTaskId(),
      title: "Software Engineering Project Phase 2",
      courseCode: "CS 425",
      courseName: "Software Engineering",
      description:
        "Complete system design document and create UML diagrams for the class registration system. Include class diagrams, sequence diagrams, and use case diagrams.",
      dueDate: nextMonthStr,
      priority: "high",
      category: "project",
      studyTime: 8,
      completed: false,
      dateAdded: today,
      dateCompleted: null,
    },
    {
      id: generateTaskId(),
      title: "Algorithm Analysis Quiz",
      courseCode: "CS 361",
      courseName: "Algorithms",
      description:
        "Quiz on Big O notation, time complexity analysis, and sorting algorithms. 10 questions, 20 minutes.",
      dueDate: today,
      priority: "low",
      category: "quiz",
      studyTime: 0.5,
      completed: true,
      dateAdded: today,
      dateCompleted: today,
    },
    {
      id: generateTaskId(),
      title: "Python Data Analysis Project",
      courseCode: "CS 360",
      courseName: "Data Science Fundamentals",
      description:
        "Analyze the provided dataset using pandas and matplotlib. Create visualizations and write a summary report with insights and conclusions.",
      dueDate: nextWeekStr,
      priority: "high",
      category: "project",
      studyTime: 5,
      completed: false,
      dateAdded: today,
      dateCompleted: null,
    },
  ];

  saveTasks(sampleTasks);
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize storage when app loads
initializeStorage();

// Listen for storage changes in other tabs
window.addEventListener("storage", function (e) {
  if (e.key === STORAGE_KEY) {
    dispatchStorageEvent();
  }
});
