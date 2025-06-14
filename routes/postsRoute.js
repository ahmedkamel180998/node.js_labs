const { Router } = require("express");
const postsController = require("../controllers/postsController");
const router = Router();

router.post("/", postsController.createPost);
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.patch("/:id", postsController.updatePostById);
router.delete("/:id", postsController.deletePostById);

module.exports = router;