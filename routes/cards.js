const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'card inventory application'
  });

  // Get all cards
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM cards';
    db.query(sql, (err, cards) => {
      if (err) {
        console.error('Error retrieving cards: ', err);
        res.status(500).json({ error: 'An error occurred while retrieving the cards' });
        return;
      }
      res.status(200).json({ cards });
    });
  });
  
  // Get a single card
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM cards WHERE id = ?';
    db.query(sql, [id], (err, cards) => {
      if (err) {
        console.error('Error retrieving card: ', err);
        res.status(500).json({ error: 'An error occurred while retrieving the card' });
        return;
      }
      if (cards.length === 0) {
        res.status(404).json({ error: 'Card not found' });
        return;
      }
      res.status(200).json({ card: cards[0] });
    });
  });
  
  // Create a new card
  router.post('/', (req, res) => {
    const { name, price, quantity, manaCost, color } = req.body;
    const sql = 'INSERT INTO cards (name, price, quantity, mana_cost, color) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, price, quantity, manaCost, color], (err, result) => {
      if (err) {
        console.error('Error creating card: ', err);
        res.status(500).json({ error: 'An error occurred while creating the card' });
        return;
      }
      const cardId = result.insertId;
      res.status(201).json({ cardId });
    });
  });
  
  // Update a card
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, manaCost, color } = req.body;
    const sql = 'UPDATE cards SET name = ?, price = ?, quantity = ?, mana_cost = ?, color = ? WHERE id = ?';
    db.query(sql, [name, price, quantity, manaCost, color, id], (err, result) => {
      if (err) {
        console.error('Error updating card: ', err);
        res.status(500).json({ error: 'An error occurred while updating the card' });
        return;
      }
      res.sendStatus(204);
    });
  });
  
  // Delete a card
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM cards WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting card: