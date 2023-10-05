const router = require('express').Router()
const path = require('path')
const fs = require('fs')
const dbPath = path.join(__dirname, "..", "db", "db.json")

router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            res.status(500).json(err)
            return
        }
        const json = JSON.parse(data)
        res.json(json)
    })
})

router.post('/notes', (req, res) => {
    const { title, text } = req.body

    if (!title || !text) {
      res.status(400).json({error: 'Missing title or text!'})
      return
    }
  
    const newNote = {
      ...req.body,
      id: Math.random().toFixed(3)*1000
    }
  
    fs.readFile(dbPath, 'utf-8', function(err, data) {
      if (err) {
        res.status(500).json({ error: 'Unable to read the database.' })
        return;
      }
  
      const noteData = JSON.parse(data)
      noteData.push(newNote)
  
      fs.writeFile(dbPath, JSON.stringify(noteData), function(err) {
        if (err) {
          res.status(500).json({ error: 'Unable to write to the database.' })
          return;
        }
        res.status(200).json(newNote)
      });
    });
  });
  
  router.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    

    if (!id) {
      res.status(400).json({error: "No id was given."})
      return
    }
    
  
    fs.readFile(dbPath, 'utf-8', function(err, data) {

        const noteData = JSON.parse(data)
        console.log("NoteData:" + noteData)
  
        const updatedNoteData = noteData.filter(notes => {
          if (notes.id == id) {
            return false
          } else {
            return true
          }
        })
        
        // console.log("Note:" + id + note.id), parseInt(id) !== parseInt(note.id)
        console.log(updatedNoteData)
        
        fs.writeFile(dbPath, JSON.stringify(updatedNoteData), function(err) {
          if (err) {
            res.status(500).json({ error: 'Unable to write to the database.' })
            return
          }
          res.status(200).json(true)

        })

      })
      
      console.log("Delete route hit!")
      })
  

module.exports = router