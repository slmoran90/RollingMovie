import { Users } from './class.js';
/*
	######################
	# VARIABLES GLOBALES #
	######################
*/

let usersList = [];
const modalLogin = new bootstrap.Modal(document.getElementById('modalSignUp'));
const modalRecover = new bootstrap.Modal(document.getElementById('modalPasswordRecover'));

const user_admin = new Users(
	'Admin',
	'rollingmovie.21@gmail.com',
	'rcmovie.21',
	true
);

usersList.push(user_admin);

function addUsers(name, email, password){
	let newUser = new Users(
		name,
		email,
		password
	);

	usersList.push(newUser);

	localStorage.setItem("Users", JSON.stringify(usersList));
}
/*
	#############################################
	# FUNCIONES PARA VALIDAR DATOS Y FORMULARIOS#
	#############################################
*/

window.validName = function (name){
	const errorName = document.getElementById('div-userName-error');

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

window.validEmail = function (email) {
	const expEmail = /\w+@\w+\.[a-z]{2,}$/;
	/* Los div ocultos que van a mostrar el mensaje de error en caso de no cumplir la validacion se guardan en arreglos. */
	let emailError = [document.getElementById('div-loginEmail-error'), document.getElementById('div-emailRecover-error'), document.getElementById('div-userEmail-error')];
	
	if(expEmail.test(email.value) && email.value.trim()!= ""){
		email.className = 'form-control is-valid';
		/* El metodo previousElementSibling devuelve el nodo hermano anterior a errorPass.*/
		for(let i in emailError){
			if(emailError[i].previousElementSibling.id === email.id) emailError[i].className = 'd-none';
		}
		return true;
	}
	else{
		email.className = 'form-control is-invalid';
		for(let i in emailError){
			/* Si la validacion no se cumple y el nodo previo es iaugl al ID evaluado, este despliega el div con el mensaje de error */
			if(emailError[i].previousElementSibling.id === email.id){
				emailError[i].className = 'invalid-feedback mt-2';
				emailError[i].innerHTML = `<span> Completa el campo con un email valido.</span>`;
			}
		}
		return false;
	}
}

window.validPassword = function (password){
	const expPassword = /^(?=.*\d).{6,}$/;
	const errorPass = [document.getElementById('div-loginPassword-error'),
						document.getElementById('div-userPassword-error'),
						document.getElementById('div-userPassword2-error')];

	if(expPassword.test(password.value) && password.value.trim()!=""){
		password.className = 'form-control is-valid';
		for(let i in errorPass){
			if(errorPass[i].previousElementSibling.id === password.id) errorPass[i].className = 'd-none';
		}
		return true;
	}
	else{
		password.className = 'form-control is-invalid';
		for(let i in errorPass){
			if(errorPass[i].previousElementSibling.id === password.id){
				errorPass[i].className = 'invalid-feedback mt-2';
				errorPass[i].innerHTML = `<span> Ingresa una contraseña de 6 caracteres mínimo.</span>`
			}
		}
		return false;
	}
}  

window.formLogin = function (e) {
	e.preventDefault();
	const form = document.getElementById('formLogin'),
		email = document.getElementById('loginEmail'),
		password = document.getElementById('loginPassword'),
		divError = document.getElementById('loginError');

	divError.className = 'd-none';

	if(validEmail(email) && validPassword(password)){
		// OBTENGO LOS DATOS DEL LOCALSTORAGE
		let list = JSON.parse(localStorage.getItem('Users'));

		if(list === null) list = usersList;

		for(let i in list){
			console.log(list[i]._email);
			/*Si los datos ingresados por el input coinciden con los del localStorage
			entonces permite el acceso al sitio y es redirigido*/
			if((list[i]._email === email.value) && (list[i]._password === password.value)){
				divError.className = 'd-none';
				window.location = '../pages/admin.html';
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
	clearForm(form, email, password);
}

window.formSignUp = function (e) {
	e.preventDefault();

	const form = document.getElementById('formSignUp'),
		userName = document.getElementById('userName'),
		userEmail = document.getElementById('userEmail'),
		userPass = document.getElementById('userPassword'),
		userPass2 = document.getElementById('userPassword2'),
		divError = document.getElementById('registerError');

	if(validName(userName) && validEmail(userEmail) &&
	validPassword(userPass) && validPassword(userPass2)){
		if(userPass.value === userPass2.value){
			/* Cuando los datos ingresados esten validados 
			el usuario se guarda en localstorage */
			addUsers(userName.value, userEmail.value, userPass.value);
			Swal.fire({
				icon: 'success',
				title: '¡Bienvenido!',
				text: '¡Tu cuenta se registro con exito!'
			});
			setTimeout(()=> modalLogin.hide(), '1000');
		}
	}
	else{
		divError.className = 'alert alert-danger text-center mt-2';
		divError.innerHTML = `<span>Completa los campos con tus datos.</span>`;
	}

	clearForm(form, userName, userEmail, userPass, userPass2);
}

window.formPassRecover = function (e) {
	e.preventDefault();
	const form = document.getElementById('formPassRecover'),
		email = document.getElementById('emailRecover')
		emailError = document.getElementById('emailError');

	emailError.className = 'd-none';
		
	if(validEmail(email)){
		let list = JSON.parse(localStorage.getItem('Users'));
		if(list === null) list = usersList;

		const user = list.filter( e => e._email === email.value)
		if(user.length === 0){
			emailError.className = 'mt-2 alert alert-danger text-center';
			emailError.innerHTML = `<span>El mail ingresado no existe.</span>`;
		}
		else if(user[0]._email === email.value){
			sendEmail(email.value);
			setTimeout(()=> modalRecover.hide(), '1000');
		}
	}
	else{
		emailError.className = 'mt-2 alert alert-danger text-center';
		emailError.innerHTML = `<span>Completa el campo con una direccion de email.</span>`
	}
	clearForm(form, email);
}

// LIMPIA LOS INPUTS Y REINICIA SUS CLASES
function clearForm(form, ...input){
	form.reset();
	for(let i in input) input[i].className = 'form-control';
}

function sendEmail(email){
	const list = JSON.parse(localStorage.getItem('Users'));
	const user = list.find(e => e._email === email);

	const data = {
		to_name: user._name,
		from_name: 'Rolling Movie',
		password: user._password,
		to_email: user._email
	};

	emailjs.send("rollingmovie","rmTemplate", data)
	.then(response => {
		Swal.fire({
			icon: 'success',
			// title: '',
			text: '¡Tu contraseña fue enviada a tu correo, revisalo!'
		})
	}, error =>{
		Swal.fire({
			icon: 'error',
			title: 'Error',
			text: 'El email no se mando, intenta nuevamente en unos minutos.'
		})
	})
}