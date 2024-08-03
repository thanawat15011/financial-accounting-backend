let company_table_uuid
const setCompanyUUID = (uuid) => {
  company_table_uuid = uuid
}
const getCompanyUUID = () => {
  return company_table_uuid
}

module.exports = {
  setCompanyUUID,
  getCompanyUUID,
}
