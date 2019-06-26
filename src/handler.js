'use strict';

const OrganisationRepository = require('./repo.js')

let repo = new OrganisationRepository()

module.exports.all = async (event) => {
  return await repo.all(20)
};

module.exports.create = async (event) => {
  // business logic/input validation to be added
  const organisation = JSON.parse(event.body)
  return await repo.create(organisation)
};

module.exports.get = async (event) => {
  return await repo.get(event.pathParameters.id)
};

module.exports.update = async (event) => {
  console.log(event)
  // business logic/input validation to be added
  let organisation = JSON.parse(event.body)
  organisation.id = event.pathParameters.id
  return await repo.patch(organisation)
};

module.exports.delete = async (event) => {
  return await repo.delete(event.pathParameters.id)
};
