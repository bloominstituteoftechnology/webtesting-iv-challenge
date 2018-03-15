const Ama = require('../../models/ama/ama');

module.exports = {
  create: ama => {
    return new Ama(ama).save();
  },
  get: cb => {
    return Ama.getAllAmas(cb);
  },
  getId: id => {
    return Ama.findOne({ _id: id });
  },
  update: (id, ama) => {
    return Ama.findByIdAndUpdate(id, ama, { new: true });
  },
  del: id => {
    return Ama.findByIdAndRemove(id);
  },
};
