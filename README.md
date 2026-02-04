# Kanban-Board

A simple and interactive Kanban Board built using HTML, CSS, and Vanilla JavaScript to manage tasks across different stages of work.

This project focuses on understanding core frontend concepts, DOM manipulation, and the HTML5 Drag & Drop API without using any frameworks.

## 🚀 Features

✅ Create tasks using a modal form

✅ Drag & drop tasks between columns: Todo, In Progress, Done

✅ Visual feedback while dragging tasks

✅ Dynamic task count for each column

✅ Persistent data using localStorage

✅ Delete tasks

✅ Clean and modular JavaScript code

## 🛠️ Tech Stack

HTML5

CSS3 (Flexbox)

JavaScript (Vanilla)

Browser LocalStorage


## 🧠 Concepts Covered

This project helped reinforce the following concepts:

DOM Manipulation

Event Handling

HTML5 Drag & Drop lifecycle:

dragstart

dragover

drop

preventDefault() and browser event flow

State management using localStorage

Dynamic UI updates

Modular and reusable JavaScript functions

## 📂 Project Structure
```
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ How It Works

Tasks are created using a modal form.

Each task is a draggable DOM element.

Columns listen for drag and drop events.

When a task is dropped:

It is automatically removed from the previous column

Added to the new column

Task counts are updated

Data is saved to localStorage

On page reload, tasks are restored from localStorage.


## 📈 Future Improvements

Keyboard accessibility

Smooth drag animations

Backend integration (API / Database)

Authentication

React-based version
