// utils/generateUsers.js

const firstNames = ["Nguyen", "Tran", "Le", "Pham", "Hoang", "Do", "Bui", "Dang", "Vo", "Phan"];
const lastNames = ["Anh", "Binh", "Cuong", "Dung", "Hoa", "Khanh", "Linh", "Minh", "Nam", "Thao", "Trang", "Tuan", "Van"];

const roles = ["user", "seller"];
const statuses = ["active", "inactive", "banned"];

// random int trong khoảng [min, max]
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// random ngày từ 2025-01-01 đến 2025-08-31
const randomDate = () => {
    const start = new Date("2025-01-01").getTime();
    const end = new Date("2025-08-31").getTime();
    return new Date(randomInt(start, end)).toISOString().split("T")[0];
};

// tạo user giả lập
const generateUser = () => {
    const id = randomInt(100000, 999999); // id 6 số
    const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${fname} ${lname}`;
    const email = `${lname.toLowerCase()}${randomInt(10, 99)}@example.com`;
    const phone = `09${randomInt(1000000, 9999999)}`;

    return {
        id,
        name,
        email,
        phone,
        address: "Việt Nam",
        avatar: null,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: randomDate(),
    };
};

// tạo mảng user
const generateUsers = (count = 20) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(generateUser());
    }

    // thêm admin
    users.push({
        id: 999999,
        name: "Admin",
        email: "admin@example.com",
        phone: "0900000000",
        address: "Hà Nội",
        avatar: null,
        role: "admin",
        status: "active",
        createdAt: "2025-01-01",
    });

    return users;
};

// Xuất dữ liệu
export const users = generateUsers(30);
