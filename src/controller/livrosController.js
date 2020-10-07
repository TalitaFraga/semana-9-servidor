const livros = require("../model/livros.json")
const fs = require("fs")

const getAll = (req, res) => {
    console.log(req.url)
    res.status(200).send(livros)
}

const getByGenres = (req, res) => {
    const genre = req.params.genre
    
    res.status(200).send(livros.filter(livro => livro.genre == genre ))
}

const deleteLivros = (req, res) => {
    const id = req.params.id
    const livrosFitrados = livros.filter((livro) => livro.id != id)

    fs.writeFile("./src/model/livros.json", JSON.stringify(livrosFitrados), 'utf8', function(err) {
        if(err) {
          return res.status(424).send({ message: err })
        }
        console.log("Arquivo atualizado com sucesso!")
      })
    
      res.status(200).send()
}

module.exports = { getAll, getByGenres, deleteLivros }