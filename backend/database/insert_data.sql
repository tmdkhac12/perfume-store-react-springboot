INSERT INTO User (id, name, email, username, hashed_password, is_superuser, is_active) VALUES
(1, 'Quản Trị Viên', 'quantrivien@gmail.com', 'admin_qtv', 'hashed_pw_1', TRUE, TRUE),
(2, 'Nguyễn Thị Hạnh', 'hanhnguyen@gmail.com', 'hanh_nt', 'hashed_pw_2', FALSE, TRUE),
(3, 'Trần Văn Mạnh', 'manhtran@gmail.com', 'manh_tv', 'hashed_pw_3', FALSE, TRUE),
(4, 'Lê Anh Thư', 'thuleanh@gmail.com', 'thu_la', 'hashed_pw_4', FALSE, TRUE),
(5, 'Phạm Duy Khang', 'khangpham@gmail.com', 'khang_pd', 'hashed_pw_5', FALSE, TRUE),
(6, 'Võ Minh Tâm', 'tamvominh@gmail.com', 'tam_vm', 'hashed_pw_6', FALSE, TRUE),
(7, 'Đặng Quốc Huy', 'huydang@gmail.com', 'huy_dq', 'hashed_pw_7', FALSE, TRUE),
(8, 'Hoàng Kiều Trinh', 'trinhhoang@gmail.com', 'trinh_hk', 'hashed_pw_8', FALSE, TRUE),
(9, 'Bùi Tấn Phát', 'phatbui@gmail.com', 'phat_bt', 'hashed_pw_9', FALSE, TRUE),
(10, 'Chung Gia Khiêm', 'khiemchung@gmail.com', 'khiem_cg', 'hashed_pw_10', FALSE, TRUE);

INSERT INTO Brand (id, name, hide) VALUES
(1, 'Chanel', FALSE),
(2, 'Dior', FALSE),
(3, 'Gucci', FALSE),
(4, 'Tom Ford', FALSE),
(5, 'Creed', FALSE),
(6, 'Versace', FALSE),
(7, 'YSL', FALSE),
(8, 'Bvlgari', FALSE),
(9, 'Jo Malone', FALSE),
(10, 'Montblanc', FALSE);

INSERT INTO Volume (id, volume, hide) VALUES
(1, 30.0, FALSE),
(2, 50.0, FALSE),
(3, 100.0, FALSE),
(4, 10.0, FALSE),
(5, 75.0, FALSE),
(6, 200.0, FALSE),
(7, 25.0, FALSE),
(8, 90.0, FALSE),
(9, 125.0, FALSE),
(10, 5.0, FALSE);

INSERT INTO Note (id, name, hide) VALUES
(1, 'Bergamot', FALSE), (2, 'Rose', FALSE), (3, 'Sandalwood', FALSE),
(4, 'Vanilla', FALSE), (5, 'Patchouli', FALSE), (6, 'Lavender', FALSE),
(7, 'Jasmine', FALSE), (8, 'Oakmoss', FALSE), (9, 'Ambroxan', FALSE),
(10, 'Mandarin Orange', FALSE), (11, 'Lemon', FALSE), (12, 'Vetiver', FALSE),
(13, 'Musk', FALSE), (14, 'Cedar', FALSE), (15, 'Tuberose', FALSE);

INSERT INTO Perfume (id, name, gender, description, concentration, brand_id, hide) VALUES
(1, 'Coco Mademoiselle', 'Female', 'Vibrant and sophisticated floral-amber.', 'EDP', 1, FALSE),
(2, 'Sauvage', 'Male', 'A radical composition for a strong, honest man.', 'EDT', 2, FALSE),
(3, 'Guilty Pour Homme', 'Male', 'A woody, aromatic scent for the contemporary explorer.', 'EDP', 3, FALSE),
(4, 'Black Orchid', 'Unisex', 'Luxurious and sensual dark accords.', 'Parfum', 4, FALSE),
(5, 'Aventus', 'Male', 'A sophisticated blend for the conquering individual.', 'EDP', 5, FALSE),
(6, 'Eros', 'Male', 'A fresh, oriental and woody fragrance.', 'EDP', 6, FALSE),
(7, 'Libre', 'Female', 'The scent of freedom, a floral lavender.', 'EDP', 7, FALSE),
(8, 'Omnia Crystalline', 'Female', 'A delicate aquatic bamboo scent.', 'EDT', 8, FALSE),
(9, 'Wood Sage & Sea Salt', 'Unisex', 'A scent of the British coast.', 'EDC', 9, FALSE),
(10, 'Explorer', 'Male', 'An irresistible call for adventure.', 'EDP', 10, FALSE),
(11, 'No. 5', 'Female', 'The ultimate symbol of luxury and timeless elegance.', 'Parfum', 1, FALSE),
(12, 'Hypnotic Poison', 'Female', 'An intoxicating and extravagant oriental.', 'EDT', 2, FALSE);

