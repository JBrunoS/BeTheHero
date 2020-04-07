const connection = require('../database/connection');

module.exports = {

    async create (request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        if (!ong) {
            return response.status(400).json({ error : 'This id is not longer valid'});
        }

        return response.json(ong)
    }
}