# GitHub Setup Guide

## 1. Create a GitHub Account
- Go to [GitHub](https://github.com/) and sign up if you don't already have an account

## 2. Create a New Repository
- Click the "+" icon in the top-right corner of GitHub and select "New repository"
- Name your repository (e.g., "Eval-3")
- Add a description (optional)
- Choose public or private repository
- Do NOT initialize with README, .gitignore, or license (since you have existing code)
- Click "Create repository"

## 3. Push Your Local Project to GitHub

Open a terminal or command prompt in your project directory (`c:\Users\deepa\OneDrive\Desktop\Eval-3`) and run these commands:

```bash
# Initialize Git repository (if not already initialized)
git init

# Add all your files to the staging area
git add .

# Commit your changes
git commit -m "Initial commit"

# Add the GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username and REPO_NAME with your repository name
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push your code to GitHub
git push -u origin master
# or if you're using the main branch
# git push -u origin main
```

## 4. Subsequent Pushes
After making changes to your code:

```bash
# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

## Note
If this is your first time using Git on this computer, you may need to configure your identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
