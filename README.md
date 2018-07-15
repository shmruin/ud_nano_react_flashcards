# ud_nano_react_flashcards

**1. main page**

![Alt text](screenshots/fc1.PNG?raw=true "main page view")

**2. new deck page**

![Alt text](screenshots/fc2.PNG?raw=true "new deck view")


**3. quiz main**

![Alt text](screenshots/fc3.PNG?raw=true "quiz main view")

**4. add a card**

![Alt text](screenshots/fc4.PNG?raw=true "add card view")

**5. card question & answer**

![Alt text](screenshots/fc5.PNG?raw=true "quiz question view")

![Alt text](screenshots/fc6.PNG?raw=true "quiz answer view")

**6. quiz result**

![Alt text](screenshots/fc7.PNG?raw=true "quiz result")



## Introduction

Udacity React nanodegree course **Flashcards project**.

This is a kind of self testing app known as `Flash Card`.

A user can make his own deck and cards on topics he wants to test later (+ Daily Notification)

3 main functions - Create, Delete, Test on Deck & Cards

Tested only on `Genymotion Android Emulator` with `React native & Expo`

Starter code is provided with Udactiy. Will be graded & feedback by their rubric and review.

Working on the structure of js files, all code inside them, and dealing with features of react

## Main features

* Deck Create & Delete - User can create and delete the deck he wants to.
* Card Add & Remove - User can add or remove a card to/from each deck.
* Test & Result - Main functions. Question can be fliped like **a real flash card**. Result will be shown after the test is finished.
* Daily Notifications - A local notification service of daily test.


## Stucture

**React Source**

![Alt text](screenshots/tree.PNG?raw=true "source tree view")


## How to run
- For window, With `git bash` terminal, do `yarn install` and then `yarn start` in this root folder
- Turn on the geny motion & start the virtual android device (Make sure your adb settings)
- press `a` on the terminal and app will run on the virtual device


## Environment
- Developed & Tested on `window 10`, `expo`, `geny motion`
- This app has No specific Backend Server. React native's `AsyncStorage` is used to support storage api functions on each device