import fs from 'fs';

export default class Archivo {

    constructor(name){
        this.name = name;
    } 

    async guardar(mensaje) {
        try {
            let data = await fs.promises.readFile(this.name,'utf-8');
            let contenido = JSON.parse(data);
            let obj = {
                user:mensaje.user,
                message:mensaje.message,
                fecha:mensaje.fecha,
                hora:mensaje.hora
            }
            contenido.push(obj);
            await fs.promises.writeFile(this.name,JSON.stringify(contenido,null,'\t'));
        }
        catch (err) {
            console.log("no se pudo guardar " + err);
        }
    }

}