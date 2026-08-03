/*
SQL warm-up:

Restaurants(id, name)
Reviews(id, restaurant_id, rating, review_date)

Find each restaurant's name and average rating, but only include restaurants with more than 20 reviews. Order by average rating descending.
*/

SELECT 
    Restaurants.name,
    AVG(Reviews.rating) as average_rating
FROM
    Restaurants 
JOIN
    Reviews
ON 
    Restaurants.id = Reviews.restaurant_id
GROUP BY 
    Restaurants.id,
    Restaurants.name 
HAVING 
    COUNT(Reviews.id) > 20 
ORDER BY 
    average_rating DESC;