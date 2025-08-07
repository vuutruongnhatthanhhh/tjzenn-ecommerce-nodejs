#!/bin/bash

# Cấu hình
ENV_FILE="../.env"
BACKUP_DIR="../backup"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="backup_${TIMESTAMP}.sql"

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

# Tạo thư mục backup nếu chưa có
mkdir -p "$BACKUP_DIR"

echo "Dump database $MYSQL_DATABASE từ container $MYSQL_CONTAINER_NAME..."
docker exec $MYSQL_CONTAINER_NAME sh -c "mysqldump -u root -p\"\$MYSQL_ROOT_PASSWORD\" $MYSQL_DATABASE" > "$BACKUP_DIR/$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "Backup thành công: $BACKUP_DIR/$BACKUP_FILE"
else
  echo "Có lỗi xảy ra khi backup"
fi
