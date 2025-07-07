# 🛒 E-Commerce REST API

A complete backend solution for an E-commerce platform built with **Node.js**, **Express**, and **MongoDB**.  
It includes **user authentication**, **role-based access (admin/customer)**, **product management**, **cart**, **orders**, and **JWT-secured routes**.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens), Cookies
- **Authorization**: Role-based (admin/customer)
- **Testing Tool**: Postman
- **Security**: Bcrypt for password hashing, Validator for email/password

---

## 📦 Features

### 🔐 Authentication
- User registration and login
- Passwords are securely hashed using bcrypt
- Authenticated sessions using JWT tokens stored in cookies

### 👥 Roles
- **Admin**: Can create, update, and delete products
- **Customer**: Can view products, manage cart, and place orders

### 🛍️ Product Management
- Add new products (admin only)
- View all or a single product
- Update or delete a product (admin only)
- Pagination support for product listing

### 🛒 Cart Functionality
- Add products to cart
- Update quantity of items
- Remove items
- Automatically calculates subtotal

### 📦 Orders
- Place an order directly from cart
- View past orders

---

## 📁 Project Structure

```bash
│
├── config/ # MongoDB connection
├── middleware/ # Auth and role middleware
├── models/ # Mongoose schemas
├── routers/ # All API routes (auth, product, cart, order)
├── .env # Environment variables
├── app.js # Main Express app
├── package.json
└── README.md

```



## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/vishalnani21/adapNXT_e-commerce_assignment.git
cd e-commerce_project
```
### 2. Install Dependencies
```bash

npm install

```


### 3. Setup Environment Variables
Create a .env file in the root with the following:

env

PORT=5000
MONGODB_URI=mongodb+srv://vishalnani21:Vishal17@devtinder.xsalga6.mongodb.net/
JWT_SECRET=adapNXTecommerce123

### 4. Start the Server
```bash
node src/app.js
```


5. Use Postman for API Testing
