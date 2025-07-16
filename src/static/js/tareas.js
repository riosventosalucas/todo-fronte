function listarTareas() {
    $.ajax({
        url: "https://api-todo.mteam.com.ar/api/v1/tareas",
        method: "GET",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt_token")
        },
        success: function (response) {
            if (response.status && Array.isArray(response.data)) {
                let filas = "";
                response.data.forEach(tarea => {
                    filas += `
                        <tr>
                            <td>${tarea.id}</td>
                            <td>${tarea.nombre}</td>
                            <td>${tarea.descripcion}</td>
                            <td>${formatearFecha(tarea.fecha_creacion)}</td>
                            <td>${formatearFecha(tarea.fecha_limite)}</td>
                            <td><button class="btn btn-sm btn-warning">✏️</button></td>
                            <td><button class="btn btn-sm btn-danger">🗑️</button></td>
                        </tr>
                    `;
                });
                $('#lista_tareas').html(filas);
            } else {
                $('#lista_tareas').html(`<tr><td colspan="7">No hay tareas disponibles</td></tr>`);
            }
        },
        error: function (error) {
            console.error("Error al obtener tareas:", error);
            $('#lista_tareas').html(`<tr><td colspan="7">Error al cargar tareas</td></tr>`);
        }
    });
}

function formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString("es-AR");  // podés cambiar el formato si querés
}
