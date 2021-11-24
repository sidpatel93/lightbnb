SELECT
  properties.*,
  reservations.*,
  avg(property_reviews.rating) AS average_rating
FROM
  reservations
  JOIN properties ON property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE
  reservations.guest_id = 1 and reservations.end_date < NOW() :: date
GROUP BY
  properties.id,
  reservations.id 
ORDER BY
  reservations.start_date
LIMIT
  10;