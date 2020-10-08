const funcionarios = require ("../model/funcionarios.json")
const fs = require ("fs")

const getAll = (req, res) => {
    console.log(req.url)
    res.status(200).send(funcionarios)
}

const deleteFuncionarios = (req, res) => {
    const id = req.params.id
    const funcionarioFitrado = funcionarios.filter((funcionario) => funcionario.id != id)

    fs.writeFile("./src/model/funcionarios.json", JSON.stringify(funcionarioFitrado), 'utf8', function(err) {
        if(err) {
        return res.status(424).send({ message: err })
        }
        console.log("Arquivo atualizado com sucesso!")
    })
    
    res.status(200).send()
}

module.exports = { getAll, deleteFuncionarios }
