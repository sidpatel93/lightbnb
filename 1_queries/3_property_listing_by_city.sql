SELECT
  *,
  avg(property_reviews.rating) AS average_rating
FROM
  properties
  JOIN property_reviews ON properties.id = property_id
WHERE
  properties.city LIKE '%Vancouver%'
GROUP BY
  properties.id,
  property_reviews.id
HAVING
  avg(property_reviews.rating) >= 4
ORDER BY
  properties.cost_per_night
LIMIT
  10;