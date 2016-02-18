import "babel/polyfill";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import {handler} from "index";
import mongodb from "services/mongodb";
import {GASM_COLLECTION_NAME} from "config";
import {getEventFromObject, run} from "../mock";

describe("On gasm-reading",  () => {

    var collection;
    var db;
    before(async () => {
        db = await mongodb;
        collection = db.collection(GASM_COLLECTION_NAME);
    });
    after(async () => {
        await db.close();
    });
    beforeEach(async () => {
        await collection.remove({});
    });

    it("inserts an element into the collection if no element is present", async () => {
        const event = getEventFromObject(fakeEvent);
        await run(handler, event);
        var element = await collection.findOne();
        console.log("element", element);
    });
    
    it("update an element into the collection if element is present", async () => { 
        await collection.insert(fakeElement);     
        const event = getEventFromObject(fakeEvent);
        await run(handler, event);
        var element = await collection.findOne();
        console.log("element", element);
    });

});

var fakeEvent=  {
    type: "element inserted in collection gasm-raw-reading",
    data: {
        "sensorId": "5_GASM01",
        "date": "2016-02-04T15:03:50.000Z",
        "measurements": [
            {
                "type": "CorrectedGasCounter",
                "source": "reading",
                "unitOfMeasurement": "m3",
                "value": 157528.29476249218
            },
            {
                "type": "MeasuredGasCounter",
                "source": "reading",
                "unitOfMeasurement": "m3",
                "value": "161289"
            },
            {
                "type": "Pressure",
                "source": "reading",
                "unitOfMeasurement": "bar",
                "value": "1.061227"
            },
            {
                "type": "Temperature",
                "source": "reading",
                "unitOfMeasurement": "°C",
                "value": "17.43649"
            },
            {
                "type": "ConversionCostant",
                "source": "reading",
                "unitOfMeasurement": "",
                "value": "1.038604"
            },
            {
                "type": "CorrectedVolInErrCond",
                "source": "reading",
                "unitOfMeasurement": "m3",
                "value": 10125.100350618362
            },
            {
                "type": "CorrectedVolDay",
                "source": "reading",
                "unitOfMeasurement": "m3",
                "value": 435.63056111335754
            },
            {
                "type": "CorrectedVolMonth",
                "source": "reading",
                "unitOfMeasurement": "m3",
                "value": 3986.771264076233
            },
            {
                "type": "MeasuredVolDay",
                "source": "reading",
                "unitOfMeasurement": "m3",
                "value": "414"
            },
            {
                "type": "MeasuredFlow",
                "source": "reading",
                "unitOfMeasurement": "m3/h",
                "value": "64.73656"
            },
            {
                "type": "CorrectedFlow",
                "source": "reading",
                "unitOfMeasurement": "m3/h",
                "value": "67.23566"
            },
            {
                "type": "BatteryCapacity",
                "source": "reading",
                "unitOfMeasurement": "%",
                "value": 99.6
            }
        ] 
    }  
};   

var fakeElement=  {
    "_id": "5_GASM01",
    "date": "2016-02-04T15:03:50.000Z",
    "measurements": [
        {
            "type": "CorrectedGasCounter",
            "source": "reading",
            "unitOfMeasurement": "m3",
            "value": 157528.29476249218
        },
        {
            "type": "MeasuredGasCounter",
            "source": "reading",
            "unitOfMeasurement": "m3",
            "value": "161289"
        },
        {
            "type": "Pressure",
            "source": "reading",
            "unitOfMeasurement": "bar",
            "value": "1.061227"
        },
        {
            "type": "Temperature",
            "source": "reading",
            "unitOfMeasurement": "°C",
            "value": "17.43649"
        },
        {
            "type": "ConversionCostant",
            "source": "reading",
            "unitOfMeasurement": "",
            "value": "1.038604"
        },
        {
            "type": "CorrectedVolInErrCond",
            "source": "reading",
            "unitOfMeasurement": "m3",
            "value": 10125.100350618362
        },
        {
            "type": "CorrectedVolDay",
            "source": "reading",
            "unitOfMeasurement": "m3",
            "value": 435.63056111335754
        },
        {
            "type": "CorrectedVolMonth",
            "source": "reading",
            "unitOfMeasurement": "m3",
            "value": 3986.771264076233
        },
        {
            "type": "MeasuredVolDay",
            "source": "reading",
            "unitOfMeasurement": "m3",
            "value": "414"
        },
        {
            "type": "MeasuredFlow",
            "source": "reading",
            "unitOfMeasurement": "m3/h",
            "value": "64.73656"
        },
        {
            "type": "CorrectedFlow",
            "source": "reading",
            "unitOfMeasurement": "m3/h",
            "value": "67.23566"
        },
        {
            "type": "BatteryCapacity",
            "source": "reading",
            "unitOfMeasurement": "%",
            "value": 99.6
        }
    ]   
}; 