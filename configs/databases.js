const pool = require('./pool');
const connect = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.generatePageBy = (data = []) => {
                    let filters = ''
                    let pagination = ''
                    let sorter = ''

                    if (data.filters) {
                        for (const key in data.filters) {
                            if (Array.isArray(data.filters[key])) {
                                if (data.filters[key].length) {
                                    filters += `AND ${key} IN ('${data.filters[key].join("','")}') `
                                }
                            } else if (data.filters[key]) {
                                filters += `AND LOWER(${key}) LIKE (LOWER(${pool.escape(`%${data.filters[key]}%`)})) `
                            }
                        }
                    }
                    if (data.pagination && data.pagination.current && data.pagination.pageSize) {
                        pagination = `LIMIT ${(data.pagination.current - 1) * data.pagination.pageSize}, ${data.pagination.pageSize} `
                    }
                    if (data.sorter && data.sorter.field && data.sorter.order) {
                        sorter = `ORDER BY ${data.sorter.field} ${(data.sorter.order === "ascend" || data.sorter.order === "ASC") ? "ASC" : "DESC"} `
                    }

                    return { filters, pagination, sorter }
                }

                resolve(connection)
            }
        })
    })
}

module.exports = (req, res, next) => {
    req.useConnection = async (body) => {
        try {
            const connection = await connect()

            body(connection, (response) => {
                connection.release()

                res.success(response)
            }, (err) => {
                connection.release()

                res.error(err)
            })
        } catch (err) {
            res.error(err)
        }
    }

    req.useTransaction = async (body) => {
        try {
            const connection = await connect()

            connection.beginTransaction()

            body(connection, (response) => {
                connection.commit()
                connection.release()

                res.success(response)
            }, (err) => {
                connection.rollback()
                connection.release()

                res.error(err)
            })
        } catch (err) {
            res.error(err)
        }
    }
    next()
}