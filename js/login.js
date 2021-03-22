const validEmail = (_email) =>{
	const expEmail = /\w+@\w+\.[a-z]{2,}$/;

	if(expEmail.test(_email.value)){
		_email.className = 'form-control is-valid';
		return true;
	}
	else{
		inputEmail.className = 'form-control is-invalid';
		return false;
	}
}

const validPassword = (_password) =>{
	const expPassword = /^(?=.*\d).{8,}$/;

	if(expPassword.test(_password.value)){
		_password.className = 'form-control is-valid';
		return true;
	}
	else{
		_password.className = 'form-control is-invalid';
		return false;
	}
}  

const validForm = (e)=> {
	e.preventDefault();
	const form = document.getElementById('formLogin'),
		email = document.getElementById('inputEmail'),
		password = document.getElementById('inputPassword');

	if(validEmail(email) && validPassword(password))
	{
		console.log('ok');
		form.reset();
	}
	else{
		console.log('fail');
		form.reset();
	}
		
}
