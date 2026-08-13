/**
 * tasks.js - Task Management UI Functions
 *
 * This file handles the user interface for task management, including:
 * - Adding new tasks
 * - Editing existing tasks
 * - Deleting tasks
 * - Rendering tasks in the DOM
 * - Searching, filtering, and sorting tasks
 */

// ============================================
// DOM REFERENCES
// ============================================

let taskForm, editForm, editModal, modalClose, modalCancel;
let searchInput, filterStatus, filterPriority, filterCategory, sortSelect;
let tasksContainer, resetFiltersBtn;

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initializes the tasks page when DOM is fully loaded.
 * Sets up event listeners for all form controls and buttons.
 */
function initTasksPage() {
  // Get form elements
  taskForm = document.getElementById("task-form");
  editForm = document.getElementById("edit-form");
  editModal = document.getElementById("edit-modal");
  modalClose = document.querySelector(".modal-close");
  modalCancel = document.getElementById("modal-cancel");

  // Get filter and search elements
  searchInput = document.getElementById("search-input");
  filterStatus = document.getElementById("filter-status");
  filterPriority = document.getElementById("filter-priority");
  filterCategory = document.getElementById("filter-category");
  sortSelect = document.getElementById("sort-select");
  tasksContainer = document.getElementById("tasks-container");
  resetFiltersBtn = document.getElementById("reset-filters");

  // Add event listeners
  if (taskForm) {
    taskForm.addEventListener("submit", handleAddTask);
    taskForm.addEventListener("reset", clearFormErrors);
  }

  if (editForm) {
    editForm.addEventListener("submit", handleEditTask);
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeEditModal);
  }

  if (modalCancel) {
    modalCancel.addEventListener("click", closeEditModal);
  }

  if (editModal) {
    editModal.addEventListener("click", function (e) {
      if (e.target === editModal) {
        closeEditModal();
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", renderTasks);
  }

  if (filterStatus) {
    filterStatus.addEventListener("change", renderTasks);
  }

  if (filterPriority) {
    filterPriority.addEventListener("change", renderTasks);
  }

  if (filterCategory) {
    filterCategory.addEventListener("change", renderTasks);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", renderTasks);
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", resetFilters);
  }

  // Listen for storage updates
  window.addEventListener("localStorageUpdated", renderTasks);

  // Initial render
  renderTasks();
}

// ============================================
// FORM HANDLING
// ============================================

/**
 * Validates a task form and displays error messages for invalid fields.
 * @param {FormData} formData - The form data to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateTaskForm(formData) {
  const requiredFields = [
    "title",
    "courseCode",
    "courseName",
    "priority",
    "category",
    "dueDate",
  ];
  let isValid = true;

  // Clear all error messages
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
    el.classList.remove("show");
  });

  // Validate each required field
  requiredFields.forEach((field) => {
    const value = formData.get(field);
    const errorElement = document.getElementById(`error-${field}`);

    if (!value || value.trim() === "") {
      if (errorElement) {
        errorElement.textContent = `${capitalize(field)} is required`;
        errorElement.classList.add("show");
      }
      isValid = false;
    }
  });

  // Validate due date is not in the past
  const dueDate = formData.get("dueDate");
  if (dueDate) {
    const today = getTodayDate();
    if (dueDate < today) {
      const errorElement = document.getElementById("error-dueDate");
      if (errorElement) {
        errorElement.textContent = "Due date cannot be in the past";
        errorElement.classList.add("show");
      }
      isValid = false;
    }
  }

  // Validate study time if provided
  const studyTime = formData.get("studyTime");
  if (studyTime && isNaN(parseFloat(studyTime))) {
    isValid = false;
  }

  return isValid;
}

/**
 * Clears all error messages from the form.
 */
function clearFormErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
    el.classList.remove("show");
  });
}

/**
 * Handles the form submission for adding a new task.
 * @param {Event} e - The form submission event
 */
function handleAddTask(e) {
  e.preventDefault();

  const formData = new FormData(taskForm);

  // Validate form
  if (!validateTaskForm(formData)) {
    return;
  }

  try {
    // Create task object
    const taskData = {
      title: formData.get("title").trim(),
      courseCode: formData.get("courseCode").trim(),
      courseName: formData.get("courseName").trim(),
      description: formData.get("description").trim(),
      dueDate: formData.get("dueDate"),
      priority: formData.get("priority"),
      category: formData.get("category"),
      studyTime: formData.get("studyTime")
        ? parseFloat(formData.get("studyTime"))
        : 0,
    };

    // Add to storage
    addTask(taskData);

    // Show success message
    showNotification("Task added successfully!", "success");

    // Reset form
    taskForm.reset();
    clearFormErrors();

    // Re-render tasks
    renderTasks();
  } catch (error) {
    console.error("Error adding task:", error);
    showNotification("Error adding task. Please try again.", "error");
  }
}

