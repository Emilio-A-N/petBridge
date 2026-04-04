class Protectora {
    constructor (id_protectora, cif, nombreProtectora, localizacion){
        this.id_protectora = id_protectora;
        this.cif = cif;
        this.nombreProtectora = nombreProtectora;
        this.localizacion = localizacion
    }
    mePresento(){
        console.log(`Hola, soy ${this.nombreProtectora} y estoy en ${this.localizacion}`);
        
    };
};

module.exports = Protectora;