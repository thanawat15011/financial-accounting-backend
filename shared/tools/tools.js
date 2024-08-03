let getCondition = (data) => {
  try {
    if (data != undefined && data != '') {
      let sqlCommand = "AND tb1.company_table_uuid IN (" + data + ")"
      return sqlCommand
    } else {
      return ""
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = {
  getCondition,
}
