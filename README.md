# Student Task Manager

A professional web application for college and university students to organize, track, and manage their academic assignments, projects, exams, quizzes, and other study tasks.

## Description

Student Task Manager is a lightweight, browser-based task management application designed specifically for students managing multiple courses and assignments. The application helps students stay organized by providing an intuitive interface for creating tasks, tracking progress, filtering by various criteria, and maintaining a clear view of upcoming deadlines.

**Problem Solved:** University students often struggle with managing multiple courses, deadlines, and assignment types. This application provides a centralized, easy-to-use tool for organizing academic workload without requiring any external accounts or infrastructure.

## Features

### Core Features

- **📊 Dashboard** - Comprehensive overview of your academic workload with statistics
- **➕ Add Tasks** - Create new academic tasks with detailed information
- **✏️ Edit Tasks** - Modify existing tasks when plans change
- **🗑️ Delete Tasks** - Remove completed or obsolete tasks
- **✅ Mark Completion** - Track task progress and completion status
- **🔍 Search** - Find tasks quickly by title, course, or description
- **🔽 Filter** - Organize by status, priority, category, or due date
- **↕️ Sort** - Arrange tasks by due date, priority, course, or status
- **💾 Local Storage** - All data saved locally on your device with automatic persistence

### Dashboard Statistics

- Total number of tasks
- Completed tasks count
- Pending tasks count
- Overdue tasks count
- Completion percentage with progress bar
- Tasks due today
- Upcoming tasks (next 7 days)
- Recently completed tasks

### Task Organization

- **Task Fields:**
  - Title (required)
  - Course Code (required, e.g., CSE 310)
  - Course Name (required)
  - Description (optional)
  - Due Date (required)
  - Priority (High, Medium, Low)
  - Category (Assignment, Project, Exam, Quiz, Reading, Other)
  - Estimated Study Time (optional, in hours)

### Advanced Filtering

- Filter by completion status (All, Pending, Completed, Overdue)
- Filter by priority level
- Filter by task category
- Combined filtering with search
- Multiple sort options

### User Experience

- ✨ Professional, modern interface
- 📱 Fully responsive design (desktop, tablet, mobile)
- ⌨️ Keyboard-friendly controls
- ♿ Accessible labels and semantic HTML
- 🎨 Good color contrast and visual hierarchy
- 🔔 Success and error notifications
- 🚨 Confirmation dialogs for destructive actions
- 📝 Empty state messages

## Technologies Used

- **HTML5** - Semantic markup for accessibility
- **CSS3** - Modern styling with flexbox, grid, and media queries
- **Vanilla JavaScript** - Pure JavaScript without frameworks
- **Browser LocalStorage API** - Local data persistence
- **No external dependencies** - Completely self-contained

## How to Run

### Option 1: Open in Browser (Simplest)

Simply open the `index.html` file in any modern web browser:

1. Navigate to the project folder
2. Double-click `index.html`
3. The application will load immediately

### Option 2: Using a Local Web Server

For a more professional development experience:

**Using Python 3:**

```bash
cd student-task-manager
python -m http.server 8000 --directory .
```

Then open `http://localhost:8000` in your browser.

**Using Node.js (if installed):**

```bash
cd student-task-manager
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

**Using PHP:**

```bash
cd student-task-manager
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Deploy to GitHub Pages

