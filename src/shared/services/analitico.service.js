const { DB } = require("../../config/db");

let socketCount = [];

class AnaliticoService {
    constructor() { }

    static async increment(tag) {
        const dataRef = new Date().toISOString().slice(0, 10);
        await DB.query(`INSERT INTO analiticos(tag, data_ref, valor) VALUES (:tag, :dataRef, 1) ON DUPLICATE KEY UPDATE valor = COALESCE(valor, 0) + 1;`, {
            replacements: {
                dataRef,
                tag,
            }
        });
    }

    static async connect(uuid) {
        if(!socketCount.includes(uuid)) {
            socketCount.push(uuid);
        }        
    }

    static async disconnect(uuid) {
        socketCount = socketCount.filter((a) => a !== uuid);
    }

    static countConnected() {
        return socketCount.length
    }
}


module.exports = {
    AnaliticoService
}