const express = require("express");
const router = express.Router();

const store = [
  {
      id: 1, 
      title: 'Title 1',
      content: `Loreum Ipsum`,
      keywords: ['keyword1', 'ky2', 'ky3']
  },
  {
      id: 2, 
      title: 'Title 2',
      content: `Loreum Ipsum`,
      keywords: ['keyword1', 'ky2', 'ky3']
  },
  {
      id: 3, 
      title: 'Title 3',
      content: `Loreum Ipsum`,
      keywords: ['keyword1', 'ky2', 'ky3']
  },
]

router.get("/", (req, res, next) => {
  res.status(200).json({
    status: true,
    data: store
  })
});

router.post("/", (req, res, next) => {
  const id = store[store.length - 1].id + 1
  const sotorePrev = store.length
  store.push({
    ...req.body,
    id
  })

  res.status(200).json({
    status: sotorePrev < store.length,
    id: id
  })
})

router.put("/:id", (req, res, next) => {
  store = store.map(e => {
    if (e.id === req.params.id)
      return {
        ...e,
        ...req.body
      }
  })

  res.status(200).json({
    status: true,
    updatedNotes: store
  })
  
})

router.delete('/:id', (req, res, next) => {
  store = store.filter(e => e.id !== req.params.id).map(e => e)
  res.status(200).json({
    status: true,
    updatedNotes: store
  })
})

module.exports = router;