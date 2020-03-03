const Produto = require("../models/Produto");
const multer = require('multer')
const fs = require('fs')


module.exports = {
    async uploadImagemProduto(req, res) {
        // console.log('req.file:: ', req.file);
        // var imageData = fs.readFileSync(req.file.path);
        const { id } = req.params;

        //const produto = await Produto.findByPk(id);
        // produto.img = imageData;
        //        const produtoAtualizado = Produto.update(produto);

        console.log('req.file.filename: ', req.file);

        const produtoAtualizado = await Produto.update({
            img: req.file.filename ? req.file.filename : ''
        }, {
            where: {
                id: id
            }
        });

        //console.log(Produto.findByPk(id));


        return res.json(produtoAtualizado);
    },

    async incluirProduto(req, res) {
        const produto = await Produto.create(req.body);
        return res.json(produto);
    },



    async listarProduto(req, res) {
        let produtos = await Produto.findAll();
        return res.json(produtos);
    },

    async consultarPorId(req, res) {
        const { id } = req.params;

        const produto = await Produto.findByPk(id, {
            include: { association: 'pedidos' }
        })

        return res.json(produto);
    }
};