The application is ready to be deployed to GitHub Pages. See [GitHub Pages Configuration](#github-pages-configuration) section below.

## How to Use

### 1. Add a Task

1. Navigate to the **Tasks** page
2. Fill in the task form:
   - Enter task title
   - Enter course code (e.g., CSE 310)
   - Enter course name
   - Select priority level
   - Select task category
   - Choose due date
   - (Optional) Add description and estimated study time
3. Click **Add Task**
4. Task appears in your task list immediately
5. Data is automatically saved to browser storage

### 2. View Tasks

1. Navigate to the **Tasks** page
2. All tasks are displayed with:
   - Task title and course information
   - Priority level and category badges
   - Due date with indicators (today, overdue, upcoming)
   - Study time estimate
   - Action buttons for each task

### 3. Edit a Task

1. On the Tasks page, find the task you want to edit
2. Click the **✎ Edit** button
3. Modify the task details in the modal
4. Click **Update Task**
5. Changes are saved automatically

### 4. Complete a Task

1. Click the **✓ Complete** button on any task
2. Task will be marked as completed (visual change)
3. Can click **↩️ Pending** to undo completion

### 5. Delete a Task

1. Click the **🗑️ Delete** button on any task
2. Confirm deletion in the dialog
3. Task is permanently removed

### 6. Search for Tasks

1. On the Tasks page, use the **Search** box at the top
2. Type to search by:
   - Task title
   - Course code
   - Course name
   - Task description
3. Results update dynamically as you type

### 7. Filter Tasks

1. Use the **Filter** controls to narrow tasks by:
   - **Status:** All, Pending, Completed, or Overdue
   - **Priority:** All, High, Medium, or Low
   - **Category:** Assignment, Project, Exam, Quiz, Reading, or Other
2. Filters work in combination
3. Click **Reset Filters** to clear all filters

### 8. Sort Tasks

1. Use the **Sort by** dropdown to arrange tasks:
   - **Due Date** - Earlier dates first
   - **Priority** - High to Low priority
   - **Course** - Alphabetical by course code
   - **Status** - Pending first, then completed
   - **Date Added** - Most recent first

### 9. Dashboard Overview

1. Navigate to the **Dashboard** page
2. View key statistics:
   - Total tasks count
   - Completed tasks
   - Pending tasks
   - Overdue tasks count
   - Completion percentage
3. See tasks due today and upcoming
4. Review recently completed tasks
5. Click task cards to mark complete or view details
6. Use quick action buttons for common operations

### 10. Load Sample Data

1. On Dashboard, click **Load Sample Data**
2. Sample tasks are added demonstrating various categories and priorities
3. Great for exploring features without manually creating tasks
4. Can be cleared anytime

### 11. Clear All Data

1. On Dashboard, click **Clear All Data**
2. Confirm the action (requires double confirmation for safety)
3. All tasks are permanently deleted
4. Application resets to empty state

## Data Storage

### How It Works

- All tasks are stored locally in your browser using the **LocalStorage API**
- Data is automatically saved whenever you add, edit, or delete a task
- Data persists even after closing the browser or shutting down the computer

### Storage Characteristics

- ✅ No server or account required
- ✅ Complete privacy - data never leaves your device
- ✅ Works offline - no internet connection needed
- ✅ Automatic backups - changes saved immediately
- ⚠️ Browser-specific - clearing browser data will delete tasks
- ⚠️ Device-specific - tasks only available on this device and browser

### Data Persistence

- Data survives browser restarts
- Data survives computer restarts
- Data is cleared only when:
  - User clicks "Clear All Data"
  - User manually clears browser storage/cache
  - Browser data is reset

## Project Structure

```
student-task-manager/
│
├── index.html              # Main dashboard page
├── tasks.html              # Task management page
├── about.html              # Information page
│
├── css/
│   └── style.css          # All styling (responsive design)
│
├── js/
│   ├── app.js             # Core app logic and localStorage management
│   ├── tasks.js           # Task UI and task management functions
│   └── dashboard.js       # Dashboard statistics and display
│
├── images/
│   └── README.txt         # Images directory placeholder
│
├── .gitignore             # Git ignore file
│
└── README.md              # This file
```

## File Descriptions

### HTML Files

- **index.html** - Dashboard with statistics, sample data buttons, upcoming tasks, today's tasks, and recently completed tasks
- **tasks.html** - Task management interface with form, search, filters, and task list
- **about.html** - Information about the application, features, and usage guide

### JavaScript Files

- **app.js** - Core application logic:
  - LocalStorage management (CRUD operations)
  - Data utility functions
  - Date manipulation and comparison
  - Task statistics calculation
  - Sample data generation

- **tasks.js** - Task management interface:
  - Form validation and submission
  - Task rendering
  - Search functionality
  - Filter logic
  - Sort options
  - Modal for editing

- **dashboard.js** - Dashboard functionality:
  - Statistics display and updates
  - Upcoming tasks display
  - Today's tasks display
  - Completed tasks display
  - Sample data loading
  - Data clearing with confirmation

### CSS File

- **style.css** - Comprehensive styling:
  - CSS custom properties (variables) for consistent theming
  - Responsive grid and flexbox layouts
  - Mobile-first design approach
  - Media queries for tablet and mobile screens
  - Professional color scheme
  - Accessibility features (good contrast, readable fonts)
  - Print styles for printing tasks

## Accessibility

The application includes several accessibility features:

- ♿ **Semantic HTML** - Proper use of headings, labels, and form elements
- 🔤 **Font Sizes** - Large, readable fonts (minimum 16px for body text)
- 🎨 **Color Contrast** - WCAG AA compliant contrast ratios
- ⌨️ **Keyboard Navigation** - All features accessible via keyboard
- 🏷️ **Labels** - All form inputs have associated labels
- 🎯 **Focus Indicators** - Visible focus states for keyboard users
- 📝 **Error Messages** - Clear, descriptive error messages
- 🔔 **Notifications** - Screen reader friendly notifications

## Responsive Design

The application is fully responsive and works on:

- **Desktop** (1200px and up)
  - Full multi-column layout
  - All features easily accessible
  - Optimized for mouse and keyboard

- **Tablet** (768px to 1199px)
  - Adjusted grid layouts
  - Touch-friendly button sizes
  - Optimized spacing

- **Mobile** (480px to 767px)
  - Single column layout
  - Stacked navigation
  - Large touch targets for buttons
  - Adjusted font sizes
  - Full-width forms

- **Small Mobile** (under 480px)
  - Minimal layout
  - Touch-optimized interface
  - Readable text
  - Accessible spacing

## Testing Performed

### Functionality Testing

- ✅ Add new tasks with all required fields
- ✅ Edit existing tasks
- ✅ Delete tasks with confirmation
- ✅ Mark tasks as completed
- ✅ Mark completed tasks as pending
- ✅ Search by title, course, and description
- ✅ Filter by status, priority, and category
- ✅ Sort by due date, priority, course, and status
- ✅ Combined search and filtering

### Data Persistence Testing

- ✅ Tasks persist after page refresh
- ✅ Tasks persist after browser close/reopen
- ✅ Tasks persist after computer restart
- ✅ Sample data loads correctly
- ✅ Clear data completely removes all tasks
- ✅ LocalStorage updates immediately

### Dashboard Testing

- ✅ Statistics update correctly
- ✅ Completion percentage calculates correctly
- ✅ Progress bar displays correctly
- ✅ Upcoming tasks display correctly
- ✅ Today's tasks are identified correctly
- ✅ Overdue tasks are highlighted
- ✅ Recently completed tasks display

### Form Validation Testing

- ✅ Required fields are validated
- ✅ Error messages display for empty fields
- ✅ Due date validation prevents past dates
- ✅ Numeric fields validate correctly
- ✅ Form clears after successful submission

### UI/UX Testing

- ✅ Navigation works between pages
- ✅ Buttons are responsive
- ✅ Modals open and close correctly
- ✅ Notifications display and fade
- ✅ Loading sample data works
- ✅ Clearing data works with confirmation

### Responsive Testing

- ✅ Desktop layout (1200px+)
- ✅ Tablet layout (768px)
- ✅ Mobile layout (480px)
- ✅ Small mobile (320px)
- ✅ Touch targets are properly sized
- ✅ Text is readable at all sizes

### Browser Testing

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### Console Testing

- ✅ No JavaScript errors
- ✅ No console warnings
- ✅ All functions execute correctly
- ✅ LocalStorage operations work properly

## Browser Compatibility

Student Task Manager works on all modern browsers supporting ES6 and HTML5:

| Browser       | Minimum Version | Status             |
| ------------- | --------------- | ------------------ |
| Chrome        | 60+             | ✅ Fully Supported |
| Firefox       | 55+             | ✅ Fully Supported |
| Safari        | 11+             | ✅ Fully Supported |
| Edge          | 79+             | ✅ Fully Supported |
| Chrome Mobile | Latest          | ✅ Fully Supported |
| Safari iOS    | 11+             | ✅ Fully Supported |

## Future Improvements

Potential enhancements for future versions:

1. **Task Reminders** - Email or browser notifications for upcoming deadlines
2. **Recurring Tasks** - Set tasks to repeat weekly or monthly
3. **Tags/Labels** - Organize tasks with custom tags beyond categories
4. **Time Tracking** - Track actual time spent vs. estimated time
5. **Task Dependencies** - Mark tasks that depend on other tasks
6. **Collaborations** - Share tasks with classmates (with cloud sync)
7. **Cloud Sync** - Optional cloud backup and sync across devices
8. **Calendar View** - Visual calendar display of tasks and deadlines
9. **Statistics Dashboard** - More detailed analytics and insights
10. **Dark Mode** - Dark theme option for evening studying
11. **Task Templates** - Save and reuse common task templates
12. **Import/Export** - Export tasks to CSV or import from other tools
13. **Mobile App** - Native iOS and Android applications
14. **Team Workspaces** - Create study groups with shared task lists

## Author

**Danson Nganga**

## Course Information

- **Course:** CSE 310 – Applied Programming
- **Module:** Module #3 – Student Task Manager
- **Institution:** Brigham Young University (BYU)

## Demonstration Video

[Video demonstration link will be added here]

## Live Demo

**Live Demo:** [GitHub Pages URL will be added here]

## License

This project was created as an educational assignment. You are free to use, modify, and distribute this code for educational purposes.

## Support & Feedback

For questions, bug reports, or feature requests, please visit the GitHub repository or contact the author.

## Changelog

### Version 1.0.0 (Initial Release)

- Complete task management system
- LocalStorage data persistence
- Advanced search and filtering
- Responsive design for all devices
- Professional UI with accessibility features
- Sample data for demonstration
- Full documentation and README

---

**Last Updated:** August 14, 2026

Made with ❤️ for students managing their academic workload
