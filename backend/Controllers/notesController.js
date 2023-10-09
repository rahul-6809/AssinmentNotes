//const { isValidObjectId } = require("mongoose");
const noteModel = require("../Models/noteModel");
const {
  isValidValue,
  noteExist,
  userExists,
} = require("../Middleware/AuthorizationMiddleware");

const createnote = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (req.body.isDeleted == true)
      return res.status(400).send({
        status: false,
        message: "Please provide valid title and description",
      });
    const noteData = {
      title: title,
      description: description,
      userId: req.userId,
    };
    const note = await noteModel.create(noteData);
    res.status(201).send({ status: true, data: note });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getnote = async (req, res) => {
  try {
    const data = req.params.notesId;

    const filternote = await noteModel.findById(data);
    console.log(filternote);
    if (filternote) {
      return res
        .status(200)
        .send({ status: true, message: "note List", data: filternote });
    } else {
      return res.status(404).send({ status: false, message: "No note Found" });
    }
    console.log(filternote);
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const getnotebyId = async (req, res) => {
  try {
   
    const userId = req.params.userId;
    const notes = await noteModel
      .find({ userId, isDeleted: false })
      .sort({ createdAt: -1 });

    if (notes.length > 0) {
      res
        .status(200)
        .json({
          status: true,
          message: "Notes fetched successfully",
          data: notes,
        });
    } else {
      res
        .status(404)
        .json({ status: false, message: "No notes found for this user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        status: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

const updatenote = async (req, res) => {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0)
      return res.status(400).send({
        status: false,
        message: " Please specify at least one update query",
      });

    const { titl, descc, isDeleted } = data;

    if (isDeleted == true)
      return res
        .status(400)
        .send({ status: false, message: "note cannot be deleted" });

    const update = await noteModel.findByIdAndUpdate(
      req.params.noteId,
      {
        $set: {
          title: titl,
          description: descc,
        },
      },
      { new: true }
    );
    if (!update)
      return res
        .status(404)
        .send({ status: false, message: "note not found", data: update });
    if (update.isDeleted == true)
      return res
        .status(404)
        .send({ status: false, message: "note cannot be deleted" });
    res.status(200).send({
      status: true,
      message: "note updated successfully",
      data: update,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const deletenoteById = async (req, res) => {
  try {
    let noteId = req.params.noteId;
    const dateAndTime = new Date();
    let note = await noteModel.findOneAndUpdate(
      { _id: noteId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: dateAndTime } },
      { new: true }
    );
    if (note == null) {
      return res.status(404).send({ status: false, message: "note not found" });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "deleted successfully" });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createnote,
  getnote,
  updatenote,
  deletenoteById,
  getnotebyId,
};
