const mensaje = {
  accion: "activarServicio",
  origen: "cliente",
  parametros: {
    placa: placa
  }
}
socketCliente(mensaje);
