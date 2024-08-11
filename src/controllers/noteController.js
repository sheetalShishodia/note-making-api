const Note = require('../models/Note');

// Create a new note
exports.createNote = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        const note = new Note({
            title,
            body,
        });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        next(err);
    }
};

// Fetch a note by ID
exports.getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
        console.log(note);
    } catch (err) {
        next(err);
    }
};

// Query notes by title substring
exports.queryNotesByTitle = async (req, res, next) => {
    try {
        const { title } = req.query;
        const notes = await Note.find({ title: new RegExp(title, 'i') });
        res.json(notes);
    } catch (err) {
        next(err);
    }
};

// Update an existing note
exports.updateNote = async (req, res, next) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updated_at: Date.now() },
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (err) {
        next(err);
    }
};
