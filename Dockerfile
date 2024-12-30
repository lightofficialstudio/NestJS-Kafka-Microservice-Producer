FROM node:22

# ตั้งค่า working directory
WORKDIR /users/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# คัดลอก tsconfig.json
COPY tsconfig*.json ./

# ติดตั้ง Depadency
RUN npm install

# คัดลอก source code เข้าไปใน container
COPY ./src .

# คัดลอก .env
COPY .env ./

EXPOSE 3001

# รันแอปพลิเคชัน
CMD ["npm","run","start"]