INSERT INTO Address (id, user_id, receiver, phone_number, city_name, ward_name, delivery_address, hide) VALUES
(1, 2, 'Nguyễn Thị Hạnh', '0912345678', 'Hồ Chí Minh', 'Phường Bến Nghé', '125 Hai Bà Trưng', FALSE),
(2, 3, 'Trần Văn Mạnh', '0987654321', 'Hà Nội', 'Phường Hàng Buồm', '60 Hàng Ngang', FALSE),
(3, 4, 'Lê Anh Thư', '0955511223', 'Đà Nẵng', 'Phường Hòa Cường Bắc', '45 Phan Đăng Lưu', FALSE),
(4, 5, 'Phạm Duy Khang', '0966677889', 'Cần Thơ', 'Phường An Lạc', '350/15 Đường 30 Tháng 4', FALSE),
(5, 6, 'Võ Minh Tâm', '0977733445', 'Hải Phòng', 'Phường Lạch Tray', '202 Tô Hiệu', FALSE),
(6, 7, 'Đặng Quốc Huy', '0911122334', 'Huế', 'Phường Phú Hội', '12 Hùng Vương', FALSE),
(7, 8, 'Hoàng Kiều Trinh', '0988899001', 'Nha Trang', 'Phường Lộc Thọ', '404 Trần Phú', FALSE),
(8, 9, 'Bùi Tấn Phát', '0955500112', 'Biên Hòa', 'Phường Tân Mai', '505 Đồng Khởi', FALSE),
(9, 10, 'Chung Gia Khiêm', '0922244556', 'Vũng Tàu', 'Phường Thắng Nhất', '606 Lê Hồng Phong', FALSE),
(10, 1, 'Quản Trị Viên', '0900000000', 'Hà Nội', 'Phường Tràng Tiền', '707 Đinh Tiên Hoàng', FALSE);

INSERT INTO Volume_Perfume (id, perfume_id, volume_id, price) VALUES
(1, 1, 2, 120.00), (2, 1, 3, 180.00),
(3, 2, 3, 150.00), (4, 2, 4, 35.00),
(5, 5, 5, 420.00),
(6, 6, 2, 85.00), (7, 6, 3, 120.00),
(8, 7, 3, 170.00),
(9, 9, 3, 155.00),
(10, 10, 5, 110.00), (11, 11, 1, 220.00),
(12, 12, 5, 145.00),
(13, 10, 9, 150.00),
(14, 4, 2, 160.00),
(15, 8, 3, 95.00);

INSERT INTO Sample_Image (id, perfume_id, path) VALUES
(1, 1, '/images/coco_mademoiselle_bottle.jpg'), (2, 2, '/images/sauvage_bottle.jpg'),
(3, 5, '/images/aventus_main.jpg'), (4, 6, '/images/eros_main.jpg'),
(5, 7, '/images/libre_bottle.jpg'), (6, 9, '/images/wood_sage_main.jpg'),
(7, 10, '/images/explorer_bottle.jpg'), (8, 11, '/images/no5_main.jpg'),
(9, 12, '/images/hypnotic_poison.jpg'), (10, 3, '/images/guilty_homme.jpg'),
(11, 4, '/images/black_orchid_main.jpg'), (12, 8, '/images/omnia_crystalline.jpg');

