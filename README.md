﻿# ProjectManagement

Tải xampp
https://www.apachefriends.org/download.html
Clone thư mục cnwtt về và cho vào thư mục xampp/htdocs
Vào 

Search: Xampp rồi bật XAPP controller panel lên

Start apache và sql lên (Lưu ý: Tắt sql server cũ ở máy đi nếu có)

vào cmd:
chuyển đường dẫn đến thư mục xamm\htdocs\cnwtt tùy vào đường dẫn của máy mọi người

gõ: 
php artisan migrate
php artisan db:seed
php artisan serve 

