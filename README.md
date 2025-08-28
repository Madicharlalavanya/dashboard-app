Task 2 – Interactive Dashboard Application
Purpose

The goal of this task is to design and implement a modern, interactive dashboard web application.
It demonstrates the use of ES6 modules, persistent storage, dynamic data visualization, offline support, and user interaction features in a single cohesive project.

What the Application Does

Multi-page layout with navigation

Sidebar navigation for Home, Tasks, and Stats.

Each page loads dynamically without reloading the site.

Task Manager

Add new tasks with a simple input form.

Mark tasks as completed using checkboxes.

Delete tasks individually or clear all completed tasks at once.

Drag-and-drop to reorder tasks.

Tasks are stored in LocalStorage so they remain after refresh.

Statistics Page

Uses the Fetch API to pull external data.

Displays the data visually using Chart.js.

Example chart: number of posts, users, and comments.

Offline Support

Service Worker caches key files so the app can be loaded even without internet.

Web App Manifest allows the app to be installable like a Progressive Web App (PWA).

Code Organization

tasks.js → Task manager logic.

charts.js → Chart.js setup with API data.

storage.js → LocalStorage wrapper.

sw.js → Service worker for offline support.

manifest.json → Metadata for PWA install.
