insert into users (name, email, password) 
values ('Sid', 'sid@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED'),
('Vishva', 'Vishva@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED'),
('Parth', 'parth@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED'),
('Naiya', 'n24@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED');

insert into properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms,country, street, city, province, post_code, active) 
values (1, 'Hobbit hole', 'desc', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 400, 6, 3,3,'Canada', '123 street', 'Brampton', 'Ontario', 'L2X 1B8', TRUE),
(1, 'Forrest Cabin', 'desc', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 350, 3, 2,2,'Canada', '363 street', 'Barrie', 'Ontario', 'L9X CB8', TRUE),
(1, 'Luxury Room', 'desc', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 600, 10, 5,4,'Canada', '627 street', 'Toronto', 'Ontario', 'L7Y GB8', FALSE),
(1, 'Tree House', 'desc', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 525, 3, 1,1,'Canada', '825 street', 'Montreal', 'Qubec', 'G2Q 1H3', TRUE);

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(1, 4, '2021-10-01', '2021-10-14'),
(2, 2, '2019-01-04', '2019-02-01'),
(1, 4, '2019-01-04', '2019-02-01'),
(3, 1, '2019-01-04', '2019-02-01');

insert into property_reviews (guest_id, property_id, reservation_id, rating, message) 
values (1, 1, 1, 3, 'message'),
(2, 2, 4, 5, 'message'),
(1, 4, 5, 4, 'message'),
(1, 4, 3, 5, 'message'),
(3, 1, 6, 3, 'message');