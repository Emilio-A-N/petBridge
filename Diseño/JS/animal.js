class Animal {
    constructor (id_animal,nombre, edad, especie, raza, estadoSalud, id_protectora){
        this.id_animal = id_animal;
        this.nombre = nombre;
        this.edad = edad;
        this.especie = especie;
        this.raza = raza;
        this.estadoSalud = estadoSalud;
        this.id_protectora = id_protectora;
    }
    Resumen(){
        console.log(`${this.nombre} tiene ${this.edad} y es un ${this.especie}`);
    }
    
}
module.exports = Animal;
