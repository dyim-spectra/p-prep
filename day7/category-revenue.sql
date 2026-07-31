/*
SQL problem:

Products(id, name, category_id, price)
Categories(id, name)
Orders(id, product_id, quantity, order_date)

Find each category's name and total revenue (price × quantity, summed across all orders), but only include categories with total revenue over $5,000. Order by revenue descending.
*/

SELECT
    Categories.name,
    SUM(Products.price * Orders.quantity) as total_revenue
FROM
    Categories
JOIN
    Products
ON  
    Categories.id = Products.category_id
JOIN
    Orders
ON
    Products.id = Orders.product_id
GROUP BY 
    Categories.id,
    Categories.name
HAVING
    SUM(Products.price * Orders.quantity) > 5000
ORDER BY 
    total_revenue DESC;

