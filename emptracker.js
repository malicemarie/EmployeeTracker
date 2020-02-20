"use strict";

const mysql = require("mysql");
const inquirer = require("inquirer");
const consoletable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "malicemarie1",
  database: "emp_trackerDB"
});

connection.connect(err => {
  if (err) throw err;
  login();
});

function login() {
  console.log("Please login:");
  inquirer
    .prompt([
      {
        name: "username",
        type: "input",
        message: "What is your username?"
      },
      {
        name: "password",
        type: "input",
        message: "What is your password?"
      }
    ])
    .then(answer => {
      const username = answer.username;
      const password = answer.password;
      connection.query(
        "SELECT username FROM users WHERE ?",
        { username },
        (err, results) => {
          if (err) throw err;
          const isNewUser = results.length === 0;
          if (isNewUser) {
            createUser(username, password);
          } else {
            validateUser(username, password);
          }
        }
      );
    });
}

function validateUser(username, password) {
  connection.query(
    "SELECT password FROM users WHERE ? AND ?",
    [{ username }, { password }],
    (err, results) => {
      if (err) throw err;
      const doesUserExist = results.length > 0;
      if (doesUserExist) {
        console.log(`${username} successfully logged in`);
        start(username);
      } else {
        console.error("Wrong password...");
        login();
      }
    }
  );
}

function createUser(username, password) {
  connection.query(
    "INSERT INTO users SET ?",
    {
      username: username,
      password: password
    },
    err => {
      if (err) throw err;
      console.log(`Created user ${username}`);
      start(username);
    }
  );
}

function start(username) {
  inquirer
    .prompt({
      name: "todo",
      type: "list",
      message: `Hello ${username}! How can I help you today?`,
      choices: [
        "View All Employees",
        "View Employees by Department",
        "View Employee by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "LOGOUT"
      ]
    })
    .then(answer => {
      switch (answer.todo) {
        case "View All Employees":
          viewAll(username);
          break;
        case "View Employees by Department":
          viewAllByDepartment(username);
          break;
        case "View Employees by Manager":
          viewAllByManager(username);
          break;
        case "Add Employee":
          addEmployee(username);
          break;
        case "Remove Employee":
          removeEmployee(username);
          break;
        case "Update Employee Role":
          updateEmployee(username);
          break;
        case "LOGOUT":
          console.log("Successfully logged out");
          login();
          break;
        default:
          connection.end();
      }
    });
}

function viewAll(username) {
  let query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table("All Employees:", res);
    start(username);
  });
}

// working function
async function addEmployee(username) {
  await inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "What is the employee's first name"
      },
      {
        name: "lastname",
        type: "input",
        message: "What is the employee's last name"
      },
      {
        name: "roleid",
        type: "list",
        message: "What is the employees role?",
        choices: [
          { name: "Sales Manager", value: "1" },
          { name: "Sales Person", value: "2" },
          { name: "Lead Engineer", value: "3" },
          { name: "Engineer", value: "4" },
          { name: "Attorney", value: "5" },
          { name: "Accountant", value: "6" }
        ]
      },
      {
        name: "mgmtid",
        type: "list",
        message: "Who is the employees manager?",
        choices: [
          {
            name: "Ashlyn Yuen",
            value: "1"
          },
          { name: "Jessica Wu", value: "2" },
          { name: "None", value: "0" }
        ]
      }
    ])
    .then(answer => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstname,
          last_name: answer.lastname,
          role_id: answer.roleid,
          manager_id: answer.mgmtid
        },
        err => {
          if (err) throw err;
          console.log("Your employee was added successfully!");
          start(username);
        }
      );
    })
    .catch(err => console.log(err));
}