You can run project using docker. In ./backend project you need to add .env file

``` env
EXCHANGE_RATE_API_URL=<API_URL>
EXCHANGE_RATE_API_KEY=<API_KEY>
```

## Project setup

```bash
$ docker-compose up -d
```

or you can run project using npm

```bash
cd backend
$ npm install
$ npm run start:dev

cd frontend
$ npm install
$ npm run dev
```