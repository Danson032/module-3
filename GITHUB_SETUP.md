# GitHub Setup Instructions

This guide will help you complete the GitHub repository setup for the Student Task Manager project.

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in to your account
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Configure the repository:
   - **Repository name:** `student-task-manager`
   - **Description:** "A professional web application for managing academic tasks and assignments"
   - **Visibility:** Select **"Public"**
   - **Initialize repository:** Leave unchecked (we already have a local repository)
   - Click **"Create repository"**

## Step 2: Add Remote and Push Code

After creating the repository, GitHub will show you commands to push your local repository. Follow these steps:

1. In your terminal, navigate to the project folder:

```bash
cd "c:\BYU\Applied programming\module-3"
```

2. Add the GitHub repository as a remote (replace YOUR_USERNAME and YOUR_TOKEN with your actual GitHub credentials):

```bash
git remote add origin https://github.com/YOUR_USERNAME/student-task-manager.git
```

3. Rename the branch to main (if not already main):

```bash
git branch -M main
```

4. Push your code to GitHub:

```bash
git push -u origin main
```

If prompted for credentials:

- **Username:** Your GitHub username
- **Password:** Your personal access token (Settings > Developer settings > Personal access tokens)

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** (gear icon)
3. In the left sidebar, click **"Pages"**
4. Under "Source," select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **"Save"**
6. GitHub will provide your live site URL (usually `https://YOUR_USERNAME.github.io/student-task-manager`)

## Step 4: Update README with Live Demo URL

Once GitHub Pages is deployed:

1. Go to the repository on GitHub
2. Click on **README.md**
3. Click the edit button (pencil icon)
4. Find this line:

```
**Live Demo:** [GitHub Pages URL will be added here]
```

5. Replace it with your actual GitHub Pages URL:

```
**Live Demo:** [https://YOUR_USERNAME.github.io/student-task-manager](https://YOUR_USERNAME.github.io/student-task-manager)
```

6. Find this line:

```
[Video demonstration link will be added here]
```

7. Keep this as a placeholder for when you record your video
8. Commit the changes

## Step 5: Test Your Live Demo

1. Wait 1-2 minutes for GitHub Pages to build
2. Visit your live demo URL: `https://YOUR_USERNAME.github.io/student-task-manager`
3. Test the application:
   - Load sample data
   - Add a task
   - Search and filter
   - Clear data
4. Verify everything works correctly

## Step 6: Record Your Demonstration Video

The application is ready for demonstration! Your video should show:

1. **Introduction** - Your face and brief description
2. **Dashboard** - Show statistics and sample data
3. **Add Task** - Create a new task with all fields
4. **Edit Task** - Modify an existing task
5. **Search** - Demonstrate search functionality
6. **Filter** - Show filtering by status and priority
7. **Sort** - Show different sort options
8. **Complete Task** - Mark a task as completed
9. **Delete Task** - Delete a task with confirmation
10. **Persistence** - Refresh page and show data persists
11. **Responsive** - Show mobile/tablet view
12. **Source Code** - Show and explain the code structure
13. **Technologies** - Explain HTML, CSS, JavaScript, localStorage

## Step 7: Update Video Link in README

Once you've uploaded your video:

1. Edit README.md
2. Find the section:

```
## Demonstration Video

[Video demonstration link will be added here]
```

3. Replace with your actual video link (YouTube, etc.):

```
## Demonstration Video

[Video demonstration link](https://youtube.com/your-video-url)
```

4. Commit the changes

## Troubleshooting

### GitHub Pages not showing up

- Wait 1-2 minutes for the site to build
- Check the "Pages" settings to ensure it's enabled
- Verify the branch is set to `main`

### Remote already exists error

If you get an error about remote already existing:

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/student-task-manager.git
```

### Push rejected

- Make sure you're authenticated with GitHub
- Verify you have the correct repository name
- Check that the repository is empty on GitHub

### Personal Access Token

If you don't have a personal access token:

1. Go to GitHub Settings
2. Developer settings > Personal access tokens
3. Click "Generate new token"
4. Give it repo access
5. Copy the token and use it as your password

## Final Checklist

- [ ] Repository created on GitHub
- [ ] Local code pushed to GitHub
- [ ] GitHub Pages enabled
- [ ] Live demo URL works
- [ ] README updated with live demo URL
- [ ] Video recorded
- [ ] Video link added to README
- [ ] All features tested on live demo
- [ ] README is at repository root
- [ ] No secrets committed to repository
- [ ] Project is public

## Support

If you encounter issues:

1. Check the GitHub error messages
2. Verify your internet connection
3. Ensure you have the latest Git version
4. Check that the repository name is exactly "student-task-manager"
5. Review the GitHub documentation: https://docs.github.com/

Good luck with your project! 🎉
