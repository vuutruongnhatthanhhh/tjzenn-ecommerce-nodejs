# TJZenn Ecommerce Course

This is a full-stack ecommerce project built with **React.js**, **Node.js**, **MySQL**, and **Cloudinary**.

## 🔧 Project Structure

- Frontend: React.js
- Backend: Node.js (TypeScript)
- Database: MySQL
- Image Hosting: Cloudinary

---

## 📦 Module Aliases

(package.json)

In development:

```json
"_moduleAliases": {
  "@": "src"
}
```

In production:

```json
"_moduleAliases": {
  "@": "dist"
}
```

---

## 📁 Environment Variables

All required environment variables should be declared in the `.env` file. Example: .env.example

---

## 🛠 Database Scripts

Backup the database:

```bash
./script/backup.sh
```

Restore the database:

```bash
./script/restore.sh ../backup/[filename].sql
```

---

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create and configure your `.env` file
4. Run the development server:
   ```bash
   npm run dev
   ```

For production:

```bash
npm run build
npm run start
```

---

Happy coding with ❤️ from **TJZenn Team**
