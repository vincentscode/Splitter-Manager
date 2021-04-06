const Character = require('../../models/character')
const config = require('../../config')

exports.list = (req, res, next) => {
  Character.find({ user: req.__userId }).then(char => {
    return res.status(200).json(char)
  }).catch(err => {
    next({ status: 500, message: err.message })
  })
}

exports.create = async (req, res, next) => {
  Character.create(req.body).then(async char => {
    return res.status(200).json(char)
  }).catch(err => {
    next({ status: 500, message: err.message })
  })
}

exports.getById = (req, res, next) => {
  Character.findOne({ _id: req.params.characterId }).then(char => {
    // public by default
    return res.status(200).json(char)
    // if (char.user.toString() === req.__userId) {
    //   return res.status(200).json(char)
    // } else {
    //   return res.status(403)
    // }
  }).catch(err => {
    next({ status: 500, message: err.message })
  })
}

exports.updateById = async (req, res, next) => {
  const char = await Character.findOne({ _id: req.params.characterId });
  if (!char) return next({ status: 404, message: "Character not found." });

  if (char.user.toString() !== req.__userId) {
    return res.status(403)
  }

  Character.updateOne({ _id: req.params.characterId }, req.body, (err, f) => {
    if (err) return next({ status: 500, message: err.message })
    return res.status(200).send();
  }).catch(err => {
    next({ status: 500, message: err.message })
  })
}

exports.deleteById = async (req, res, next) => {
  const char = await Character.findOne({ _id: req.params.characterId });
  if (!char) return next({ status: 404, message: "Character not found." });

  if (char.user.toString() !== req.__userId) {
    return res.status(403)
  }

  Character.deleteOne({ _id: req.params.characterId }).then(async () => {
    return res.status(200).send()
  }).catch(err => {
    next({ status: 500, message: err.message })
  })
}