/**
 * Opens the edit modal and populates it with the selected task's data.
 * @param {string} taskId - The ID of the task to edit
 */
function openEditModal(taskId) {
  const task = getTaskById(taskId);

  if (!task) {
    showNotification("Task not found", "error");
    return;
  }

  // Populate form with task data
  document.getElementById("edit-task-id").value = task.id;
  document.getElementById("edit-task-title").value = task.title;
  document.getElementById("edit-task-course-code").value = task.courseCode;
  document.getElementById("edit-task-course-name").value = task.courseName;
  document.getElementById("edit-task-priority").value = task.priority;
  document.getElementById("edit-task-category").value = task.category;
  document.getElementById("edit-task-due-date").value = task.dueDate;
  document.getElementById("edit-task-description").value = task.description;
  document.getElementById("edit-task-study-time").value = task.studyTime || "";

  // Show modal
  editModal.classList.add("show");
}

/**
 * Closes the edit modal.
 */
function closeEditModal() {
  editModal.classList.remove("show");
  editForm.reset();
}

/**
 * Handles the form submission for editing an existing task.
 * @param {Event} e - The form submission event
 */
function handleEditTask(e) {
  e.preventDefault();

  const taskId = document.getElementById("edit-task-id").value;
  const formData = new FormData(editForm);

  try {
    // Create updates object
    const updates = {
      title: formData.get("title").trim(),
      courseCode: formData.get("courseCode").trim(),
      courseName: formData.get("courseName").trim(),
      description: formData.get("description").trim(),
      dueDate: formData.get("dueDate"),
      priority: formData.get("priority"),
      category: formData.get("category"),
      studyTime: formData.get("studyTime")
        ? parseFloat(formData.get("studyTime"))
        : 0,
    };

    // Update in storage
    updateTask(taskId, updates);

    // Show success message
    showNotification("Task updated successfully!", "success");

    // Close modal
    closeEditModal();

    // Re-render tasks
    renderTasks();
  } catch (error) {
    console.error("Error updating task:", error);
    showNotification("Error updating task. Please try again.", "error");
  }
}

/**
 * Handles task deletion with confirmation dialog.
 * @param {string} taskId - The ID of the task to delete
 */
function handleDeleteTask(taskId) {
  if (
    !showConfirmDialog(
      "Are you sure you want to delete this task? This cannot be undone.",
    )
  ) {
    return;
  }

  try {
    if (deleteTask(taskId)) {
      showNotification("Task deleted successfully!", "success");
      renderTasks();
    } else {
      showNotification("Task not found", "error");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    showNotification("Error deleting task. Please try again.", "error");
  }
}

/**
 * Handles task completion toggle.
 * @param {string} taskId - The ID of the task to toggle
 */
function handleToggleCompletion(taskId) {
  try {
    const task = toggleTaskCompletion(taskId);

    if (task) {
      const message = task.completed
        ? "Task marked as completed!"
        : "Task marked as pending!";
      showNotification(message, "success");
      renderTasks();
    } else {
      showNotification("Task not found", "error");
    }
  } catch (error) {
    console.error("Error toggling task:", error);
    showNotification("Error updating task. Please try again.", "error");
  }
}

// ============================================
// FILTERING AND SEARCHING
// ============================================

/**
 * Gets the current filter criteria from the form controls.
 * @returns {object} Object containing current filter values
 */
function getFilterCriteria() {
  return {
    search: searchInput ? searchInput.value.toLowerCase() : "",
    status: filterStatus ? filterStatus.value : "all",
    priority: filterPriority ? filterPriority.value : "all",
    category: filterCategory ? filterCategory.value : "all",
    sortBy: sortSelect ? sortSelect.value : "dueDate",
  };
}

/**
 * Resets all filters to their default values.
 */
function resetFilters() {
  if (searchInput) searchInput.value = "";
  if (filterStatus) filterStatus.value = "all";
  if (filterPriority) filterPriority.value = "all";
  if (filterCategory) filterCategory.value = "all";
  if (sortSelect) sortSelect.value = "dueDate";
  renderTasks();
}

/**
 * Filters and searches tasks based on current filter criteria.
 * @param {array} tasks - Array of tasks to filter
 * @returns {array} Filtered array of tasks
 */
function applyFiltersAndSearch(tasks) {
  const criteria = getFilterCriteria();

  return tasks.filter((task) => {
    // Search filter - searches in title, course code, course name, and description
    if (criteria.search) {
      const searchableText =
        `${task.title} ${task.courseCode} ${task.courseName} ${task.description}`.toLowerCase();
      if (!searchableText.includes(criteria.search)) {
        return false;
      }
    }

    // Status filter
    if (criteria.status !== "all") {
      if (criteria.status === "pending" && task.completed) {
        return false;
      }
      if (criteria.status === "completed" && !task.completed) {
        return false;
      }
      if (criteria.status === "overdue" && !isTaskOverdue(task)) {
        return false;
      }
    }

    // Priority filter
    if (criteria.priority !== "all" && task.priority !== criteria.priority) {
      return false;
    }

    // Category filter
    if (criteria.category !== "all" && task.category !== criteria.category) {
      return false;
    }

    return true;
  });
}

/**
 * Sorts tasks based on the selected sort criteria.
 * @param {array} tasks - Array of tasks to sort
 * @param {string} sortBy - The field to sort by
 * @returns {array} Sorted array of tasks
 */
function sortTasks(tasks, sortBy) {
  const sortedTasks = [...tasks];

  switch (sortBy) {
    case "dueDate":
      sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      break;
    case "priority":
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      sortedTasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
      );
      break;
    case "course":
      sortedTasks.sort((a, b) => a.courseCode.localeCompare(b.courseCode));
      break;
    case "status":
      sortedTasks.sort((a, b) => {
        if (a.completed === b.completed) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return a.completed ? 1 : -1;
      });
      break;
    case "dateAdded":
      sortedTasks.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
    default:
      break;
  }

  return sortedTasks;
}

