import "babel/polyfill";
import router from "kinesis-router";
import mongodb from "services/mongodb";
import * as config from "./config";

export const handler = router()
    .on("element inserted in collection gasm-raw-reading", function (event) {
        return mongodb.then(function (db) {
            var gasm = db.collection(config.GASM_COLLECTION_NAME);
            return gasm.update(
                {_id: event.data.sensorId},
                event.data,
                {upsert:true}
            );
        });
    });
