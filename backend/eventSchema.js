const schema = {
    "title": "Change About Us",
    "description": "Schema for the event to change the about us",
    "type": "object",
    "properties": {
        "event_id" : {
            "type": "integer",
            "minimum": 0,
            "maximum": 10000
        },
        "event_name": {
            "type": "string",
            "const": "Updated About US"
        },
        "service_name": {
            "type": "string"
        },
        "date": {
            "type": "string"
        },
        "about_us":{
            "type": "string"
        },
        "picture": {
            "type": "string"
        }
    },
    "required": [
        "event_id",
        "event_name",
        "service_name",
        "date"
    ]
}

//const schemaAsObject = JSON.parse(schema)

module.exports = schema
