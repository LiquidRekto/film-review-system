# Film review system (Hệ thống đánh giá phim)
Đây là source code cho demo web hệ thống đánh giá phim.

Phần demo web này sử dụng: Express.js cho BE, React.js cho FE (Vite) - sử dụng Material UI, Sequelite được sử dụng để tương tác với DB.

# Các file ENV cần khởi tạo
Để phục vụ cho web chạy ổn định, sẽ cần phải khởi tạo một số biến môi trường, cụ thể như sau

**.env ở BE**
```env
# Port to run the server on
PORT=3001

# Folder where uploaded files are stored
UPLOAD_FOLDER=thư_mục_upload

# JWT
TOKEN_SECRET=mã_bí_mật
TOKEN_EXPIRATION=3600

# Database connection information
DB_DIALECT=mysql # Có thể là mysql, oracle, hoặc postgres
DB_NAME=ten_db
DB_HOST=localhost
DB_USERNAME=user_db
DB_PASSWORD=mat_khau_db
DB_PORT=3306
```

**.env ở FE**
```env
# BACKEND INFO
PORT=3001
API_ENDPOINT=

APP_KEY_ENCRYPTION=mã_khoá_bí_mật
```

# Khởi tạo DB
Để thuận tiện cho việc demo, 

```ps
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
Muốn reset lại DB, có thể thực hiện lần lượt theo thứ tự sau:
```ps
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
 
# Khởi chạy ứng dụng
Ở thư mục code mỗi bên FE và BE, tiến hành nhập `npm run dev` để khởi chạy. 
Thông thường, link vào web sẽ là `http://localhost:5173`
