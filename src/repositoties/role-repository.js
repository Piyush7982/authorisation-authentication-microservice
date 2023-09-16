const CrudRepository = require("./crud-repository");
const { role } = require('../models');


class RoleRepository extends CrudRepository {
    constructor() {
        super(role);
    }

    async getRoleByName(name) {
        const Role = await role.findOne({ where: { role: name } });
        return Role;
    }
}

module.exports = RoleRepository;