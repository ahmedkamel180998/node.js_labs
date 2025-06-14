const Post = require("../models/postModel");
const { isValidObjectId } = require("mongoose");

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ status: "Failure", message: "Title is required" });
    }
    const post = await Post.create({ title, description });
    res.status(201).json({ status: "Success", data: post });
  } catch (err) {
    res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({ status: "Success", data: posts });
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res
      .status(400)
      .json({ status: "Failure", message: "Invalid post id" });
  }
  const post = await Post.findById(id);
  if (!post) {
    return res
      .status(404)
      .json({ status: "Failure", message: "Post not found" });
  }
  res.status(200).json({ status: "Success", data: post });
};

exports.updatePostById = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!isValidObjectId(id)) {
    return res
      .status(400)
      .json({ status: "Failure", message: "Invalid post id" });
  }
  const post = await Post.findByIdAndUpdate(
    id,
    { title, description },
    { new: true }
  );
  if (!post) {
    return res
      .status(404)
      .json({ status: "Failure", message: "Post not found" });
  }
  res.status(200).json({ status: "Success", data: post });
};

exports.deletePostById = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res
      .status(400)
      .json({ status: "Failure", message: "Invalid post id" });
  }
  const post = await Post.findByIdAndDelete(id);
  if (!post) {
    return res
      .status(404)
      .json({ status: "Failure", message: "Post not found" });
  }
  res.status(204).send();
};
