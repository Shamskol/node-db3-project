const db = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
        .where({ id })
        .first()
        .then(scheme => {
            if (scheme) {
                return scheme
            } else {
                return null;
            }
        })
}

function findSteps(id) {
    return db('schemes as s')
        .innerJoin('steps as st', 's.id', 'st.scheme_id')
        .where({ scheme_id: id })
        .select('s.id', 's.scheme_name', 'st.step_number as step_number', 'st.instructions as instructions')
        .orderBy('st.step_number')
}

async function add(scheme) {
    const [id] = await db('schemes').insert(scheme);
    return findById(id);
}

async function update(changes, id) {
    const updated = await db('schemes').where({ id: id }).update(changes)
    return findById(id);
}

async function remove(id) {
    const deletedObject = findById(id)
    const deleted = await db('schemes').where({ id: id }).del()
    if (deleted !== null) {
        return deletedObject
    } else return null
}