# <p align="center"> Telegram Birthday Bot <br> ![Contributors][contributors] ![Top Language][top_language] ![Size of repo][repo_size] <br> ![Stars][stars] ![Issues][issues] ![Pull Request][pull_request]</p>

## :clipboard: Description

This bot was developed to help you to remind about chat members birthdays.
It also has an additional functionality as getting user age,
or checking who among members already had birthday this year.

## :computer: Technologies

Project is created with:

> - **NodeJS 16.17.1 ![Node JS][node_js_technologie]**

> - **Telegraf ![Telegraf][telegraf_technologie]**

> - **Typescript ![Typescript][typescript_technologie]**

> - **Google sheets API ![Google Sheets][google_sheets_technologie]**

## :gear: Commands

|          Command           | Description                                          |
| :------------------------: | ---------------------------------------------------- |
|        `/birthdays`        | : list of all birthdays                              |
|     `/getAge {number}`     | : return age of member                               |
| `/getBirthday {@nickname}` | : remain days to birthday from today                 |
|      `/pastBirthdays`      | : list of members who already had birthday this year |
|     `/futureBirthdays`     | : list of members who will have birthday this year   |
| `/whoHasThisAge` {number}  | : people who has this age                            |

## :books: How to use

1. **Create an empty google sheet [here][googlesheets_link]**
2. **Get your google spreadsheet api key and take spreadsheet id from url**
3. **Fill spreadsheet with correspoding coloumns**:

- **The date of sending your spreadsheet**: _`number`_
- **Your email**: _`string`_
- **GitHub nickname**: _`string`_
- **Years**: _`number`_
- **Motivation, why you are here**: _`string`_
- **Date of your birthday (for sweets)**: _`string`_
- **What do you want to do?**: _`string`_
- **How much time in a week do you code?**: _`string`_
- **What is the most important thing for you?**: _`string`_
- **Telegram nickname**: _`string`_
- **Status**: _`string`_

## 📁 Available Scripts

To run this project, install it locally using npm:

```
$ npm install
$ npm start
```

## 👩🏻‍💻 Authors

<br>

<details>
    <summary>
        <b>Viktoria Grechukha</b>
    </summary>
    <br>

- GitHub - is [here][viktoria_github]
- LinkedIn - is [here][viktoria_linkedin]

</details>

<br>

<details>        
    <summary>
        <b>Valeria Proshachenko</b>
    </summary>
    <br>

- GitHub - is [here][valeria_github]
- LinkedIn - is [here][valeria_linkedin]

</details>

<br>

<details>        
    <summary>
        <b>Yuliya Pirogova</b>
    </summary>
    <br>

- GitHub - is [here][julia_github]
- LinkedIn - is [here][julia_linkedin]

    <br>

</details>

<br> <br> <br>

<p align="right"><a href="#TOP"><b>Back to the beginning</b></a></p>
<p align="right"><a href="#clipboard-description"><b>Back to the description</b></a></p>
<p align="right"><a href="#computer-technologies"><b>Back to the technologies</b></a></p>
<p align="right"><a href="#gear-commands"><b>Back to the commands</b></a></p>
<p align="right"><a href="#books-how-to-use"><b>Back to the tutorial</b></a></p>
<p align="right"><a href="#-available-scripts"><b>Back to the list of script</b></a></p>
<p align="right"><a href="#-authors"><b>Back to the Authors</b></a></p>

<!--- Variables --->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

<!--- Google Sheets link --->

[googlesheets_link]: https://www.google.com/sheets/about/

<!--- Authors links --->

<!--- Github --->

[viktoria_github]: https://github.com/vgrechukha
[valeria_github]: https://github.com/Valerchixxx
[julia_github]: https://github.com/YuliyaDM

<!--- LinkedIn --->

[viktoria_linkedin]: https://www.linkedin.com/in/vhrechukha/
[valeria_linkedin]: https://www.linkedin.com/in/%D0%B2%D0%B0%D0%BB%D0%B5%D1%80%D0%B8%D1%8F-%D0%BF%D1%80%D0%BE%D1%88%D0%B0%D1%87%D0%B5%D0%BD%D0%BA%D0%BE-71a506252/
[julia_linkedin]: https://www.linkedin.com/in/yuliya-pirogova-99880b245/

<!--- Shiels --->

<!--- About the repository --->

[repo_size]: https://img.shields.io/github/repo-size/shpp-afterjs/birthday_bot?style=flat-square&labelColor=64500a&color=yellow
[contributors]: https://img.shields.io/github/contributors/shpp-afterjs/birthday_bot.svg?style=flat-square&color=purple&labelColor=4a004a
[stars]: https://img.shields.io/github/stars/shpp-afterjs/birthday_bot.svg?style=flat-square
[issues]: https://shields.io/github/issues-raw/shpp-afterjs/birthday_bot?style=flat-square
[pull_request]: https://shields.io/github/issues-pr/shpp-afterjs/birthday_bot?style=flat-square
[top_language]: https://img.shields.io/github/languages/top/shpp-afterjs/birthday_bot.svg?style=flat-square&logo=github&color=darkgreen&labelColor=023302

<!--- Technologies --->

[telegraf_technologie]: https://img.shields.io/badge/Telegraf-black.svg?style=for-the-badge&logo=telegram&logoColor=e741ff&color=222
[node_js_technologie]: https://img.shields.io/badge/Node%20JS-black.svg?style=for-the-badge&logo=Node.js&logoColor=30bbff&color=222
[typescript_technologie]: https://img.shields.io/badge/Typescript-black.svg?style=for-the-badge&logo=Typescript&logoColor=336fff&color=222
[google_sheets_technologie]: https://img.shields.io/badge/Google%20sheets-black.svg?style=for-the-badge&logo=Google%20Sheets&logoColor=119111&color=222
