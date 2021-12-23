const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const inlineCSS = require('inline-css');
const entities = require('html-entities');

app.use('/', express.static('public'));

app.use(express.json());

app.post('/inline', (req,res) => {
  let html = req.body.data;
  let options = {
		url: html,
		preserveMediaQueries: true,
		removeStyleTags: true,
	};
  
  quoteChange(html)
		.then(inlineCSS(html, options))
		.then((html) => {
			return (html = replaceText(html));
		})
		.then((html) => {
			let emails = {
				greenville: html,
				anderson: linkChange(html, 'anderson'),
				spartanburg: linkChange(html, 'spartanburg'),
			};
			return emails;
		})
		.then((emails) => {
			res.status(200).json(emails);
		})
		.catch((err) => {
			console.log(err);
		});
});

function replaceText(html) {
  return html = html
		.split('*|MC:SUBJECT|*')
		.join('')
		.split('*|MC_PREVIEW_TEXT|*')
		.join('');
}

function linkChange(html, link) {
  let email = html.split('greenville').join(link);
  return email;
}

function quoteChange(code) {
  return new Promise((resolve, reject) => {
    resolve(code.split('&quot;').join("'"));
    reject('oops something went wrong!');
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
