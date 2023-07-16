const puppeteer = require('puppeteer')

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'abcdhello012@gmail.com'
const password = 'Gaurav@12'

let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
})
let page
browserOpen.then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function (newTab) {
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function () {
    let emailIsEntered = page.type("input[type='text']", email, { delay: 50 })
    return emailIsEntered
}).then(function () {
    let passwordIsEntered = page.type("input[type = 'password']", password, { delay: 50 })
    return passwordIsEntered
}).then(function () {
    let loginButtonClicked = page.click("button[data-analytics='LoginPassword']", { delay: 50 })
    return loginButtonClicked
})

function waitAndClick(Selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function () {
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function () {
            resolve()
        }).catch(function (err) {
            reject()
        })
    })
}