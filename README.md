# pro-nodeJS
### Before starting the project make sure that your .env file is already exist
*.env file must contains*
```
BOT_TOKEN = '[TOKEN FOR YOUR BOT]'
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
### Run the next scripts

```
npm run docker:compose
npm run migrate
npm run seed
npm run dev

```