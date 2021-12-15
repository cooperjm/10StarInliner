const tabs = document.querySelectorAll('.tab');
const greenvilleContainer = document.getElementById('greenvilleContainer');
const andersonContainer = document.getElementById('andersonContainer');
const spartanburgContainer = document.getElementById('spartanburgContainer');
const textContainer = document.getElementById('textArea');
const viewAreas = [
	greenvilleContainer,
	andersonContainer,
	spartanburgContainer,
	textContainer,
];
const textArea = document.querySelector('textarea');
const generate = document.getElementById('generate');
const cmtest = document.getElementById('code');
const greenvilleBtn = new ClipboardJS('#greenvilleBtn');
const andersonBtn = new ClipboardJS('#andersonBtn');
const spartanburgBtn = new ClipboardJS('#spartanburgBtn');

const myCodeMirror = CodeMirror.fromTextArea(cmtest, {
	// value: 'Paste Code Here',
	mode: 'text/html',
	lineNumbers: true,
	theme: 'rubyblue',
});

generate.addEventListener('click', () => {
	inners();
	removeSelected();
	tabs[1].classList.add('selected');
	textContainer.classList.remove('vis');
	greenvilleContainer.classList.add('vis');
	// console.log(tabs);
	tabs.forEach((tab) => {
		tab.classList.remove('nopacity');
	});
});

async function inners() {
	let contents = myCodeMirror.getValue();
	try {
		let data = await axios.post('/inline', { data: contents });
		let emails = data.data;

		greenvilleContainer.innerHTML = emails.greenville;
		document.getElementById('greenvilleBtn').dataset.clipboardText =
			emails.greenville;

		andersonContainer.innerHTML = emails.anderson; document.getElementById('andersonBtn').dataset.clipboardText =
			emails.anderson;

		spartanburgContainer.innerHTML = emails.spartanburg;
		document.getElementById('spartanburgBtn').dataset.clipboardText =
			emails.spartanburg;

		document.getElementById('copyButtons').classList.add('showCopyButtons');
	} catch (error) {
		console.log(error);
	}
}

// Add event listener to tabs to add selected class
tabs.forEach((tab) => {
	tab.addEventListener('click', (event) => {
		removeSelected();
		removeVis();
		event.target.classList.add('selected');
		switchy(event.target);
	});
});
// Remove Selected from all tabs
const removeSelected = () => {
	tabs.forEach((tab) => {
		tab.classList.remove('selected');
	});
};

const removeVis = () => {
	viewAreas.forEach((area) => {
		area.classList.remove('vis');
	});
};

const switchy = (clickTarget) => {
	switch (clickTarget.id) {
		case 'textTab':
			textContainer.classList.add('vis');
			break;

		case 'greenvilleTab':
			greenvilleContainer.classList.add('vis');
			break;

		case 'andersonTab':
			andersonContainer.classList.add('vis');
			break;

		case 'spartanburgTab':
			spartanburgContainer.classList.add('vis');
			break;

		default:
			break;
	}
};

// Clipboard
greenvilleBtn.on('success', (e) => {
	
});
greenvilleBtn.on('error', (e) => {
	console.log(e);
});


andersonBtn.on('success', (e) => {
	// console.log(e);
});
andersonBtn.on('error', (e) => {
	console.log(e);
});


spartanburgBtn.on('success', (e) => {
	// console.log(e);
});
spartanburgBtn.on('error', (e) => {
	console.log(e);
});



