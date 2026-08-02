/*
SQL problem:

Drivers(id, name, hire_date)
Shifts(id, driver_id, hours_worked, shift_date)

Find each driver's name and total hours worked, but only include drivers who've worked shifts on more than 10 different days. Order by total hours descending.
*/

SELECT 
    Drivers.name,
    SUM(Shifts.hours_worked) as total_hours_worked
FROM 
    Drivers
JOIN
    Shifts
ON  
    Drivers.id = Shifts.driver_id
GROUP BY 
    Drivers.id,
    Drivers.name
HAVING
    COUNT(DISTINCT Shifts.shift_date) > 10
ORDER BY 
    total_hours_worked DESC;