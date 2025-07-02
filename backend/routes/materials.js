const router = require("express").Router();
const {
  createMaterial,
  getMaterials,
  updateMaterial,
  deleteMaterial
} = require("../controllers/materialController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", getMaterials);
router.post("/", verifyToken, createMaterial);
router.put("/:id", verifyToken, updateMaterial);
router.delete("/:id", verifyToken, deleteMaterial);

module.exports = router;
