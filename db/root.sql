DROP DATABASE IF EXISTS emp_trackerDB;
CREATE DATABASE emp_trackerDB;

USE emp_trackerDB;

-- username functionality
CREATE TABLE users(
  username VARCHAR(100) NOT NULL,
  password VARCHAR(45) NOT NULL,
  PRIMARY KEY (username)
);


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(50) NOT NULL,
  salary INT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department (id)
);


CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role (id),
  FOREIGN KEY (manager_id) REFERENCES employee (id)
);

-- Departments
INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("Engineering");
INSERT into department (name) VALUES ("Legal");
INSERT into department (name) VALUES ("Finance");

-- Company roles
INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 150000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales person", 80000, 1);
INSERT into role (title, salary, department_id) VALUES ("Lead Engineer", 200000, 2);
INSERT into role (title, salary, department_id) VALUES ("Engineer", 120000, 2);
INSERT into role (title, salary, department_id) VALUES ("Attorney", 230000, 3);
INSERT into role (title, salary, department_id) VALUES ("Accountant", 50000, 4);

-- Sales Team
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ashlyn", "Yuen", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Lee", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jason", "Grow", 2, 1);

-- Attorney
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Rose", "Krieder", 5, null);

-- Engineers
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jessica", "Wu", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kaylee", "Smith", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Cyrus", "Smith", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Christine", "Link", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Ross", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Gina", "Love", 4, 3);

-- Finance
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jada", "Allen", 6, null);


