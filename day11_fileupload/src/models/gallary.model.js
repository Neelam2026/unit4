const mongoose = require("mongoose");

const gallarySchema= new mongoose.Schema(
    {
        profile_pic:[{type: String, required: false}],
        userId:{type:mongoose.Schema.Types.ObjectId}
    },
    {
        versionKey: false,
        timestamps: true,
      }
)

module.exports = mongoose.model("gallary",gallarySchema);