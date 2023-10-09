const express = require("express");
const router = express.Router();
const {
  createnote,
  getnote,
  updatenote,
  deletenoteById,
  getnotebyId,
} = require("../Controllers/notesController");
const authAuthentication = require("../Middleware/authMiddleware");
const {
  userAuthorizationCheck,
  UserCheckerForNotes,
} = require("../Middleware/AuthorizationMiddleware");

router.post("/notes", authAuthentication, UserCheckerForNotes, createnote);
router.get("/noted/:notesId", getnote);
router.get("/notes/:userId", authAuthentication, getnotebyId);
router.put("/notes/:noteId", updatenote);
router.delete("/notes/:noteId", deletenoteById);

module.exports = router;
