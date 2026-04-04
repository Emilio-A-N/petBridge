class Adoptante {
    constructor (id_adoptante, dni, nombre, apellido, ciudad, interes_especie, telefono, email){
        this.id_adoptante = id_adoptante;
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.ciudad = ciudad;
        this.interes_especie = interes_especie;
        this.telefono = telefono;
        this.email = email;
    }
    prueba(){
        console.log(`Hola, soy ${this.nombre} y vivo en ${this.ciudad}`);
    }
}
module.exports = Adoptante;