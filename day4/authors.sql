/*
Let's put it into practice. New scenario, three tables:

Authors(id, name)
Books(id, title, author_id)
Reviews(id, book_id, rating)

Write a query to find each author's name and the average rating across all their books' reviews. Only include authors with an average rating above 4.0.
*/

SELECT
    Authors.name,
    AVG(Reviews.rating) as author_rating
FROM
    Authors
JOIN
    Books
ON
    Authors.id = Books.author_id
JOIN
    Reviews
ON 
    Books.id = Reviews.book_id
GROUP BY
    Authors.id,
    Authors.name
HAVING
    AVG(Reviews.rating) > 4;