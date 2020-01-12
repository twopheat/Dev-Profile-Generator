const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

async function createPDF(data){

	var templateHtml = fs.readFileSync(path.join(process.cwd(), 'template.html'), 'utf8');
	var template = handlebars.compile(templateHtml);
	var html = template(data);

	var timestamp = new Date();
	timestamp = timestamp.getTime();

	var pdfPath = path.join('pdf', `${data.name}-${timestamp}.pdf`);

	var options = {
		width: '1230px',
		headerTemplate: "<p></p>",
		footerTemplate: "<p></p>",
		displayHeaderFooter: false,
		margin: {
			top: "20px",
			bottom: "30px"
		},
		printBackground: true,
		path: pdfPath
	}

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true
	});

	var page = await browser.newPage();
	
	await page.goto(`data:text/html;charset=UTF-8,${html}`, {
		waitUntil: 'networkidle0'
	});

	await page.pdf(options);
	await browser.close();
}

const data = {
	title: "Coding Boot Camp",
	date: "1/10/2020",
	name: "Brad Johnston",
	age: 40,
	repositories: 13,
	stars: 4,
	following: 10,
	followers: 8,
	skills: "HTML CSS Mongo Express React Node Javascript",
	story: "Currently attending the UC Riverside Extension - Full Stack Coding Boot Camp."
}

createPDF(data);