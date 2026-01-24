const express = require('express');
const router = express.Router();
const supabase = require('../db');

// GET all composers
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('composers')
        .select('*')
        .order('name');

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data);
});

// GET composer by ID with works and recordings
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const { data: composer, error: composerError } = await supabase
        .from('composers')
        .select('*')
        .eq('id', id)
        .single();

    if (composerError) {
        return res.status(500).json({ error: composerError.message });
    }

    const { data: works, error: worksError } = await supabase
        .from('works')
        .select('*')
        .eq('composer_id', id);

    if (worksError) {
        return res.status(500).json({ error: worksError.message });
    }

    const { data: recordings, error: recordingsError } = await supabase
        .from('recordings')
        .select('*')
        .eq('composer_id', id);

    if (recordingsError) {
        return res.status(500).json({ error: recordingsError.message });
    }

    res.json({ ...composer, works, recordings });
});

// POST create composer
router.post('/', async (req, res) => {
    const { name, period, image } = req.body;
    const { data, error } = await supabase
        .from('composers')
        .insert([{ name, period, image }])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data[0]);
});

// PUT update composer
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, period, image } = req.body;
    const { data, error } = await supabase
        .from('composers')
        .update({ name, period, image })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(data[0]);
});

// DELETE composer
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('composers')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json({ message: 'Composer deleted successfully' });
});

module.exports = router;
