// src/fileOperations.js

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'students.json');

// Function to write student data to students.json (synchronous)
function writeStudentsSync(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Function to write student data to students.json (asynchronous)
function writeStudentsAsync(data, callback) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), callback);
}

// Function to read student data from students.json (synchronous)
function readStudentsSync() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Function to read student data from students.json (asynchronous)
function readStudentsAsync(callback) {
    fs.readFile(filePath, (err, data) => {
        if (err) return callback(err);
        callback(null, JSON.parse(data));
    });
}

// Function to add a new student
function addStudent(newStudent) {
    const students = readStudentsSync();
    students.push(newStudent);
    writeStudentsSync(students);
}

// Bonus: Function to update a student's course
function updateStudentCourse(id, newCourse) {
    const students = readStudentsSync();
    const student = students.find(s => s.id === id);
    if (student) {
        student.course = newCourse;
        writeStudentsSync(students);
    }
}

// Bonus: Function to delete a student
function deleteStudent(id) {
    let students = readStudentsSync();
    students = students.filter(s => s.id !== id);
    writeStudentsSync(students);
}

// Example usage of synchronous and asynchronous functions
try {
    console.log('Synchronous read:', readStudentsSync());
} catch (error) {
    console.error('Error reading students synchronously:', error);
}

readStudentsAsync((err, data) => {
    if (err) {
        console.error('Error reading students asynchronously:', err);
    } else {
        console.log('Asynchronous read:', data);
    }
});