// ============================================
// RENDERING
// ============================================

/**
 * Creates HTML for a single task element.
 * @param {object} task - The task to render
 * @returns {string} HTML string for the task
 */
function createTaskElement(task) {
  const isOverdue = isTaskOverdue(task);
  const isDueToday = isTaskDueToday(task);
  const isCompleted = task.completed;

  let priorityClass = `${task.priority}-priority`;
  if (isOverdue) {
    priorityClass = "overdue";
  }

  const formattedDate = formatDate(task.dueDate);

  // Determine due date label
  let dateLabel = formattedDate;
  if (isDueToday) {
    dateLabel = "Due Today";
  } else if (isOverdue) {
    dateLabel = `Overdue (${formattedDate})`;
  }

  const html = `
        <div class="task-item ${priorityClass} ${isCompleted ? "completed" : ""}">
            <div class="task-main">
                <div class="task-title">${escapeHtml(task.title)}</div>
                <div class="task-course">${escapeHtml(task.courseCode)} - ${escapeHtml(task.courseName)}</div>
                <div class="task-meta">
                    <span class="task-badge badge-${task.priority}">${capitalize(task.priority)} Priority</span>
                    <span class="task-badge badge-category">${capitalize(task.category)}</span>
                    <span class="task-date">${dateLabel}</span>
                    ${task.studyTime > 0 ? `<span class="task-study-time">⏱️ ${task.studyTime}h</span>` : ""}
                    ${isCompleted ? '<span class="task-badge" style="background-color: #dcfce7; color: #16a34a;">✓ Completed</span>' : ""}
                </div>
                ${task.description ? `<div class="task-description" style="margin-top: 8px; color: #6b7280; font-size: 0.875rem;">${escapeHtml(task.description)}</div>` : ""}
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-success" onclick="handleToggleCompletion('${task.id}')" title="${isCompleted ? "Mark as Pending" : "Mark as Completed"}">
                    ${isCompleted ? "↩️ Pending" : "✓ Complete"}
                </button>
                <button class="btn btn-sm btn-primary" onclick="openEditModal('${task.id}')" title="Edit Task">
                    ✎ Edit
                </button>
                <button class="btn btn-sm btn-danger" onclick="handleDeleteTask('${task.id}')" title="Delete Task">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `;

  return html;
}

/**
 * Escapes HTML special characters to prevent XSS attacks.
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Renders all tasks in the tasks container based on current filters and search.
 */
function renderTasks() {
  const allTasks = getAllTasks();
  const filteredTasks = applyFiltersAndSearch(allTasks);
  const sortedTasks = sortTasks(filteredTasks, getFilterCriteria().sortBy);

  // Update task count
  const taskCount = document.getElementById("task-count");
  if (taskCount) {
    const count = sortedTasks.length;
    taskCount.textContent = `${count} task${count !== 1 ? "s" : ""}`;
  }

  // Render tasks
  if (tasksContainer) {
    if (sortedTasks.length === 0) {
      tasksContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <h3>No tasks found</h3>
                    <p>${allTasks.length === 0 ? "Add a task above to get started" : "Try adjusting your filters or search"}</p>
                </div>
            `;
    } else {
      tasksContainer.innerHTML = sortedTasks
        .map((task) => createTaskElement(task))
        .join("");
    }
  }
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initTasksPage);
