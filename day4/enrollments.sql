/*
You have these tables:

Students(id, name, grade_level)
Enrollments(id, student_id, course_id)
Courses(id, course_name)

Write a query to find each student's name and the number of courses they're enrolled in, but only include students enrolled in more than 2 courses. Order by course count descending.
*/

SELECT
    Students.name,
    COUNT(Enrollments.id) as course_count
FROM
    Students
JOIN
    Enrollments
ON
    Students.id = Enrollments.student_id
GROUP BY
    Students.id,
    Students.name
HAVING
    COUNT(Enrollments.id) > 2
ORDER BY
    course_count DESC;