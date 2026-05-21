INSERT INTO user (id, name, email, username, hashed_password, is_superuser, is_active, google_id)
VALUES (1, 'Quản Trị Viên', 'quantrivien@gmail.com', 'admin_qtv', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', TRUE, TRUE, NULL),
       (2, 'Nguyễn Thị Hạnh', 'hanhnguyen@gmail.com', 'hanh_nt', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', FALSE, TRUE, NULL),
       (3, 'Trần Văn Mạnh', 'manhtran@gmail.com', 'manh_tv', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', FALSE, TRUE, NULL),
       (4, 'Lê Anh Thư', 'thuleanh@gmail.com', 'thu_la', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', FALSE, TRUE, NULL),
       (5, 'Phạm Duy Khang', 'khangpham@gmail.com', 'khang_pd', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', FALSE, TRUE, NULL),
       (6, 'Võ Minh Tâm', 'tamvominh@gmail.com', 'tam_vm', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', FALSE, TRUE, NULL),
       (7, 'Đặng Quốc Huy', 'huydang@gmail.com', 'huy_dq', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', FALSE, TRUE, NULL),
       (8, 'Hoàng Kiều Trinh', 'trinhhoang@gmail.com', 'trinh_hk', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', FALSE, TRUE, NULL),
       (9, 'Bùi Tấn Phát', 'phatbui@gmail.com', 'phat_bt', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', FALSE, TRUE, NULL),
       (10, 'Chung Gia Khiêm', 'khiemchung@gmail.com', 'khiem_cg', '$2a$10$O2jPIoW7zCHRxvIy4TqYIehshl3VvyaCqHyfH2OJNXRRq1tHWqCea', FALSE, TRUE, NULL);

INSERT INTO brand (id, name, hide)
VALUES (1, 'Chanel', FALSE),
       (2, 'Dior', FALSE),
       (3, 'Gucci', FALSE),
       (4, 'Tom Ford', FALSE),
       (5, 'Creed', FALSE),
       (6, 'Versace', FALSE),
       (7, 'YSL', FALSE),
       (8, 'Bvlgari', FALSE),
       (9, 'Jo Malone', FALSE),
       (10, 'Montblanc', FALSE);

INSERT INTO volume (id, volume, hide)
VALUES (1, 30.0, FALSE),
       (2, 50.0, FALSE),
       (3, 100.0, FALSE),
       (4, 10.0, FALSE),
       (5, 75.0, FALSE),
       (6, 200.0, FALSE),
       (7, 25.0, FALSE),
       (8, 90.0, FALSE),
       (9, 125.0, FALSE),
       (10, 5.0, FALSE);

INSERT INTO note (id, name, hide)
VALUES (1, 'Bergamot', FALSE),
       (2, 'Rose', FALSE),
       (3, 'Sandalwood', FALSE),
       (4, 'Vanilla', FALSE),
       (5, 'Patchouli', FALSE),
       (6, 'Lavender', FALSE),
       (7, 'Jasmine', FALSE),
       (8, 'Oakmoss', FALSE),
       (9, 'Ambroxan', FALSE),
       (10, 'Mandarin Orange', FALSE),
       (11, 'Lemon', FALSE),
       (12, 'Vetiver', FALSE),
       (13, 'Musk', FALSE),
       (14, 'Cedar', FALSE),
       (15, 'Tuberose', FALSE);

INSERT INTO perfume (id, name, gender, description, concentration, brand_id, hide)
VALUES (1, 'Coco Mademoiselle', 'Female', 'A vibrant and sophisticated floral-amber fragrance that embodies the spirit of a young, independent woman. It opens with sparkling orange and bergamot, leading to a heart of pure rose and jasmine, all resting on a refined base of patchouli and vetiver. Perfect for a chic, confident woman on any occasion.', 'EDP', 1, FALSE),
       (2, 'Sauvage', 'Male', 'A radical and raw composition for a man who is true to himself. This fragrance features a powerful freshness of Calabrian bergamot and the woody trail of ambroxan. It captures the spirit of open spaces and blue skies, making it a bold choice for daytime adventure or evening charisma.', 'EDT', 2, FALSE),
       (3, 'Guilty Pour Homme', 'Male', 'A woody, aromatic scent designed for the contemporary explorer who defies convention. It blends the unexpected freshness of lavender and lemon with the warm, sensual depth of cedarwood and patchouli. An ideal fragrance for the man who wants to leave a lasting, provocative impression.', 'EDP', 3, FALSE),
       (4, 'Black Orchid', 'Unisex', 'A luxurious and sensual fragrance of rich, dark accords and an alluring potion of black orchids and spice. It is both modern and timeless, featuring notes of black truffle, ylang-ylang, and dark chocolate. A statement scent for those who appreciate mysterious and intense elegance.', 'Parfum', 4, FALSE),
       (5, 'Aventus', 'Male', 'A sophisticated blend for the conquering individual, celebrating strength, power, and success. Inspired by the dramatic life of a historic emperor, it features top notes of pineapple and bergamot, a heart of birch and jasmine, and a rich base of oakmoss and vanilla. A legendary choice for professional milestones.', 'EDP', 5, FALSE),
       (6, 'Eros', 'Male', 'A fresh, oriental, and woody fragrance that interprets masculinity through a luminous aura with an intense, vibrant freshness. It combines mint leaves, Italian lemon zest, and green apple, balanced with tonka bean and cedarwood. Perfect for the passionate, heroic man who is a master of himself.', 'EDP', 6, FALSE),
       (7, 'Libre', 'Female', 'The scent of freedom, a grand floral fragrance with a unique lavender twist. It represents a woman who lives by her own rules, blending the sensuality of Moroccan orange blossom with the boldness of French lavender. A sophisticated choice for independent spirits and elegant evenings.', 'EDP', 7, FALSE),
       (8, 'Omnia Crystalline', 'Female', 'A delicate, aquatic bamboo scent inspired by the glowing clarity of crystal. It captures the essence of lotus flowers, white peonies, and balsa wood. This fragrance is airy, radiant, and incredibly fresh, making it perfect for a graceful woman during bright summer days.', 'EDT', 8, FALSE),
       (9, 'Wood Sage & Sea Salt', 'Unisex', 'A refreshing scent of the British coast, capturing the air of the windswept shore. It blends the earthy notes of sage with the mineral scent of the rugged cliffs and sea salt. Evocative and spirited, it is a versatile fragrance for those who love the natural freshness of the outdoors.', 'EDC', 9, FALSE),
       (10, 'Explorer', 'Male', 'An irresistible call for adventure, this woody-aromatic-leathery fragrance reveals an unconventional spirit. It features Italian bergamot, Haitian vetiver, and Indonesian patchouli. Designed for the man who wants to explore the world and discover his own limits with confidence.', 'EDP', 10, FALSE),
       (11, 'No. 5', 'Female', 'The ultimate symbol of luxury and timeless elegance, this iconic floral-aldehyde fragrance is the world''s most famous perfume. It features a complex bouquet of rose, jasmine, and ylang-ylang, layered over a warm base of sandalwood and vanilla. A legendary choice for formal events and high-society gatherings.', 'Parfum', 1, FALSE),
       (12, 'Hypnotic Poison', 'Female', 'An intoxicating and extravagant oriental fragrance that is both mysterious and magnetic. It features four contrasting facets: intoxicating bitter almond and carvi, opulent Sambac jasmine, mysterious Jacarandra, and sensuous vanilla and musk. A seductive choice for intimate evening wear.', 'EDT', 2, FALSE);

INSERT INTO address (id, user_id, receiver, phone_number, city_name, ward_name, delivery_address, hide)
VALUES (1, 2, 'Nguyễn Thị Hạnh', '0912345678', 'Hồ Chí Minh', 'Phường Bến Nghé', '125 Hai Bà Trưng', FALSE),
       (2, 3, 'Trần Văn Mạnh', '0987654321', 'Hà Nội', 'Phường Hàng Buồm', '60 Hàng Ngang', FALSE),
       (3, 4, 'Lê Anh Thư', '0955511223', 'Đà Nẵng', 'Phường Hòa Cường Bắc', '45 Phan Đăng Lưu', FALSE),
       (4, 5, 'Phạm Duy Khang', '0966677889', 'Cần Thơ', 'Phường An Lạc', '350/15 Đường 30 Tháng 4', FALSE),
       (5, 6, 'Võ Minh Tâm', '0977733445', 'Hải Phòng', 'Phường Lạch Tray', '202 Tô Hiệu', FALSE),
       (6, 7, 'Đặng Quốc Huy', '0911122334', 'Huế', 'Phường Phú Hội', '12 Hùng Vương', FALSE),
       (7, 8, 'Hoàng Kiều Trinh', '0988899001', 'Nha Trang', 'Phường Lộc Thọ', '404 Trần Phú', FALSE),
       (8, 9, 'Bùi Tấn Phát', '0955500112', 'Biên Hòa', 'Phường Tân Mai', '505 Đồng Khởi', FALSE),
       (9, 10, 'Chung Gia Khiêm', '0922244556', 'Vũng Tàu', 'Phường Thắng Nhất', '606 Lê Hồng Phong', FALSE),
       (10, 1, 'Quản Trị Viên', '0900000000', 'Hà Nội', 'Phường Tràng Tiền', '707 Đinh Tiên Hoàng', FALSE);

INSERT INTO volume_perfume (id, perfume_id, volume_id, price)
VALUES (1, 1, 2, 120.00),
       (2, 1, 3, 180.00),
       (3, 2, 3, 150.00),
       (4, 2, 4, 35.00),
       (5, 5, 5, 420.00),
       (6, 6, 2, 85.00),
       (7, 6, 3, 120.00),
       (8, 7, 3, 170.00),
       (9, 9, 3, 155.00),
       (10, 10, 5, 110.00),
       (11, 11, 1, 220.00),
       (12, 12, 5, 145.00),
       (13, 10, 9, 150.00),
       (14, 4, 2, 160.00),
       (15, 8, 3, 95.00);

INSERT INTO sample_image (id, perfume_id, path)
VALUES (1, 1, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777980564/images_u25t3b.jpg'),
       (2, 2, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982920/Charme_Mrcharme_100ml_New_2024_120250330143029820.png_jm2qi3.webp'),
       (3, 5, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982902/Charme_Ocean_50ml20250611171804418.png_ai7fg9.webp'),
       (4, 6, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982862/Charme_Basic_50ml20250611170843182.png_bb6zje.webp'),
       (5, 7, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982851/charme_king_30ml20260418164501461.png_vuezwg.webp'),
       (6, 9, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982827/Charme_Honey20260418174251161.png_lh1sba.webp'),
       (7, 10, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982824/Charme_Good_Girl_100ml_New_202420241116112950569.png_qh0frs.webp'),
       (8, 11, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982800/good_girl20201024200226271.jpg_lem8sf.webp'),
       (9, 12, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982777/2-768x768_c13gfe.png'),
       (10, 3, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982759/GOOD-GIRL-1_bvwohl.jpg'),
       (11, 4, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982742/BLEU-AND-BLEU-4-768x768_qx9cgb.jpg'),
       (12, 8, 'https://res.cloudinary.com/dewad4di1/image/upload/v1777982738/guility-768x768_azm9hq.jpg');

INSERT INTO note_perfume (id, note_id, perfume_id, type)
VALUES 
(1, 1, 1, 'Top'), (2, 10, 1, 'Top'), (3, 11, 1, 'Top'), (4, 2, 1, 'Heart'), (5, 7, 1, 'Heart'), (6, 15, 1, 'Heart'), (7, 5, 1, 'Base'), (8, 3, 1, 'Base'),
(9, 1, 2, 'Top'), (10, 11, 2, 'Top'), (11, 10, 2, 'Top'), (12, 6, 2, 'Heart'), (13, 14, 2, 'Heart'), (14, 12, 2, 'Heart'), (15, 9, 2, 'Base'), (16, 8, 2, 'Base'),
(17, 1, 3, 'Top'), (18, 10, 3, 'Top'), (19, 6, 3, 'Heart'), (20, 15, 3, 'Heart'), (21, 12, 3, 'Base'), (22, 14, 3, 'Base'),
(23, 11, 4, 'Top'), (24, 1, 4, 'Top'), (25, 10, 4, 'Top'), (26, 2, 4, 'Heart'), (27, 7, 4, 'Heart'), (28, 15, 4, 'Heart'), (29, 4, 4, 'Base'), (30, 3, 4, 'Base'),
(31, 10, 5, 'Top'), (32, 1, 5, 'Top'), (33, 11, 5, 'Top'), (34, 7, 5, 'Heart'), (35, 2, 5, 'Heart'), (36, 15, 5, 'Heart'), (37, 3, 5, 'Base'), (38, 5, 5, 'Base'),
(39, 11, 6, 'Top'), (40, 1, 6, 'Top'), (41, 10, 6, 'Top'), (42, 4, 6, 'Heart'), (43, 6, 6, 'Heart'), (44, 2, 6, 'Heart'), (45, 14, 6, 'Base'), (46, 12, 6, 'Base'),
(47, 10, 7, 'Top'), (48, 1, 7, 'Top'), (49, 6, 7, 'Heart'), (50, 2, 7, 'Heart'), (51, 4, 7, 'Base'), (52, 13, 7, 'Base'),
(53, 1, 8, 'Top'), (54, 11, 8, 'Top'), (55, 7, 8, 'Heart'), (56, 15, 8, 'Heart'), (57, 13, 8, 'Base'), (58, 14, 8, 'Base'),
(59, 11, 9, 'Top'), (60, 10, 9, 'Top'), (61, 8, 9, 'Heart'), (62, 13, 9, 'Heart'), (63, 12, 9, 'Base'), (64, 14, 9, 'Base'),
(65, 1, 10, 'Top'), (66, 10, 10, 'Top'), (67, 11, 10, 'Top'), (68, 12, 10, 'Heart'), (69, 3, 10, 'Heart'), (70, 7, 10, 'Heart'), (71, 13, 10, 'Base'), (72, 5, 10, 'Base'),
(73, 1, 11, 'Top'), (74, 11, 11, 'Top'), (75, 10, 11, 'Top'), (76, 2, 11, 'Heart'), (77, 7, 11, 'Heart'), (78, 15, 11, 'Heart'), (79, 4, 11, 'Base'), (80, 13, 11, 'Base'),
(81, 11, 12, 'Top'), (82, 1, 12, 'Top'), (83, 2, 12, 'Heart'), (84, 15, 12, 'Heart'), (85, 4, 12, 'Base'), (86, 13, 12, 'Base');

INSERT INTO invoice (id, user_id, address_id, created_at, total, receiver_name, phone_number, shipping_address,
                     delivery_status, payment_method, payment_status, vnpay_transaction_id)
VALUES (1, 2, 1, '2025-11-20 10:30:00', 120.00, 'Nguyễn Thị Hạnh', '0912345678',
        '125 Hai Bà Trưng, Phường Bến Nghé, Hồ Chí Minh', 'Shipped', 'Transfer', 'Paid', NULL),
       (2, 3, 2, '2025-11-25 15:00:00', 185.00, 'Trần Văn Mạnh', '0987654321',
        '60 Hàng Ngang, Phường Hàng Buồm, Hà Nội', 'Pending', 'Cash', 'Pending', NULL),
       (3, 4, 3, '2025-11-28 09:15:00', 420.00, 'Lê Anh Thư', '0955511223',
        '45 Phan Đăng Lưu, Phường Hòa Cường Bắc, Đà Nẵng', 'Confirmed', 'Transfer', 'Paid', NULL),
       (4, 5, 4, '2025-11-29 11:00:00', 205.00, 'Phạm Duy Khang', '0966677889',
        '350/15 Đường 30 Tháng 4, Phường An Lạc, Cần Thơ', 'Confirmed', 'Cash', 'Pending', NULL),
       (5, 6, 5, '2025-12-01 14:00:00', 170.00, 'Võ Minh Tâm', '0977733445', '202 Tô Hiệu, Phường Lạch Tray, Hải Phòng',
        'Pending', 'Transfer', 'Pending', NULL),
       (6, 7, 6, '2025-12-02 16:00:00', 155.00, 'Đặng Quốc Huy', '0911122334', '12 Hùng Vương, Phường Phú Hội, Huế',
        'Shipped', 'Cash', 'Paid', NULL),
       (7, 8, 7, '2025-12-03 08:00:00', 260.00, 'Hoàng Kiều Trinh', '0988899001',
        '404 Trần Phú, Phường Lộc Thọ, Nha Trang', 'Pending', 'Transfer', 'Pending', NULL),
       (8, 9, 8, '2025-12-03 09:00:00', 220.00, 'Bùi Tấn Phát', '0955500112', '505 Đồng Khởi, Phường Tân Mai, Biên Hòa',
        'Confirmed', 'Cash', 'Pending', NULL),
       (9, 10, 9, '2025-12-03 10:00:00', 145.00, 'Chung Gia Khiêm', '0922244556',
        '606 Lê Hồng Phong, Phường Thắng Nhất, Vũng Tàu', 'Pending', 'Transfer', 'Pending', NULL),
       (10, 2, 1, '2025-12-03 11:00:00', 160.00, 'Nguyễn Thị Hạnh', '0912345678',
        '125 Hai Bà Trưng, Phường Bến Nghé, Hồ Chí Minh', 'Shipped', 'Cash', 'Paid', NULL);

INSERT INTO invoice_details (id, volume_perfume_id, invoice_id, quantity, buy_price, perfume_name, volume_name)
VALUES (1, 1, 1, 1, 120.00, 'Coco Mademoiselle', 50.0),
       (2, 3, 2, 1, 150.00, 'Sauvage', 100.0),
       (3, 4, 2, 1, 35.00, 'Sauvage', 10.0),
       (4, 5, 3, 1, 420.00, 'Aventus', 75.0),
       (5, 6, 4, 1, 85.00, 'Eros', 50.0),
       (6, 7, 4, 1, 120.00, 'Eros', 100.0),
       (7, 8, 5, 1, 170.00, 'Libre', 100.0),
       (8, 9, 6, 1, 155.00, 'Wood Sage & Sea Salt', 100.0),
       (9, 10, 7, 1, 110.00, 'Explorer', 75.0),
       (10, 13, 7, 1, 150.00, 'Explorer', 125.0),
       (11, 11, 8, 1, 220.00, 'No. 5', 30.0),
       (12, 14, 10, 1, 160.00, 'Black Orchid', 50.0);