# MERN Product Manager

A small MERN app: log in with an email, then add, view, edit and delete your products.

## Folder structure
```
mern-product-app/
├── backend/                  Express + MongoDB API
│   ├── config/db.js          MongoDB connection
│   ├── models/               Mongoose schemas (User, Product)
│   ├── controllers/          Business logic for each route
│   ├── routes/               URL -> controller mapping
│   ├── server.js             App entry point
│   └── .env                  MONGO_URI and PORT
└── frontend/                 React (Vite)
    └── src/
        ├── api.js            All axios calls to the backend
        ├── App.jsx           Chooses Login or Products page
        ├── pages/            Login.jsx, Products.jsx
        └── components/       ProductForm.jsx, ProductList.jsx
```

## Run it
1. Open `backend/.env` and set `MONGO_URI` to your MongoDB connection string.
2. Backend:   `cd backend && npm install && npm run dev`   (port 5000)
3. Frontend:  `cd frontend && npm install && npm run dev`  (port 5173)
4. Open http://localhost:5173

## API
| Method | URL                  | Purpose                                  |
|--------|----------------------|------------------------------------------|
| POST   | /api/users/register  | Sign up with email + password (bcrypt)   |
| POST   | /api/users/login     | Log in with email + password             |
| GET    | /api/products?userId | List a user's products                   |
| POST   | /api/products        | Add a product                            |
| PUT    | /api/products/:id    | Edit a product                           |
| DELETE | /api/products/:id    | Delete a product                         |

## How to explain it
- Request flow: React component -> `api.js` -> route -> controller -> Mongoose model -> MongoDB.
- Passwords are hashed with bcrypt (10 salt rounds) before saving; only the hash is stored and it is never sent back to the client.
- Login compares the typed password with the stored hash using `bcrypt.compare`. The returned user is kept in React state (refresh logs out; a real app would add a session or JWT).
- Each product stores the `user` id, so every user sees only their own products.
- Edit and add share one form component; the `editing` prop switches its mode.
