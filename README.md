# pro-nodeJS
### Before starting the project make sure that your .env file is already exist
*.env file must contains*
```
BOT_TOKEN = '[TOKEN FOR YOUR BOT]'
CLIENT_APP_URL = '[URL your web-app]'
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
CLIENT_APP_FORM_URL='https://telegram-web-app.netlify.app/form'
CLIENT_APP_CATALOG_URL='https://telegram-web-app.netlify.app/catalog'
```
### Run the next scripts

```
npm run docker:compose
npm run migrate
npm run seed
npm run dev

```