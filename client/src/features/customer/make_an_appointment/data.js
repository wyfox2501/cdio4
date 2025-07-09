// src/features/customer/make_an_appointment/data.js

// Quan trọng: Hãy đảm bảo đường dẫn này chính xác đến tệp ảnh avatar của bạn
import Doctorimages from "../../../images/avatardoctor.png";

export const departments = [
  { id: 1, name: "Khoa Tai Mũi Họng" },
  { id: 2, name: "Khoa Nội" },
  { id: 3, name: "Khoa Ngoại" },
  { id: 4, name: "Khoa Nhi" },
  { id: 5, name: "Khoa Sản" }
];

export const doctorsData = {
  1: [
    { id: 1, name: "Nguyễn Văn An", experience: 15, title: "Bác sĩ chuyên khoa II", price: 250000, avatar: Doctorimages, dob: '10/10/1978', gender: 'Nam', phone: '0905111222', email: 'an.nguyen@clinic.com', address: '123 Hùng Vương, Hải Châu, Đà Nẵng' },
    { id: 2, name: "Trần Thị Minh Hằng", experience: 10, title: "Thạc sĩ Y khoa", price: 300000, avatar: Doctorimages, dob: '12/02/1992', gender: 'Nữ', phone: '0398886699', email: 'minhhong1992@clinic.com', address: '26 Hải Phòng, Hải Châu, Đà Nẵng' },
    { id: 3, name: "Phạm Hoàng Lâm", experience: 20, title: "Tiến sĩ Y khoa", price: 400000, avatar: Doctorimages, dob: '05/08/1973', gender: 'Nam', phone: '0913123456', email: 'lam.pham@clinic.com', address: '45 Lê Duẩn, Thanh Khê, Đà Nẵng' },
    { id: 4, name: "Võ Văn Thanh", experience: 8, title: "Bác sĩ chuyên khoa I", price: 350000, avatar: Doctorimages, dob: '22/11/1985', gender: 'Nam', phone: '0989654321', email: 'thanh.vo@clinic.com', address: '78 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng' },
    { id: 5, name: "Đỗ Mạnh Cường", experience: 12, title: "Bác sĩ chuyên khoa II", price: 320000, avatar: Doctorimages, dob: '14/07/1981', gender: 'Nam', phone: '0978111222', email: 'cuong.do@clinic.com', address: '101 Phan Châu Trinh, Hải Châu, Đà Nẵng' },
    { id: 6, name: "Hoàng Văn Bình", experience: 18, title: "Tiến sĩ Y khoa", price: 500000, avatar: Doctorimages, dob: '30/03/1975', gender: 'Nam', phone: '0935333444', email: 'binh.hoang@clinic.com', address: '210 Trần Phú, Hải Châu, Đà Nẵng' },
    { id: 7, name: "Nguyễn Thị Lan", experience: 7, title: "Thạc sĩ Y khoa", price: 280000, avatar: Doctorimages, dob: '18/09/1988', gender: 'Nữ', phone: '0945555666', email: 'lan.nguyen@clinic.com', address: '33 Pasteur, Hải Châu, Đà Nẵng' },
    { id: 8, name: "Trần Đức Long", experience: 14, title: "Bác sĩ chuyên khoa I", price: 330000, avatar: Doctorimages, dob: '25/04/1979', gender: 'Nam', phone: '0965777888', email: 'long.tran@clinic.com', address: '55 Hoàng Diệu, Hải Châu, Đà Nẵng' },
    { id: 9, name: "Phạm Thùy Linh", experience: 9, title: "Bác sĩ chuyên khoa II", price: 270000, avatar: Doctorimages, dob: '11/12/1984', gender: 'Nữ', phone: '0925999000', email: 'linh.pham@clinic.com', address: '88 Triệu Nữ Vương, Hải Châu, Đà Nẵng' },
    { id: 10, name: "Lê Văn Tài", experience: 11, title: "Bác sĩ chuyên khoa I", price: 310000, avatar: Doctorimages, dob: '07/06/1982', gender: 'Nam', phone: '0906112233', email: 'tai.le@clinic.com', address: '150 Đống Đa, Hải Châu, Đà Nẵng' }
  ],
  2: [ 
    { id: 11, name: "Vũ Minh Quân", experience: 9, title: "Bác sĩ chuyên khoa I", price: 280000, avatar: Doctorimages, dob: '01/01/1984', gender: 'Nam', phone: '0918121314', email: 'quan.vu@clinic.com', address: '12 Quang Trung, Hải Châu, Đà Nẵng' },
    { id: 12, name: "Ngô Thị Hương", experience: 12, title: "Thạc sĩ Y khoa", price: 320000, avatar: Doctorimages, dob: '02/02/1981', gender: 'Nữ', phone: '0987151617', email: 'huong.ngo@clinic.com', address: '34 Lê Lợi, Hải Châu, Đà Nẵng' },
    { id: 13, name: "Đinh Văn Tú", experience: 15, title: "Tiến sĩ Y khoa", price: 450000, avatar: Doctorimages, dob: '03/03/1978', gender: 'Nam', phone: '0976181920', email: 'tu.dinh@clinic.com', address: '56 Bạch Đằng, Hải Châu, Đà Nẵng' },
    { id: 14, name: "Lương Thị Mai", experience: 6, title: "Bác sĩ chuyên khoa II", price: 260000, avatar: Doctorimages, dob: '04/04/1989', gender: 'Nữ', phone: '0944212223', email: 'mai.luong@clinic.com', address: '78 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng' },
    { id: 15, name: "Phan Đức Thành", experience: 18, title: "Bác sĩ chuyên khoa I", price: 380000, avatar: Doctorimages, dob: '05/05/1975', gender: 'Nam', phone: '0903242526', email: 'thanh.phan@clinic.com', address: '90 Ông Ích Khiêm, Thanh Khê, Đà Nẵng' },
    { id: 16, name: "Trương Thị Ngọc", experience: 8, title: "Bác sĩ Nhi khoa", price: 270000, avatar: Doctorimages, dob: '06/06/1987', gender: 'Nữ', phone: '0912272829', email: 'ngoc.truong@clinic.com', address: '112 Lý Thái Tổ, Thanh Khê, Đà Nẵng' },
    { id: 17, name: "Bùi Văn Hiếu", experience: 11, title: "Thạc sĩ Nhi khoa", price: 310000, avatar: Doctorimages, dob: '07/07/1982', gender: 'Nam', phone: '0988303132', email: 'hieu.bui@clinic.com', address: '134 Điện Biên Phủ, Thanh Khê, Đà Nẵng' },
    { id: 18, name: "Hoàng Thị Thảo", experience: 14, title: "Tiến sĩ Nhi khoa", price: 420000, avatar: Doctorimages, dob: '08/08/1979', gender: 'Nữ', phone: '0967333435', email: 'thao.hoang@clinic.com', address: '156 Hải Phòng, Thanh Khê, Đà Nẵng' },
    { id: 19, name: "Mai Văn Đạt", experience: 5, title: "Bác sĩ chuyên khoa II", price: 240000, avatar: Doctorimages, dob: '09/09/1990', gender: 'Nam', phone: '0945363738', email: 'dat.mai@clinic.com', address: '178 Lê Duẩn, Thanh Khê, Đà Nẵng' },
    { id: 20, name: "Lê Thị Hồng", experience: 16, title: "Bác sĩ chuyên khoa I", price: 360000, avatar: Doctorimages, dob: '10/10/1977', gender: 'Nữ', phone: '0905394041', email: 'hong.le@clinic.com', address: '200 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng' }
  ],
  3: [
    { id: 21, name: "Nguyễn Thị Hằng", experience: 7, title: "Bác sĩ Da liễu", price: 290000, avatar: Doctorimages, dob: '11/11/1988', gender: 'Nữ', phone: '0913424344', email: 'hang.nguyen@clinic.com', address: '222 Trần Cao Vân, Thanh Khê, Đà Nẵng' },
    { id: 22, name: "Trần Văn Khôi", experience: 10, title: "Thạc sĩ Da liễu", price: 330000, avatar: Doctorimages, dob: '12/12/1983', gender: 'Nam', phone: '0989454647', email: 'khoi.tran@clinic.com', address: '244 Ông Ích Khiêm, Thanh Khê, Đà Nẵng' },
    { id: 23, name: "Phạm Thị Lan", experience: 13, title: "Tiến sĩ Da liễu", price: 410000, avatar: Doctorimages, dob: '01/02/1980', gender: 'Nữ', phone: '0978484950', email: 'lan.pham@clinic.com', address: '266 Lý Thái Tổ, Thanh Khê, Đà Nẵng' },
    { id: 24, name: "Đỗ Minh Tuấn", experience: 4, title: "Bác sĩ chuyên khoa II", price: 220000, avatar: Doctorimages, dob: '02/03/1991', gender: 'Nam', phone: '0946515253', email: 'tuan.do@clinic.com', address: '288 Điện Biên Phủ, Thanh Khê, Đà Nẵng' },
    { id: 25, name: "Võ Thị Kim", experience: 17, title: "Bác sĩ chuyên khoa I", price: 390000, avatar: Doctorimages, dob: '03/04/1976', gender: 'Nữ', phone: '0904545556', email: 'kim.vo@clinic.com', address: '310 Hải Phòng, Thanh Khê, Đà Nẵng' },
    { id: 26, name: "Lê Minh Tâm", experience: 6, title: "Bác sĩ Da liễu", price: 280000, avatar: Doctorimages, dob: '04/05/1989', gender: 'Nam', phone: '0912575859', email: 'tam.le@clinic.com', address: '332 Lê Duẩn, Thanh Khê, Đà Nẵng' },
    { id: 27, name: "Nguyễn Văn Hoàng", experience: 12, title: "Thạc sĩ Da liễu", price: 350000, avatar: Doctorimages, dob: '05/06/1981', gender: 'Nam', phone: '0987606162', email: 'hoang.nguyen@clinic.com', address: '354 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng' },
    { id: 28, name: "Trần Thu Hương", experience: 8, title: "Tiến sĩ Da liễu", price: 420000, avatar: Doctorimages, dob: '06/07/1987', gender: 'Nữ', phone: '0965636465', email: 'huong.tran@clinic.com', address: '376 Trần Cao Vân, Thanh Khê, Đà Nẵng' },
    { id: 29, name: "Hoàng Văn Sơn", experience: 5, title: "Bác sĩ chuyên khoa I", price: 260000, avatar: Doctorimages, dob: '07/08/1990', gender: 'Nam', phone: '0943666768', email: 'son.hoang@clinic.com', address: '398 Ông Ích Khiêm, Thanh Khê, Đà Nẵng' },
    { id: 30, name: "Phạm Thùy Dung", experience: 15, title: "Bác sĩ chuyên khoa II", price: 390000, avatar: Doctorimages, dob: '08/09/1978', gender: 'Nữ', phone: '0902697071', email: 'dung.pham@clinic.com', address: '420 Lý Thái Tổ, Thanh Khê, Đà Nẵng' }
  ],
  4: [
    { id: 31, name: "Đỗ Hải Nam", experience: 10, title: "Tiến sĩ Nhi khoa", price: 450000, avatar: Doctorimages, dob: '09/10/1983', gender: 'Nam', phone: '0913727374', email: 'nam.do@clinic.com', address: '442 Điện Biên Phủ, Thanh Khê, Đà Nẵng' },
    { id: 32, name: "Nguyễn Thị Lan Anh", experience: 7, title: "Bác sĩ Nhi khoa", price: 270000, avatar: Doctorimages, dob: '10/11/1988', gender: 'Nữ', phone: '0988757677', email: 'lananh.nguyen@clinic.com', address: '464 Hải Phòng, Thanh Khê, Đà Nẵng' },
    { id: 33, name: "Trần Đăng Khoa", experience: 11, title: "Bác sĩ chuyên khoa I", price: 300000, avatar: Doctorimages, dob: '11/12/1982', gender: 'Nam', phone: '0976787980', email: 'khoa.tran@clinic.com', address: '486 Lê Duẩn, Thanh Khê, Đà Nẵng' },
    { id: 34, name: "Lê Hoàng Phúc", experience: 9, title: "Thạc sĩ Nhi khoa", price: 320000, avatar: Doctorimages, dob: '12/01/1984', gender: 'Nam', phone: '0944818283', email: 'phuc.le@clinic.com', address: '508 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng' },
    { id: 35, name: "Vũ Bảo Châu", experience: 14, title: "Tiến sĩ Nhi khoa", price: 480000, avatar: Doctorimages, dob: '01/02/1979', gender: 'Nữ', phone: '0903848586', email: 'chau.vu@clinic.com', address: '530 Trần Cao Vân, Thanh Khê, Đà Nẵng' },
    { id: 36, name: "Ngô Thanh Tùng", experience: 8, title: "Bác sĩ chuyên khoa II", price: 310000, avatar: Doctorimages, dob: '02/03/1987', gender: 'Nam', phone: '0912878889', email: 'tung.ngo@clinic.com', address: '552 Ông Ích Khiêm, Thanh Khê, Đà Nẵng' },
    { id: 37, name: "Bùi Hồng Nhung", experience: 6, title: "Bác sĩ Nhi khoa", price: 250000, avatar: Doctorimages, dob: '03/04/1989', gender: 'Nữ', phone: '0987909192', email: 'nhung.bui@clinic.com', address: '574 Lý Thái Tổ, Thanh Khê, Đà Nẵng' },
    { id: 38, name: "Hoàng Đức Minh", experience: 13, title: "Tiến sĩ Nhi khoa", price: 460000, avatar: Doctorimages, dob: '04/05/1980', gender: 'Nam', phone: '0965939495', email: 'minh.hoang@clinic.com', address: '596 Điện Biên Phủ, Thanh Khê, Đà Nẵng' },
    { id: 39, name: "Lương Minh Hạnh", experience: 9, title: "Bác sĩ chuyên khoa I", price: 330000, avatar: Doctorimages, dob: '05/06/1984', gender: 'Nữ', phone: '0943969798', email: 'hanh.luong@clinic.com', address: '618 Hải Phòng, Thanh Khê, Đà Nẵng' },
    { id: 40, name: "Phan Thị Thanh", experience: 7, title: "Thạc sĩ Nhi khoa", price: 300000, avatar: Doctorimages, dob: '06/07/1988', gender: 'Nữ', phone: '0902990001', email: 'thanh.phan@clinic.com', address: '640 Lê Duẩn, Thanh Khê, Đà Nẵng' }
  ],
  5: [
    { id: 41, name: "Đoàn Ngọc Khánh", experience: 10, title: "Tiến sĩ Sản khoa", price: 400000, avatar: Doctorimages, dob: '07/08/1983', gender: 'Nữ', phone: '0914020304', email: 'khanh.doan@clinic.com', address: '662 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng' },
    { id: 42, name: "Nguyễn Hải Đăng", experience: 5, title: "Bác sĩ Sản khoa", price: 280000, avatar: Doctorimages, dob: '08/09/1990', gender: 'Nam', phone: '0986050607', email: 'dang.nguyen@clinic.com', address: '684 Trần Cao Vân, Thanh Khê, Đà Nẵng' },
    { id: 43, name: "Trịnh Văn Quân", experience: 12, title: "Bác sĩ chuyên khoa I", price: 350000, avatar: Doctorimages, dob: '09/10/1981', gender: 'Nam', phone: '0975080910', email: 'quan.trinh@clinic.com', address: '706 Ông Ích Khiêm, Thanh Khê, Đà Nẵng' },
    { id: 44, "name": "Lê Phương Mai", "experience": 6, "title": "Bác sĩ Sản khoa", "price": 290000, "avatar": Doctorimages, "dob": "10/11/1989", "gender": "Nữ", "phone": "0943111213", "email": "mai.le@clinic.com", "address": "728 Lý Thái Tổ, Thanh Khê, Đà Nẵng" },
    { id: 45, name: "Nguyễn Đức Huy", experience: 11, title: "Thạc sĩ Sản khoa", price: 370000, avatar: Doctorimages, dob: '11/12/1982', gender: 'Nam', phone: '0902141516', email: 'huy.nguyen@clinic.com', address: '750 Điện Biên Phủ, Thanh Khê, Đà Nẵng' },
    { id: 46, name: "Hoàng Thanh Tâm", experience: 15, title: "Tiến sĩ Sản khoa", price: 490000, avatar: Doctorimages, dob: '12/01/1978', gender: 'Nữ', phone: '0914171819', email: 'tam.hoang@clinic.com', address: '772 Hải Phòng, Thanh Khê, Đà Nẵng' },
    { id: 47, name: "Vũ Minh Tú", experience: 9, title: "Bác sĩ chuyên khoa I", price: 320000, avatar: Doctorimages, dob: '01/02/1984', gender: 'Nam', phone: '0986202122', email: 'tu.vu@clinic.com', address: '794 Lê Duẩn, Thanh Khê, Đà Nẵng' },
    { id: 48, name: "Bạch Hải Yến", experience: 7, title: "Bác sĩ Sản khoa", price: 280000, avatar: Doctorimages, dob: '02/03/1988', gender: 'Nữ', phone: '0975232425', email: 'yen.bach@clinic.com', address: '816 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng' },
    { id: 49, name: "Trần Minh Quang", experience: 10, title: "Thạc sĩ Sản khoa", price: 360000, avatar: Doctorimages, dob: '03/04/1983', gender: 'Nam', phone: '0943262728', email: 'quang.tran@clinic.com', address: '838 Trần Cao Vân, Thanh Khê, Đà Nẵng' },
    { id: 50, name: "Nguyễn Ngọc Bảo", experience: 14, title: "Tiến sĩ Sản khoa", price: 470000, avatar: Doctorimages, dob: '04/05/1979', gender: 'Nữ', phone: '0902293031', email: 'bao.nguyen@clinic.com', address: '860 Ông Ích Khiêm, Thanh Khê, Đà Nẵng' }
  ]
};