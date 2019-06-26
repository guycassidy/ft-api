'use strict';
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB()

class OrganisationRepository {

  constructor() {
    this.tableName = "organisations";
  }

  async all(limit) {
    try {
      const params = {
        TableName: this.tableName,
        Limit: limit
      };
      const response = await dynamoDB.scan(params).promise()
      return this.prepareResponse(200, this.mapResults(response.Items))
    } catch(err) {
      return this.prepareResponse(err.statusCode, err.message)
    }
  }

  async get(id) {
    try {
      const params = {
        TableName: this.tableName,
        KeyConditionExpression: "#orgId = :orgId",
        ExpressionAttributeNames:{
            "#orgId": "orgId"
        },
        ExpressionAttributeValues: {
            ":orgId": {S: id}
        }
      };
      const response = await dynamoDB.query(params).promise()
      if (response.Items.length != 0) {
        return this.prepareResponse(200, this.mapResults(response.Items))
      } else {
        throw {statusCode: 404, message: "Bad request"}
      }      
    } catch(err) {
      return this.prepareResponse(err.statusCode, err.message)
    }
  }

  async create(organisation) {
    try {
      const params = {
        TableName: this.tableName,
        Item: {
          'name' : {S: organisation.name},
          'orgId' : {S: organisation.id},
          'yearFounded' : {S: organisation.yearFounded},
          'revenue' : {S: organisation.revenue}
        },
        ConditionExpression: "attribute_not_exists(orgId)"
      };
      await dynamoDB.putItem(params).promise()
      return this.prepareResponse(201, organisation)
    } catch(err) {
      return this.prepareResponse(err.statusCode, err.message)
    }
  }

  async patch(organisation) {
    try {
      const params = {
        TableName: this.tableName,
        Item: {
          'name' : {S: organisation.name},
          'orgId' : {S: organisation.id},
          'yearFounded' : {S: organisation.yearFounded},
          'revenue' : {S: organisation.revenue}
        }
      };
      await dynamoDB.putItem(params).promise()
      return this.prepareResponse(204, null)
    } catch(err) {
      return this.prepareResponse(err.statusCode, err.message)
    }
  }

  async delete(id) {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          'orgId' : {S: id},
        }
      };
      await dynamoDB.deleteItem(params).promise()
      return this.prepareResponse(204, null)
    } catch(err) {
      return this.prepareResponse(err.statusCode, err.message)
    }
  }

  mapResults(items) {
    return items.map((item) => {
      let org = {}
      org.id = (item.orgId) ? item.orgId.S : ''
      org.name = (item.name) ? item.name.S : ''
      org.yearFounded = (item.yearFounded) ? item.yearFounded.S : ''
      org.revenue = (item.revenue) ? item.revenue.S : ''
      return org
    })
  }

  prepareResponse(statusCode, data) {
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        data
      }, null, 2),
    };
  }
}

module.exports = OrganisationRepository