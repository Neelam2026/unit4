const mongoose = require("mongoose");

const gallarySchema= new mongoose.Schema(
    {
        profile_pic:[{type: String, required: false}],
        user_id:{type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true}
    },
    {
        versionKey: false,
        timestamps: true,
      }
)

module.exports = mongoose.model("gallary",gallarySchema);