
/*
Warehouses(id, name)
Shipments(id, warehouse_id, weight_kg, ship_date)

Find each warehouse's name and total shipped weight, but only include warehouses with total weight over 50,000 kg. Order by total weight descending.
*/

SELECT 
    Warehouses.name, 
    SUM(Shipments.weight_kg) as total_shipped_weight
FROM   
    Warehouses
JOIN
    Shipments
ON  
    Warehouses.id = Shipments.warehouse_id
GROUP BY 
    Warehouses.id, 
    Warehouses.name
HAVING 
    SUM(Shipments.weight_kg) > 50000
ORDER BY 
    total_shipped_weight DESC;