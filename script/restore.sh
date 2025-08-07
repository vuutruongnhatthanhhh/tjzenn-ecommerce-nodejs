#!/bin/bash

# Cấu hình
ENV_FILE="../.env"
TMP_PATH="/tmp/backup.sql"
BACKUP_FILE=${1:-"../backup/backup_default.sql"} # truyền tên file backup

# Đọc biến từ .env
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
else
  echo "Không tìm thấy file .env"
  exit 1
fi

# Kiểm tra biến cần thiết
if [ -z "$MYSQL_DATABASE" ]; then
  echo "Chưa có biến MYSQL_DATABASE trong .env"
  exit 1
fi

if [ -z "$MYSQL_ROOT_PASSWORD" ]; then
  echo "Chưa có biến MYSQL_ROOT_PASSWORD trong .env"
  exit 1
fi

if [ -z "$MYSQL_CONTAINER_NAME" ]; then
  echo "Chưa có biến MYSQL_CONTAINER_NAME trong .env"
  exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
  echo "File backup không tồn tại: $BACKUP_FILE"
  exit 1
fi

echo "Sắp xoá toàn bộ dữ liệu trong database: $MYSQL_DATABASE"
read -p "Bạn có chắc chắn muốn tiếp tục không? (y/N): " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Huỷ thao tác restore"
  exit 0
fi

# Reset database
echo "Xoá và tạo lại database $MYSQL_DATABASE..."
docker exec $MYSQL_CONTAINER_NAME mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "DROP DATABASE IF EXISTS \`$MYSQL_DATABASE\`; CREATE DATABASE \`$MYSQL_DATABASE\`;"

# Copy file vào container
echo "Copy file backup vào container..."
docker cp "$BACKUP_FILE" "$MYSQL_CONTAINER_NAME:$TMP_PATH"

# Restore database
echo "Bắt đầu restore từ container..."
docker exec -i $MYSQL_CONTAINER_NAME sh -c "mysql -u root -p\"\$MYSQL_ROOT_PASSWORD\" $MYSQL_DATABASE < $TMP_PATH"

# Dọn dẹp file tạm
echo "Xoá file tạm trong container..."
docker exec $MYSQL_CONTAINER_NAME sh -c "rm '$TMP_PATH'"

echo "Restore thành công"
