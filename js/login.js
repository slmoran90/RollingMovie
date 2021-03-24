// import { Users } from './classUsers';

/*
	#############################################
	# FUNCIONES PARA VALIDAR DATOS Y FORMULARIOS#
	#############################################
*/

const validName = (name)=>{
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

const validEmail = (email)=> {
	const expEmail = /\w+@\w+\.[a-z]{2,}$/;
	let emailError = [document.getElementById('div-loginEmail-error'), document.getElementById('div-emailRecover-error'), document.getElementById('div-userEmail-error')];
	
	if(expEmail.test(email.value) && email.value.trim()!= ""){
		email.className = 'form-control is-valid';
		for(let i in emailError){
			if(emailError[i].previousElementSibling.id === email.id) emailError[i].className = 'd-none';
		}
		return true;
	}
	else{
		email.className = 'form-control is-invalid';
		for(let i in emailError){
			if(emailError[i].previousElementSibling.id === email.id){
				emailError[i].className = 'invalid-feedback mt-2';
				emailError[i].innerHTML = `<span> Completa el campo con un email valido.</span>`;
			}
		}
		return false;
	}
}

const validPassword = (password)=>{
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

const formLogin = (e)=>{
	e.preventDefault();
	const form = document.getElementById('formLogin'),
		email = document.getElementById('loginEmail'),
		password = document.getElementById('loginPassword');

	if(validEmail(email) && validPassword(password)){
		console.log('ok');
	}
	else{
		console.log('fail');
	}

	clearForm(form, email, password);
}

const formSignUp = e => {
	e.preventDefault();

	const form = document.getElementById('formSignUp'),
		userName = document.getElementById('userName'),
		userEmail = document.getElementById('userEmail'),
		userPass = document.getElementById('userPassword'),
		userPass2 = document.getElementById('userPassword2');

	if(validName(userName) && validEmail(userEmail) &&
	validPassword(userPass) && validPassword(userPass2)){
		console.log('OK');
	}
	else{
		console.log('FAIL');
	}

	clearForm(form, userName, userEmail, userPass, userPass2);
}

const formPassRecover = e =>{
	e.preventDefault();
	const form = document.getElementById('formPassRecover'),
		email = document.getElementById('emailRecover');

		if(validEmail(email)) console.log('OKA');
		else console.log('FAIL');

		clearForm(form, email);
}

function clearForm(form, ...input){
	form.reset();
	for(i in input) input[i].className = 'form-control';
}