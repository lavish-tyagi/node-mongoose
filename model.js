const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user_permissions = new Schema(
    {
      user_type: {
        type: String
      },
      permission_id: {
        type: Array
      }
    },
    { collection: "user_permissions" }
  );

let permission_list = new Schema(
    {
      resource: {
        type: String
      },
      group: {
        type: String
      },
      description: {
        type: String
      }
    },
    { collection: "permission_list" }
  );

var user_permissionsData = mongoose.model("user_permissions", user_permissions);
var permission_listData = mongoose.model("permission_list", permission_list);

module.exports = {'permission_list':permission_listData, 'user_permissions':user_permissionsData};