INSERT INTO Note_Perfume (id, note_id, perfume_id, type) VALUES
(1, 1, 1, 'Top'),    (2, 10, 1, 'Top'),  (3, 11, 1, 'Top'),
(4, 2, 1, 'Heart'),  (5, 7, 1, 'Heart'),  (6, 15, 1, 'Heart'),
(7, 5, 1, 'Base'),   (8, 3, 1, 'Base'),   (9, 13, 1, 'Base'),
(10, 1, 2, 'Top'),   (11, 11, 2, 'Top'),  (12, 10, 2, 'Top'),
(13, 6, 2, 'Heart'),  (14, 14, 2, 'Heart'), (15, 12, 2, 'Heart'),
(16, 9, 2, 'Base'),   (17, 8, 2, 'Base'),   (18, 13, 2, 'Base'),
(19, 10, 5, 'Top'),  (20, 1, 5, 'Top'),
(21, 7, 5, 'Heart'), (22, 2, 5, 'Heart'),
(23, 3, 5, 'Base'),   (24, 5, 5, 'Base'),
(25, 11, 6, 'Top'),  (26, 1, 6, 'Top'), (27, 10, 6, 'Top'),
(28, 4, 6, 'Heart'),  (29, 6, 6, 'Heart'),
(30, 14, 6, 'Base'),  (31, 12, 6, 'Base'),
(32, 1, 10, 'Top'),  (33, 10, 10, 'Top'),
(34, 12, 10, 'Heart'), (35, 3, 10, 'Heart'),
(36, 13, 10, 'Base');

INSERT INTO Invoice (id, user_id, address_id, created_at, total, delivery_status, payment_method) VALUES
(1, 2, 1, '2025-11-20 10:30:00', 120.00, 'Shipped', 'Transfer'),    -- Jane Doe (VP ID 1: 120.00)
(2, 3, 2, '2025-11-25 15:00:00', 185.00, 'Pending', 'Cash'),        -- John Smith (VP ID 3 + 4: 150+35)
(3, 4, 3, '2025-11-28 09:15:00', 420.00, 'Confirmed', 'Transfer'),   -- Alice Brown (VP ID 5: 420.00)
(4, 5, 4, '2025-11-29 11:00:00', 205.00, 'Confirmed', 'Cash'),        -- Bob Green (VP ID 6 + 7: 85+120)
(5, 6, 5, '2025-12-01 14:00:00', 170.00, 'Pending', 'Transfer'),   -- Eva White (VP ID 8: 170.00)
(6, 7, 6, '2025-12-02 16:00:00', 155.00, 'Shipped', 'Cash'),        -- Mike Black (VP ID 9: 155.00)
(7, 8, 7, '2025-12-03 08:00:00', 260.00, 'Pending', 'Transfer'),    -- Sara King (VP ID 10 + 13: 110+150)
(8, 9, 8, '2025-12-03 09:00:00', 220.00, 'Confirmed', 'Cash'),       -- Tom Lee (VP ID 11: 220.00)
(9, 10, 9, '2025-12-03 10:00:00', 145.00, 'Pending', 'Transfer'),  -- Chris Chen (VP ID 12: 145.00)
(10, 2, 1, '2025-12-03 11:00:00', 160.00, 'Shipped', 'Cash');       -- Jane Doe (VP ID 14: 160.00)

INSERT INTO Invoice_Details (id, volume_perfume_id, invoice_id, quantity) VALUES
(1, 1, 1, 1),   -- Invoice 1: Coco Mademoiselle 50ml (1)
(2, 3, 2, 1),   -- Invoice 2: Sauvage 100ml (3)
(3, 4, 2, 1),   -- Invoice 2: Sauvage 10ml (4)
(4, 5, 3, 1),   -- Invoice 3: Aventus 75ml (5)
(5, 6, 4, 1),   -- Invoice 4: Eros 50ml (6)
(6, 7, 4, 1),   -- Invoice 4: Eros 100ml (7)
(7, 8, 5, 1),   -- Invoice 5: Libre 100ml (8)
(8, 9, 6, 1),   -- Invoice 6: Wood Sage & Sea Salt 100ml (9)
(9, 10, 7, 1),  -- Invoice 7: Explorer 75ml (10)
(10, 13, 7, 1), -- Invoice 7: Explorer 125ml (13)
(11, 11, 8, 1), -- Invoice 8: No. 5 30ml (11)
(12, 14, 10, 1); -- Invoice 10: Black Orchid 50ml (14)
