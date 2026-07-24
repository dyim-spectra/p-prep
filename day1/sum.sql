-- Let's shift to a SQL problem, since Day 1 of your plan includes both coding and SQL practice — and Palantir's SQL rounds lean on real-world messy data manipulation, not textbook joins.

-- Problem: Active Subscriptions

-- You have two tables:

-- subscriptions

-- id	user_id	plan	start_date	end_date
-- 1	101	basic	2026-01-01	2026-03-01
-- 2	101	pro	2026-03-01	NULL
-- 3	102	basic	2026-02-15	2026-02-28
-- 4	103	pro	2026-01-10	2026-01-20

-- payments

-- id	user_id	amount	paid_on
-- 1	101	20	2026-01-05
-- 2	101	40	2026-03-05
-- 3	102	20	2026-02-16
-- 4	103	40	2026-01-11

-- Write a SQL query that returns, for each user currently on an active subscription (meaning end_date IS NULL or end_date >= CURRENT_DATE), their user_id, current plan, and the total amount they've paid across all time.

-- Talk through your approach out loud first — what tables do you need, how do you filter for "currently active," and how do you aggregate the payments — then write the query.

SELECT 
    s.user_id,
    s.plan,
    SUM(p.amount) AS total_paid
FROM subscriptions s
JOIN payments p
    ON p.user_id = s.user_id
WHERE
    s.end_date IS NULL 
    OR s.end_date >= CURRENT_DATE
GROUP BY
    s.user_id;