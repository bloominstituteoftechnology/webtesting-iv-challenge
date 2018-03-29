const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobsSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  occupation: {
    required: true,
    type: String,
  }
});

JobsSchema.methods.getJobsName = function() {
  return this.name;
}

JobsSchema.statics.getAllJobs = (cb) => {
  Jobs.find({}, (err, jobs) => {
    if (err) console.error(err);
    cb(jobs);
  });
};

const Jobs = mongoose.model('Jobs', JobsSchema);

module.exports = Jobs;