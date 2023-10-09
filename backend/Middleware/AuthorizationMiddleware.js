const userModel = require("../Models/userModel");
const noteModel = require("../Models/noteModel");
const { isValidObjectId } = require("mongoose");

const userAuthorizationCheck = async (req, res, next) => {
  try {
   
    const id = req.userId;
    const noteId = req.params.id;
    console.log(noteId);
    if (noteId) {
      if (!isValidObjectId(noteId))
        return res
          .status(400)
          .send({ status: false, message: "Provide valid note id" });
      const note = await noteModel.findById(noteId);
      if (!note)
        return res
          .status(404)
          .send({ status: false, message: "Provide not Found" });
      const userId = note.userId;
      if (id !== userId)
        return res
          .status(403)
          .send({ status: false, message: "You are not authorized" });
    }
    if (req.body.userId) {
      if (id && !isValidObjectId(id))
        return res
          .status(400)
          .send({ status: false, message: "Provide valid user id" });
      if (id != userId) {
        return res
          .status(403)
          .send({ status: false, message: "You are not authorized" });
      }
    }
    next();
  } catch (error) {}
};

const UserCheckerForNotes = async (req, res, next) => {
  try {
    //const id = req.body.userId;
    const id = req.userId;

    if (Object.keys(req.body).length == 0)
      return res.status(400).send({ status: false, message: "Provide data" });
    if (id && !isValidObjectId(id))
      return res
        .status(400)
        .send({ status: false, message: "Provide valid user id" });
    const user = await userModel.findById(id);
    if (!user)
      return res.status(404).send({
        status: false,
        message: "Provide ID not Found in user database",
      });
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const userExists = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) return false;
  return true;
};

const isValidValue = (value) => {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const noteExist = async (noteId) => {
  const note = await noteModel.findById(noteId);
  if (!note) return false;
  return true;
};

module.exports = {
  userAuthorizationCheck,
  UserCheckerForNotes,
  noteExist,
  userExists,
  isValidValue,
};
