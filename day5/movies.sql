/*
SQL problem:

You have these tables:

Movies(id, title, genre)
Ratings(id, movie_id, user_id, score)

Write a query to find each movie's title and its average rating, but only include movies that have been rated by more than 5 different users. Order by average rating descending.

Think about the distinct-count edge case from earlier — could a user rate the same movie twice in this data, and if so, does your query need to guard against that?
*/


SELECT
    Movies.title,
    AVG(Ratings.score) as avg_rating
FROM
    Movies
JOIN
    Ratings
ON
    Movies.id = Ratings.movie_id
GROUP BY
    Movies.id,
    Movies.title
HAVING
    COUNT(Ratings.user_id) > 5
ORDER BY
    avg_rating DESC;
--correction
--the DISTINCT 
/*
whenever a question says "distinct," "different," or "unique" anything, immediately reach for COUNT(DISTINCT ...) rather than plain COUNT().
*/

SELECT
    Movies.title,
    AVG(Ratings.score) as avg_rating
FROM
    Movies
JOIN
    Ratings
ON
    Movies.id = Ratings.movie_id
GROUP BY
    Movies.id,
    Movies.title
HAVING
    COUNT(DISTINCT Ratings.user_id) > 5
ORDER BY
    avg_rating DESC;