const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const inlineCSS = require('inline-css');

app.use('/', express.static('public'));

app.use(express.json());

app.post('/inline', (req,res) => {
  let html = req.body.data;
  let options = {
		url: html,
		preserveMediaQueries: true,
		removeStyleTags: true,
	};

  doTheStuff(html, options, res);  
  
});

async function doTheStuff(html, options, res) {
  let code;
  let emails;
  try {
    code = await quoteChange(html);
		code = await inlineCSS(code, options);
		code = await replaceText(code);
    emails = splitEmails(code);
  } catch (error) {
    res.status(500).json(error);
  }    
  res.status(200).json(emails);
}

function splitEmails(html) {
  let e = {
		greenville: html,
		anderson: linkChange(html, 'anderson'),
		spartanburg: linkChange(html, 'spartanburg'),
	};
	return e;
}

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
