# Restaurant List

A list designed to create, edit, delete, search restaurants and show each restaurant in details.

<img src="./public/image/snapshot.jpg" width="50%">

## Installing

1. 開啟終端機(Terminal)，clone 此專案至本機電腦
```
git clone https://github.com/peggy8865/restaurant-list.git
```

2. 初始化
```
cd restaurant-list  // 進入存放位置的資料夾
npm install  // 安裝套件
```

3. 設定連線至 MongoDB
```
touch .env // 新增檔案".env"
code .env // 開啟".env" 並設定連線字串如下：
```
```
MONGODB_URI=mongodb+srv://<你的 MongoDB 帳號>:<你的 MongoDB 密碼>@cluster0.xxxx.xxxx.net/<你的 MongoDB 資料庫名稱>?retryWrites=true&w=majority
```

4. 新增種子資料
```
npm run seed
```

5. 啟動程式
```
npm run dev
```

6. 終端顯示以下畫面即啟動完成，請至 http://localhost:3000 開始使用程式
```
Express is listening on http://localhost:3000
mongodb connected!
```

7. 結束程式
```
ctrl + c
```

## Built With

* [Node.js @18.12.0](https://nodejs.org/en/) - The web framework used
* [express @4.16.4](https://www.npmjs.com/package/express) - Dependency Management
* [express-handlebars @3.0.0](https://www.npmjs.com/package/express-handlebars) - Dependency Management
* [method-override @3.0.0](https://www.npmjs.com/package/method-override) - Dependency Management
* [MongoDB Atlas](https://www.mongodb.com/atlas/database) - Database service
* [mongoose @5.13.15](https://www.npmjs.com/package/mongoose) - Dependency Management
* [dotenv @16.0.3](https://www.npmjs.com/package/dotenv) - Develop dependency Management

## Acknowledgement

* [README-Template.md](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) - PurpleBooth
* Layout and partial template provided by AC