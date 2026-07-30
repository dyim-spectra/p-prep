/*
You have these tables:

Authors(id, name)
Books(id, title, author_id, published_year)

Write a query to find each author's name and the number of books they've published, but only include authors who have published books in more than 3 different years. Order by that count descending.
*/

SELECT 
    Authors.name,
    COUNT(Books.title) as published_books
FROM
    Authors
JOIN
    Books
ON 
    Authors.id = Books.author_id
GROUP BY 
    Authors.id,
    Authors.name
HAVING 
    COUNT(DISTINCT Books.published_year) > 3
ORDER BY 
    published_books DESC

