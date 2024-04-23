# GO KARTS
![Diagrama de estado del poyecto](https://github.com/gusCreator/go-karts/blob/main/state-diagram.png)
- Por el momento deberiamos utilizar QR estáticos
- El QR debe redirigir a un CGI (personalizado de acuerdo al cliente) o a un HTML(al comienzo un mensaje general para todos) que realice la solicitud de acuerdo a la URL que ha sido escaneada
- El servidor debe estar atento siempre a las solicitudes de ls clientes
- El servidor debe enviar la información que recibe a la página de administrador, el servidor NO puede actuar por si solo en algunos casos, el administrador debe aceptar solicitudes
