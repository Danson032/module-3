/**
 * dashboard.js - Dashboard Statistics and Display
 *
 * This file handles dashboard functionality including:
 * - Displaying task statistics
 * - Showing upcoming tasks
 * - Showing tasks due today
 * - Showing recently completed tasks
 * - Loading and clearing sample data
 */

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initializes the dashboard page when DOM is fully loaded.
 * Sets up event listeners and displays initial data.
 */
function initDashboard() {
  updateDashboardStats();
  updateUpcomingTasks();
  updateTodayTasks();
  updateRecentlyCompletedTasks();
  setupDashboardEventListeners();

  // Listen for storage updates
  window.addEventListener("localStorageUpdated", updateAllDashboardContent);
}

/**
 * Sets up event listeners for dashboard buttons.
 */
function setupDashboardEventListeners() {
  const loadSampleBtn = document.getElementById("load-sample-btn");
  const clearAllBtn = document.getElementById("clear-all-btn");

  if (loadSampleBtn) {
    loadSampleBtn.addEventListener("click", handleLoadSampleData);
  }

  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", handleClearAllData);
  }
}

/**
 * Updates all dashboard content at once.
 */
function updateAllDashboardContent() {
  updateDashboardStats();
  updateUpcomingTasks();
  updateTodayTasks();
  updateRecentlyCompletedTasks();
}

// ============================================
// STATISTICS DISPLAY
// ============================================

/**
 * Updates and displays task statistics on the dashboard.
 */
function updateDashboardStats() {
  const stats = getTaskStatistics();

  // Update total tasks
  const totalTasksEl = document.getElementById("total-tasks");
  if (totalTasksEl) {
    totalTasksEl.textContent = stats.totalTasks;
  }

  // Update completed tasks
  const completedTasksEl = document.getElementById("completed-tasks");
  if (completedTasksEl) {
    completedTasksEl.textContent = stats.completedTasks;
  }

  // Update pending tasks
  const pendingTasksEl = document.getElementById("pending-tasks");
  if (pendingTasksEl) {
    pendingTasksEl.textContent = stats.pendingTasks;
  }

  // Update overdue tasks
  const overdueTasksEl = document.getElementById("overdue-tasks");
  if (overdueTasksEl) {
    overdueTasksEl.textContent = stats.overdueTasks;
  }

  // Update completion percentage and progress bar
  const completionPercentEl = document.getElementById("completion-percent");
  const progressFillEl = document.getElementById("progress-fill");

  if (completionPercentEl) {
    completionPercentEl.textContent = `${stats.completionPercent}%`;
  }

  if (progressFillEl) {
    progressFillEl.style.width = `${stats.completionPercent}%`;
  }
}

// ============================================
// UPCOMING TASKS DISPLAY
// ============================================

/**
 * Updates the list of tasks due soon (within 7 days).
 */
function updateUpcomingTasks() {
  const allTasks = getAllTasks();
  const upcomingTasks = allTasks.filter((task) => isTaskDueSoon(task));

  // Sort by due date
  upcomingTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const upcomingContainer = document.getElementById("upcoming-tasks-list");
  if (!upcomingContainer) return;

  if (upcomingTasks.length === 0) {
    upcomingContainer.innerHTML =
      '<p class="empty-message">No upcoming tasks</p>';
  } else {
    upcomingContainer.innerHTML = upcomingTasks
      .slice(0, 5) // Show top 5 upcoming tasks
      .map((task) => createDashboardTaskElement(task))
      .join("");
  }
}

/**
 * Updates the list of tasks due today.
 */
function updateTodayTasks() {
  const allTasks = getAllTasks();
  const todayTasks = allTasks.filter((task) => isTaskDueToday(task));

  // Sort by priority
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  todayTasks.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  );

  const todayContainer = document.getElementById("today-tasks-list");
  if (!todayContainer) return;

  if (todayTasks.length === 0) {
    todayContainer.innerHTML =
      '<p class="empty-message">No tasks due today</p>';
  } else {
    todayContainer.innerHTML = todayTasks
      .map((task) => createDashboardTaskElement(task))
      .join("");
  }
}

/**
 * Updates the list of recently completed tasks.
 */
function updateRecentlyCompletedTasks() {
  const allTasks = getAllTasks();
  const completedTasks = allTasks.filter((task) => task.completed);

  // Sort by completion date (most recent first)
  completedTasks.sort(
    (a, b) => new Date(b.dateCompleted) - new Date(a.dateCompleted),
  );

  const recentContainer = document.getElementById("recent-tasks-list");
  if (!recentContainer) return;

  if (completedTasks.length === 0) {
    recentContainer.innerHTML =
      '<p class="empty-message">No completed tasks</p>';
  } else {
    recentContainer.innerHTML = completedTasks
      .slice(0, 5) // Show top 5 recently completed tasks
      .map((task) => createDashboardTaskElement(task))
      .join("");
  }
}

/**
 * Creates a simplified task element for dashboard display.
 * @param {object} task - The task to render
 * @returns {string} HTML string for the task
 */
function createDashboardTaskElement(task) {
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
  } else if (isCompleted && task.dateCompleted) {
    dateLabel = `Completed ${formatDate(task.dateCompleted)}`;
  }

  const html = `
        <div class="task-item ${priorityClass} ${isCompleted ? "completed" : ""}">
            <div class="task-main">
                <div class="task-title">${escapeHtml(task.title)}</div>
                <div class="task-course">${escapeHtml(task.courseCode)} - ${escapeHtml(task.courseName)}</div>
                <div class="task-meta">
                    <span class="task-badge badge-${task.priority}">${capitalize(task.priority)}</span>
                    <span class="task-date">${dateLabel}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn btn-sm btn-success" onclick="handleToggleCompletion('${task.id}')" title="${isCompleted ? "Mark as Pending" : "Mark as Completed"}">
                    ${isCompleted ? "↩️" : "✓"}
                </button>
                <a href="tasks.html" class="btn btn-sm btn-primary" title="Go to Tasks">→</a>
            </div>
        </div>
    `;

  return html;
}

// ============================================
// SAMPLE DATA FUNCTIONALITY
// ============================================

/**
 * Handles loading sample/demo tasks.
 */
function handleLoadSampleData() {
  const allTasks = getAllTasks();

  if (allTasks.length > 0) {
    if (
      !showConfirmDialog(
        "This will add sample tasks to your existing tasks. Continue?",
      )
    ) {
      return;
    }
  }

  try {
    loadSampleTasks();
    updateAllDashboardContent();
    showNotification("Sample data loaded successfully!", "success");
  } catch (error) {
    console.error("Error loading sample data:", error);
    showNotification("Error loading sample data. Please try again.", "error");
  }
}

/**
 * Handles clearing all tasks with a confirmation dialog.
 */
function handleClearAllData() {
  if (
    !showConfirmDialog(
      "Are you sure you want to delete ALL tasks? This cannot be undone. This will permanently remove all your data.",
    )
  ) {
    return;
  }

  // Double confirmation for destructive action
  if (
    !showConfirmDialog(
      "Are you absolutely sure? This action cannot be reversed.",
    )
  ) {
    return;
  }

  try {
    clearAllTasks();
    updateAllDashboardContent();
    showNotification("All tasks have been cleared.", "success");
  } catch (error) {
    console.error("Error clearing tasks:", error);
    showNotification("Error clearing tasks. Please try again.", "error");
  }
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

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initDashboard);
