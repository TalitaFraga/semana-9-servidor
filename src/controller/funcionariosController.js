const funcionarios = require ("../model/funcionarios.json")
const fs = require ("fs")

const getAll = (req, res) => {
    console.log(req.url)
    res.status(200).send(funcionarios)
}

const getAgeById = (req, res) => {
    const id = req.params.id

    const funcionario = funcionarios.find((funcionario) => funcionario.id == id) 

    res.status(200).send(funcionario.age)

}

const postFuncionarios = (req, res) => {
    console.log(req.body)
    const{ id, name, age } = req.body
    funcionarios.push({ id, name, age })

    fs.writeFile("./src/model/funcionarios.json", JSON.stringify(funcionarios), 'utf8', function(err) {
        if (err) {
            return res.status(424).send({ message: err })
        }
        console.log("Arquivo atualizado com sucesso!")
    })
    res.status(201).send(funcionarios)
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

const putFuncionarios = (req, res) => {
    try {
        const id = req.params.id

        const newFuncionario = req.body 

        const funcionariosAtualizados = funcionarios.map(funcionario => {
            if (funcionario.id == id) return newFuncionario
            return funcionario
        })
    
    
        fs.writeFile("./src/model/funcionarios.json", JSON.stringify(funcionariosAtualizados), 'utf8', function(err) {
            if(err) {
                return res.status(424).send({ message: err })
            }
            console.log("Arquivo atualizado com sucesso!")
        })
        res.status(200).send(funcionariosAtualizados)
    } catch(err) {
        return res.status(424).send({ message: err })
    }
}

const patchFuncionarios = (req, res) => {
    const id = req.params.id
    const atualizacao = req.body

    try {
        const funcionarioASerModificado = funcionarios.find((funcionario) => funcionario.id == id)

        Object.keys(atualizacao).forEach((chave) => {
            funcionarioASerModificado[chave] = atualizacao[chave]
        })

        fs.writeFile("./src/model/funcionarios.json", JSON.stringify(funcionarios), 'utf8', function(err) {
            if(err) {
                return res.status(424).send({ message: err })
            }
            console.log("Arquivo atualizado com sucesso!")
        })

        res.status(200).send(funcionarios)

    } catch(err) {
        return res.status(424).send({message: err })
    }
}

module.exports = { getAll, deleteFuncionarios, postFuncionarios, getAgeById, putFuncionarios, patchFuncionarios }
