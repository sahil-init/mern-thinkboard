import Note from '../models/Note.js';

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error in getAllNotes controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: 'Note not found!' });

    res.json(note);
  } catch (error) {
    console.error('Error in getNoteById controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error('Error in createNote controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true },
    );

    if (!updatedNote) return res.status(404).json(updatedNote);

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error('Error in updateNote controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote)
      return res.status(404).json({ message: 'Note not found!' });

    res.status(200).json({ message: 'Note deleted successfully!' });
  } catch (error) {
    console.error('Error in deleteNote controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
