import { connect } from "mongoose";
import configObject from "../config/config.js";

export class BaseDatos {
    static #instancia; 
    constructor(){
        connect(configObject.mongo_url);
    }

    static getInstancia() {
        if(this.#instancia) {
            console.log("Conexion previa");
            return this.#instancia;
        }

        this.#instancia = new BaseDatos(); 
        console.log("Conexion exitosa");
        return this.#instancia;
    }
}

BaseDatos.getInstancia();