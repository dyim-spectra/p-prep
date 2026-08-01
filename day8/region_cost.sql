/*
Let's get into it.

SQL problem:

Vehicles(id, name, region_id)
Regions(id, name)
Maintenance(id, vehicle_id, cost, service_date)

Find each region's name and total maintenance cost across all its vehicles, but only include regions where total maintenance cost exceeds $20,000. Order by total cost descending.
*/

SELECT 
    Regions.name, 
    SUM(Maintenance.cost) as total_maintenance
FROM
    Regions
JOIN
    Vehicles
ON
    Regions.id = Vehicles.region_id
JOIN
    Maintenance
ON 
    Vehicles.id = Maintenance.vehicle_id
GROUP BY
    Regions.id,
    Regions.name
HAVING
    SUM(Maintenance.cost) > 20000
ORDER BY
    total_maintenance DESC;