const express= require("express")
const router = express.Router()
const controller = require("../controller/livrosController")

router.get("/", controller.getAll)
router.get("/:genre", controller.getByGenres)
router.post("/", controller.postLivros)
router.delete("/:id", controller.deleteLivros)
router.put("/:id", controller.putLivros)
router.patch("/:id", controller.patchLivros)


module.exports = router