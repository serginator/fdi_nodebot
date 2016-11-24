# FDI NodeBot

Bot to remember birthdays in a Telegram chat for old university colleagues

## contribute

Make a fork of the repo and clone your fork

`git clone git@github.com:<your-username>/fdi_nodebot`

Install dependencies

`npm install`

Make your changes and open a pull request to main repo.

## configure file

Just add a file `.env` on root of the project, with the following content
```
TELEGRAM_TOKEN=XXXX:YYYY
CHANNEL_ID=123456
NODE_ENV=development
```

## configure list of birthdays

Just edit `birthdays.js` on root of the project, with the name as key and the birthday (day/month) as value
```
module.exports = {
    'Mike': '25/6',
    'Jenn': '12/5',
    'Lisa': '31/12',
    'Rob': '1/1',
    'Helen': '28/3'
}
```
