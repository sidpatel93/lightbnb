const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {Pool} = require('pg')

const config = {
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: '123',
  port: '5432'
}

const pool = new Pool(config)

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return pool.query(`
  select * 
  from users 
  where email = $1`, [email])
  .then((res)=> res.rows[0])
  .catch((err)=> null)
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  select * 
  from users
  where users.id = $1`,[id])
  .then((res)=> res.rows[0])
  .catch((err)=> null)
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
 return pool.query(`
 insert into users 
 (name, email, password) 
 values ($1, $2, $3)
 returning *`,[user.name, user.email, user.password])
 .then((res)=> res.rows[0])
 .catch((err)=>{
   console.log(err.message)
 }) 
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return pool.query(`
SELECT properties.*, reservations.start_date, reservations.end_date ,avg(property_reviews.rating) as average_rating 
from properties 
JOIN property_reviews ON properties.id = property_id
join reservations on properties.id = reservations.property_id
JOIN users on reservations.guest_id = users.id
WHERE users.id = $1
GROUP BY properties.id, reservations.start_date, reservations.end_date
LIMIT $2;`, [guest_id, limit])
.then((res)=> res.rows)
.catch((err)=>{
  console.log(err.message);
  return null
})

  //return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if(options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if(options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    if(queryParams.length === 1){
      queryString += `WHERE properties.cost_per_night/100 >= $${queryParams.length}`;
    }
    else {
      queryString += `AND properties.cost_per_night/100 >= $${queryParams.length}`;
    }
  }

  if(options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    if(queryParams.length === 1){
      queryString += `WHERE properties.cost_per_night/100 <= $${queryParams.length}`;
    }
    else {
      queryString += `AND properties.cost_per_night/100 <= $${queryParams.length}`;
    }
  }

  queryString += 'GROUP BY properties.id';

  if(options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
  console.log(options)
  console.log(queryParams)

  return pool.query(queryString, queryParams)
  .then((res) => res.rows)
    .catch((err)=> {
      console.log(err.message)
    });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
