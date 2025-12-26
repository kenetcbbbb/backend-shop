# backend-shop
# Конструктор комплексных услуг / курсов

Полноценное full‑stack приложение, позволяющее пользователю выбирать услугу, кастомизировать её товарами и оформлять заказ.  
Проект состоит из двух частей:

- backend — Node.js + Express + PostgreSQL  
- frontend — React

## 🚀 Стек технологий

### Frontend
- React  
- React Router  
- Axios  
- CSS / адаптивная верстка  

### Backend
- Node.js  
- Express  
- PostgreSQL  
- pg (node-postgres)

## 📁 Структура backend 
/project
/backend-shop
README.md

## Структура frontend
/frontend
/src
/components
/pages
/api
package.json
README.md 
---

# 🛠 Установка и запуск проекта

## 1. Клонирование репозитория

git clone https://github.com/kenetcbbbb/backend-shop.git
cd backend-shop

## 2. 

git clone https://github.com/kenetcbbbb/frontend.git
cd frontend

# 🔧 Backend

## 📍 Перейти в папку backend

cd backend

## 📦 Установка зависимостей

npm install

## ⚙️ Настройка окружения

Создайте файл .env:

PORT=3000
DATABASE_URL=postgres://postgres:12345@localhost:5432/shop_db

## 🗄 Создание базы данных

Выполните миграцию:

psql -U postgres -d shop_db -f migrations/init.sql

## ▶ Запуск backend

npm start

Backend будет доступен по адресу:

http://localhost:3000

# 🎨 Frontend

## 📍 Перейти в папку frontend

cd frontend 

## 📦 Установка зависимостей

npm install

## ⚙️ Настройка API URL

В файле src/api/api.js:

export const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

## ▶ Запуск frontend

npm start

Frontend будет доступен по адресу:

http://localhost:3001

# 🧪 Проверка работы

1. Откройте http://localhost:3001  
2. Выберите услугу  
3. Выберите товары  
4. Оформите заказ  
5. Убедитесь, что заказ появился в базе данных  

---

# 🗄 Миграции базы данных

Файл миграции находится в:

backend-shop/migrations/init.sql

Содержит создание таблиц:

- services  
- products  
- packages  
- orders  
- order_products  

---

# 📌 API эндпоинты

### Получить список услуг
GET /api/services### Получить услугу и товары
GET /api/services/:id### Создать заказ
POST /api/ordersТело запроса:
{
  "serviceId": 1,
  "products": [1, 3],
  "customerInfo": {
    "name": "Имя",
    "email": "email@example.com",
    "phone": "89999999999"
  }
}---

# 📄 Команды разработки

### Backend:
npm start — запуск сервера
npm run dev — запуск с nodemon (если настроено)
### Frontend:
npm start — запуск React
npm run build — сборка проекта

# 📦 Требования

- Node.js >= 18  
- PostgreSQL >= 14  
- npm >= 9  
- Git
