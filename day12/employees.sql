/*
One SQL, casual, no pressure:

Employees(id, name, department)
Projects(id, employee_id, hours_logged)
Find each employee's name and total hours logged, ordered by total hours descending.

Take a shot — quick one, just to get your hands moving.
*/


SELECT 
    Employees.name, 
    SUM(Projects.hours_logged) as total_hours
FROM 
    Employees
JOIN 
    Projects
ON 
    Employees.id = Projects.employee_id 
GROUP BY 
    Employees.id, 
    Employees.name 
ORDER BY 
    total_hours DESC;
