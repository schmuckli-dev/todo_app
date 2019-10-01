import { sCStorage } from "schmucklicloud_storage";
import { sCAuth } from "schmucklicloud_auth";

var app_id = "a3f48aa8e6b0d671437299401e455754661911cc";
var app_secret = "f00ba5b658195af6d847e99755b66d4080332f48c978b10454fd52f09019cf68";

var storage_reference = new sCStorage(app_id, app_secret);
var auth_reference = new sCAuth(app_id, app_secret);

export { storage_reference as storage, auth_reference as auth};