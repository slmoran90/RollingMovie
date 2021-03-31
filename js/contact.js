const validName = (name)=> {
	const errorName = document.getElementById('div-contactName-error');

	if(name.value.trim() != "" && name.value.length >= 3){
		name.className = 'form-control is-valid';
		errorName.className = 'd-none';
		return true;
	}
	else{
		name.className = 'form-control is-invalid';
		errorName.className = 'invalid-feedback mt-2';
		errorName.innerHTML = `<span> Completa el campo con un mínimio de 4 caracteres. </span>`;
		return false;
	}
}

const validEmail = (email) => {
	const expEmail = /\w+@\w+\.[a-z]{2,}$/;
	/* Los div ocultos que van a mostrar el mensaje de error en caso de no cumplir la validacion se guardan en arreglos. */
	let emailError = document.getElementById('div-contactEmail-error');
	
	if(expEmail.test(email.value) && email.value.trim()!= ""){
		email.className = 'form-control is-valid';
        emailError.className = 'd-none';
		return true;
	}
	else{
		email.className = 'form-control is-invalid';
        emailError.className = 'invalid-feedback mt-2';
        emailError.innerHTML = `<span> Completa el campo con un email valido.</span>`;
		return false;
	}
}

function sendEmail(email, msg){
	const list = JSON.parse(localStorage.getItem('Users'));
	const user = list.find(e => e._email === email);

	const data = {
		to_name: 'Rolling Movie',
		from_name: user._name,
		msg: msg.value,
		to_email: 'rollingmovie.21@gmail.com'
	};

	emailjs.send("rollingmovie","rmTemplate", data)
	.then(response => {
		Swal.fire({
			icon: 'success',
			// title: '',
			text: '¡Tu mensaje se envio con exito!'
		})
	}, error =>{
		Swal.fire({
			icon: 'error',
			title: 'Error',
			text: 'Tu mensaje no se envio, intenta nuevamente en unos minutos.'
		})
	})
}

const formContact = (e) =>{
	e.preventDefault();
	const form = document.getElementById('formContact'),
		email = document.getElementById('contactEmail'),
		name = document.getElementById('contactName'),
        msg = document.getElementById('contactText'),
		divError = document.getElementById('contactError');

	divError.className = 'd-none';

	if(validEmail(email) && validName(name)){
		// OBTENGO LOS DATOS DEL LOCALSTORAGE
		let list = JSON.parse(localStorage.getItem('Users'));

		if(list === null) list = usersList;

		for(let i in list){
			console.log(list[i]._email);
			/*Si los datos ingresados por el input coinciden con los del localStorage
			entonces permite el acceso al sitio y es redirigido*/
			if(list[i]._email === email.value){
				divError.className = 'd-none';
				sendEmail(email, msg);
			}
			else if((list[i]._email !== email.value) || (list[i]._password !== password.value)){
				divError.className = 'alert alert-danger text-center';
				divError.innerHTML = `<span>Tu email y/o contraseña es incorrecta. Compruébalo.</span>`;
			}
		}
	}
	else{
		divError.className = 'alert alert-danger text-center';
		divError.innerHTML = `<span>Completa los campos con tus datos.</span>`;
	}
	clearForm(form, email, name, msg);
}

function clearForm(form, ...input){
	form.reset();
	for(let i in input) input[i].className = 'form-control';
}
