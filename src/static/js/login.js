$('#login_form').on('submit', (e) => {
    e.preventDefault();

    let usuario = $('#usuario').val();
    let password = $('#password').val();

    if (usuario === '' || password === '') {
        $('#messages').html(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Error, todos los campos son obligatorios.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `);
    } else {
        $.ajax({
            url: 'https://api-todo.mteam.com.ar/api/v1/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                usuario: usuario,
                password: password
            }),
            success: (response) => {
                console.log('🔐 Login exitoso');

                // Guarda el token en localStorage
                const token = response.data["JWT Token"];
                const user = response.data.usuario;

                localStorage.setItem('jwt_token', token);
                localStorage.setItem('usuario', JSON.stringify(user));

                // Podés redirigir o actualizar la interfaz
                $('#messages').html(`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Bienvenido ${user.nombre} ${user.apellido}! Espera mientras te redirigimos...
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
                setInterval(
                    function () {
                        window.location.href = "dashboard.html";
                    },
                    3000
                );
            },
            error: (error) => {
                console.error('❌ Error en login:', error);
                $('#messages').html(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Error en el login. Verifique sus datos.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);
            }
        });
    }
});
