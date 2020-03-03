const Cliente = require("../models/Cliente");

module.exports = {
    async incluirCliente(req, res) {
        let cliente = {};
        cliente = await Cliente.findAll({
            where: {
                nome_cliente: req.body.nome_cliente
            }
        });

        if (cliente.length == 0) {
            cliente = await Cliente.create(req.body);
        } else {
            cliente = cliente[0];
        }

        return res.json(cliente);
    },

    async clientePorId(req, res) {
        const id = req.params.id;
        const cliente = await Cliente.findByPk(id);
        return res.json(cliente);
    },

    async listarCliente(req, res) {
        const cliente = await Cliente.findAll();
        return res.json(cliente);
    },

    async clientePorNome(req, res) {
        const nome_cliente = req.params.nome_cliente;

        const cliente = await Cliente.findAll({
            where: {
                nome_cliente: nome_cliente
            }
        });

        return res.json(cliente);
    }

};

// 45:24 busca com relaciomento
