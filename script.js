document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('inscricaoForm');
    const loginForm = document.getElementById('loginForm');
    const cadastroDiv = document.getElementById('cadastro');
    const loginDiv = document.getElementById('login');
    const users = JSON.parse(localStorage.getItem('users')) || []; 

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        clearErrors();

        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            showError('emailError', 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        const requiredFields = ['nome', 'usuario', 'senha'];
        requiredFields.forEach(field => {
            const value = document.getElementById(field).value;
            if (!value) {
                showError(`${field}Error`, `O campo ${capitalizeFirstLetter(field)} é obrigatório.`);
                isValid = false;
            }
        });

        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            usuario: document.getElementById('usuario').value,
            senha: document.getElementById('senha').value
        };

        const userExists = users.some(u => u.usuario === formData.usuario);
        if (userExists) {
            showError('usuarioError', 'Este ID de usuário já está em uso.');
            return;
        }

        const cpf = document.getElementById('cpf').value;
        if (!validateCPF(cpf)) {
            showError('cpfError', 'Por favor, insira um CPF válido.');
            isValid = false;
        }

        const data = document.getElementById('data').value;
        const idade = calculateAge(data);
        if (idade < 18) {
            showError('dataError', 'A idade mínima para inscrição é 18 anos.');
            isValid = false;
        }

        const telefone = document.getElementById('telefone').value;
        if (!validatePhone(telefone)) {
            showError('telefoneError', 'Telefone inválido. Exemplo: (99) 99999-9999.');
            isValid = false;
        }

        if (isValid) {
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Inscrição realizada com sucesso!');
            toggleForm();  
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const usuario = document.getElementById('loginUsuario').value;
        const senha = document.getElementById('loginSenha').value;

        const storedData = users.find(u => u.usuario === usuario && u.senha === senha);

        if (storedData) {
            alert('Login bem-sucedido!');
            window.location.href = 'pagina_principal.html';
        } else {
            alert('ID de usuário ou senha inválidos.');
        }
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateCPF(cpf) {
        
        return cpf.length === 12 && !isNaN(cpf);
    }

    function calculateAge(birthdate) {
        const birth = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }

    function validatePhone(phone) {
        const regex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        return regex.test(phone);
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => error.textContent = '');
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function toggleForm() {
        if (cadastroDiv.style.display === 'none') {
            cadastroDiv.style.display = 'block';
            loginDiv.style.display = 'none';
        } else {
            cadastroDiv.style.display = 'none';
            loginDiv.style.display = 'block';
        }
    }
});


