/*
SQL problem:

You have two tables:

Employees(id, name, department_id, salary)
Departments(id, name)

Write a query to find the department name and the average salary of employees in each department, but only include departments where the average salary is greater than 80000. Order by average salary descending.
*/

SELECT
    Departments.name,
    AVERAGE(Employees.salary) as average_salary
FROM
    Departments
JOIN
    Employees
ON
    Departments.id = Employees.id
WHERE
    AVERAGE(Employees.salary) > 8000
ORDER BY
    average_salary descending

--corrected
SELECT
    Departments.name,
    AVG(Employees.salary) AS average_salary
FROM
    Departments
JOIN
    Employees
ON
    Departments.id = Employees.department_id
GROUP BY
    Departments.id,
    Departments.name
HAVING
    AVG(Employees.salary) > 80000
ORDER BY
    average_salary DESC;