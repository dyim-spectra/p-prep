-- SQL problem:

-- You have these tables:

-- Orders(id, customer_id, order_date, total_amount)
-- Customers(id, name, signup_date)

-- Write a query to find each customer's name and their total number of orders, but only include customers who have placed more than 3 orders. Order results by order count descending.

SELECT
    Customers.name,
    COUNT(Orders.id) as Total_Orders
FROM 
    Customers
JOIN
    Orders
ON
    Customers.id = Orders.customer_id
GROUP BY
    Customers.id,
    Customers.name
HAVING
    COUNT(Orders.id) > 3
ORDER BY
    Total_Orders DESC

