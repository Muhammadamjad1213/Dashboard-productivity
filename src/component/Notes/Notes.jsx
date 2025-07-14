import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- NoteCard Component ---
function NoteCard({ id, title, content, onDelete, onEdit, className }) {
  return (
    <div
      className={`relative flex flex-col p-4 bg-white rounded-lg shadow-md ${className}`}
    >
      <h3 className='text-xl font-semibold mb-2 text-gray-800'>{title}</h3>
      <p className='text-gray-700 mb-4 flex-grow'>{content}</p>
      <div className='flex justify-end gap-2 mt-auto'>
        <button
          onClick={onEdit}
          className='p-2 rounded-full hover:bg-blue-100 text-blue-600 transition-colors duration-200'
          aria-label='Edit Note'
        >
          <EditIcon />
        </button>
        <button
          onClick={onDelete}
          className='p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors duration-200'
          aria-label='Delete Note'
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

// --- Notes Component ---
export default function Notes() {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [values, setValues] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.title || !note.content) {
      toast.error("Please fill in both fields");
      return;
    }

    if (editIndex === -1) {
      setValues((prevValues) => [...prevValues, note]);
      toast.success("Note added!");
    } else {
      const updatedItems = [...values];
      updatedItems[editIndex] = {
        title: note.title,
        content: note.content,
      };
      setValues(updatedItems);
      setEditIndex(-1);
      toast.success("Note updated!");
    }

    setNote({
      title: "",
      content: "",
    });
  };

  const deleteNote = (id) => {
    setValues((prevValues) => prevValues.filter((_, index) => index !== id));
    toast.info("Note deleted!");
  };

  const EditNote = (id) => {
    setEditIndex(id);
    setNote({
      title: values[id].title,
      content: values[id].content,
    });
  };

  return (
    <div className='flex justify-center items-start min-h-screen bg-gray-100 p-4'>
      {/* Main Container for Form and Notes */}
      <div className='flex flex-col md:flex-row w-full max-w-7xl lg:max-w-screen-xl gap-8'>
        {/* Note Form (Left/Top Section) */}
        <div className='w-full md:w-1/2 lg:w-2/5 flex flex-col items-center pt-8 md:pt-20'>
          {" "}
          {/* Added padding-top */}
          <h1 className='text-5xl font-bold text-gray-800 mb-8'>Notes</h1>
          <div className='w-full max-w-md bg-white rounded-lg shadow-md p-6'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <input
                name='title'
                onChange={handleChange}
                value={note.title}
                placeholder='Title'
                type='text'
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <textarea
                name='content'
                onChange={handleChange}
                value={note.content}
                placeholder='Take a note...'
                rows={3}
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y'
              />

              <button
                type='submit'
                className='self-end px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out flex items-center justify-center'
              >
                {editIndex === -1 ? (
                  <>
                    <AddIcon className='mr-1' /> Add Note
                  </>
                ) : (
                  <>
                    <EditIcon className='mr-1' /> Update Note
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Notes Display (Right Section) */}
        <div className='w-full md:w-1/2 lg:w-3/5 flex justify-center items-start pt-8 md:pt-20'>
          {" "}
          {/* Added padding-top */}
          <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-h-[80vh] overflow-y-auto p-4 rounded-lg bg-gray-50 shadow-inner w-full'>
            {" "}
            {/* Added max-h, overflow-y, p, rounded-lg, bg-gray-50, shadow-inner, w-full */}
            {values.length > 0 ? (
              values.map((item, index) => (
                <NoteCard
                  key={index}
                  id={index}
                  title={item.title}
                  content={item.content}
                  onDelete={() => deleteNote(index)}
                  onEdit={() => EditNote(index)}
                  className='bg-white rounded-lg shadow-md p-4 min-h-[120px] max-h-[250px] overflow-hidden' // Added min-h and max-h for cards
                />
              ))
            ) : (
              <p className='text-center text-gray-500 text-lg col-span-full'>
                No notes yet. Add one!
              </p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer autoClose={3000} position='bottom-right' />
    </div>
  );
}
