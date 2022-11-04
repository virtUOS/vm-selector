fields = []

function load_config() {
	fetch('config.json')
  .then((response) => response.json())
  .then((data) => build_ui(data));
}

function build_ui(config) {
	const selector = document.getElementById('selector');
	for (const key in config) {
		const field = config[key];
		fields.push(key);
		const label = document.createElement('label');
		label.setAttribute('for', key);
		label.innerText = field.hint;
		selector.appendChild(label);
		if (field.type === 'text') {
			const input = document.createElement('input');
			input.setAttribute('type', field.type);
			input.setAttribute('id', key);
			input.setAttribute('name', key);
			selector.appendChild(input);
		} else if (field.type === 'select') {
			const input = document.createElement('select');
			input.setAttribute('id', key);
			input.setAttribute('name', key);
			for (const value of field.options) {
				const option = document.createElement('option');
				option.setAttribute('value', value);
				option.innerText = value;
				input.appendChild(option);
			}
			selector.appendChild(input);
		}
	}
}

function add_vm() {
	let args = '';
	for (field of fields) {
		const value = document.getElementById(field).value;
		if (!value) {
			alert(`${field} must not be empty`);
			return;
		}
		args += `${value} `;
	}
	const order = document.getElementById('order');
	order.innerText = `${order.innerText}\n${args}`.trim();
}

function copy() {
	const order = document.getElementById('order');
	navigator.clipboard.writeText(order.innerText);
}
