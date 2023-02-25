(function SetupPlaywright() {
	const { chromium, expect } = require('@playwright/test');

	global.expect = expect;
	
	before(async () => {
		global.browser = await chromium.launch();
		global.page = await browser.newPage();
		
		global.DCVisit = async function (inputData) {
			await global.page.close();
			global.page = await browser.newPage();
			await page.goto(inputData);
		};
	});

	after(() => global.browser.close());
})();
