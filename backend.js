const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();


const send_response = (data) => {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data)
    };
    return response;
};


const get_all_data = async () => {
    try {
        var data = await dynamoDB.scan({ TableName: "table_name" }).promise();
        if (data.Items) {
            return send_response(data.Items);
        }
    }
    catch (e) {
        console.log(e);
    }

};

const one_data = async (id) => {
    try {
        var get_one_user = await dynamoDB.get({
            TableName: "table_name",
            Key: {
                book_id: id,
            },
        }).promise();
        if (get_one_user) {
            return send_response(get_one_user);
        }
    }
    catch (e) {
        console.log(e);
    }
};


const create_book = async (items) => {
    const newUser = await dynamoDB.put({
        Item: {
            ...items
        },
        TableName: "table_name",
    }).promise();
    if (newUser) {
        return send_response({ message: 'Updated' });
    };
};

const delete_book = async (id) => {
    const newUser = await dynamoDB.delete({
        Item: {
            book_id: id
        },
        TableName: "table_name",
    }).promise();
    if (newUser) {
        return send_response({ message: 'Updated' });
    };
};


exports.handler = async (event) => {
    if (event.resource && event.resource === '/one_user') {
        const { book_id } = event.queryStringParameters || {};
        return one_data(book_id);
    }
    else if (event.resource && event.resource === '/create_user') {
        const getBodyData = JSON.parse(event.body);
        return create_book(getBodyData);
    }
    else if (event.resource && event.resource === '/delete_user') {
        const { book_id } = event.queryStringParameters || {};
        return delete_book(book_id);
    }
    else return get_all_data();

};
