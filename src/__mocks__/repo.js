'use strict';

class OrganisationRepository {

  constructor() {
    this.tableName = "organisations";
  }

  async all(limit) {
    return this.prepareResponse(200, this.mapResults([]))
  }

  async get(id) {
    return this.prepareResponse(200, this.mapResults([]))
  }

  async create(organisation) {
    return this.prepareResponse(201, this.mapResults([]))
  }

  async patch(organisation) {
    return this.prepareResponse(204, this.mapResults([]))
  }

  async delete(id) {
    return this.prepareResponse(204, this.mapResults([]))
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