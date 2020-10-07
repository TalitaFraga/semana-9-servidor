const express= require("express")
const router = express.Router()
const controller = require("../controller/livrosController")

router.get("/", controller.getAll)
router.get("/:genre", controller.getByGenres)
router.delete("/:id", controller.deleteLivros)


module.exports = router