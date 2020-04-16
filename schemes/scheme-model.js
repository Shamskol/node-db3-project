const db = require("../data/db-config.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find(){
    return db.select("*").from("schemes");
}

function findById(id) {
    return db("schemes")
        .where({ id: id })
        .first();
}

function findSteps(id) {
    return db("steps as st")
        .join("schemes as s", "s.id", "=", "st.scheme_id")
        .where({ scheme_id: id })
        .select("st.id", "s.scheme_name", "st.step_number", "st.instructions");
}

function add(scheme) {
    return db("schemes")
        .insert(scheme)
        .then(([id]) => {
            return findById(id);
        });
}

function update(changes, id) {
    return db('schemes')
        .where('id', Number(id))
        .update(changes);
}

function remove(id) {
    return db("schemes")
        .where("id", id)
        .del();
}