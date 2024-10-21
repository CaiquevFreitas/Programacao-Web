const sqlite3 = require("sqlite3").verbose(); //verbose impede que o sql autocomplete os codigos

const connectDB = ()=>{
    const db = new sqlite3.Database('./banco.db', (err)=>{
        if(err){
            console.error('Erro ao conenectar com o banco de dados: ', err.message)
        } 
        else{
            console.log("Conectado com sucesso ao banco de dados");
        }
    })

    db.run(`Create table if not exists produtos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL
    )`,(err)=>{
        if(err){
          console.error("Erro ao criar a tabela produtos: ", err)  
        }
    })
    return db;
}

module.exports = connectDB;