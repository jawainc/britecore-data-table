// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage


module.exports = {
  'data table e2e tests': browser => {
    browser
        .url(process.env.VUE_DEV_SERVER_URL)
        .waitForElementVisible('#app', 500)
        .assert.elementPresent('div.data-table')
        .assert.elementPresent('.loading-icon')
        .pause(3000)
        .assert.elementNotPresent('.loading-icon')
        .click('div.data-table tbody tr:first-child .table__column__description')
        .waitForElementVisible('div.data-table tbody tr:first-child .table__column__button', 1000)
        .click('div.data-table tbody tr:first-child .table__column__button')
        .waitForElementVisible('.description-editor', 1000)
        .isVisible('.description-editor', function(result) {
          this.assert.equal(result.value, true);
        })
        .pause(1000)
        .click('.close-icon')
        .waitForElementNotPresent('.description-editor', 1000)
        .pause(500)
      .end()
  }
}
