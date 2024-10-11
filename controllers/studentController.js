const pool = require('../config/database');

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM student');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a student by ID
const getStudentById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [rows] = await pool.query('SELECT * FROM student WHERE student_id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new student
const createStudent = async (req, res) => {
    const { student_fname, student_lname, user_id, course_id } = req.body;
    const created_at = new Date();  // Current timestamp

    try {
        const [result] = await pool.query(
            'INSERT INTO student (student_fname, student_lname, user_id, course_id, created_at) VALUES (?, ?, ?, ?, ?)',
            [student_fname, student_lname, user_id, course_id, created_at]
        );
        
        res.status(201).json({ id: result.insertId, student_fname, student_lname, user_id, course_id, created_at });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a student
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { student_fname, student_lname, user_id, course_id } = req.body;
    const updated_at = new Date();  // Current timestamp

    try {
        const [result] = await pool.query(
            'UPDATE student SET student_fname = ?, student_lname = ?, user_id = ?, course_id = ?, updated_at = ? WHERE student_id = ?',
            [student_fname, student_lname, user_id, course_id, updated_at, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully', updated_at });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM student WHERE student_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
