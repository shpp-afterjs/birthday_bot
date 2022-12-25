# Telegram Birthday Bot


## 📋 Description
This bot was developed to help you to remind about chat members birthdays.
It also has an additional functionality as getting user age,
 or checking who among members already had birthday this year.


## :computer: Technologies
Project is created with:
* nodejs 16.17.1
* telegraf
* typescript
* google sheets

## :gear: Commands

/birthdays
: list of all birthdays

/getAge {number}
: return age of member

/getBirthday {@nickname}
: remain days to birthday from today

/pastBirthdays
: list of members who already had birthday this year

/futureBirthdays
: list of members who will have birthday this year

/whoHasThisAge {number}
: people who has this age


## :books: How to use
1. __Create an empty google sheet on__
https://www.google.com/sheets/about/
2. __Get your google spreadsheet api key and take spreadsheet id from url__
3. __Fill spreadsheet with correspoding coloumns__:
* Отметка времени: number
* Адрес электронной почты: string
* Ник гитхаба: string
* лет: number
* Мотивация того, почему ты тут: string
* Дата рождения (для вкусняшек): string
* Хочу делать: string
* Сколько времени в неделю в среднем уделяешь программированию(в часах)?: string
* Чего хотелось бы больше?: string
* Ник в телеграме: string
* Статус: string

## Available Scripts
To run this project, install it locally using npm:
```
$ npm install
$ npm start
```
