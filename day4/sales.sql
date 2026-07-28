/*
Let's start with the SQL/LeetCode/React set, then move into a systems design scenario after.

SQL problem:

You have these tables:

Products(id, name, category, price)
Sales(id, product_id, sale_date, quantity)

Write a query to find the category and total revenue (price × quantity, summed) for each category, but only include categories with total revenue greater than 10,000. Order by total revenue descending.
*/

SELECT 
    Products.category,
    SUM(Products.price * Sales.quantity) AS total_revenue
FROM
    Products
JOIN
    Sales
ON
    Products.id = Sales.product_id
GROUP BY
    Products.id,
    Products.category
HAVING
    SUM(Products.price * Sales.quantity) > 10000
ORDER BY
    total_revenue DESC

