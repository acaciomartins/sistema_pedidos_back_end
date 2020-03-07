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
        console.log('req.body: ', req.body);
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
    },

    async excluirPorId(req, res) {
        const { id } = req.params;
        console.log('id: ', id);

        const produto = await Produto.destroy({
            where: {
                id: id
            }
        })
            .then(produtoDeletado => {
                console.log(`Has the Max been deleted? 1 means yes, 0 means no: ${produtoDeletado}`);
            }).
            catch(erro => {
                return res.status(400).send({ error: 'Erro ao excluir produto' });

            });

        return res.json(produto);
    },

    async atualizarProduto(req, res) {
        const { id } = req.params;
        const { categoria, nome, descricaoProduto, img, valorUnitario } = req.body;
        console.log('req.body: ', req.body);

        let produto = {
            categoria,
            nome_produto: nome,
            descricao: descricaoProduto,
            img,
            preco_produto: valorUnitario
        }

        const produtoAtualizado = await Produto.update(produto, {
            where: {
                id: id
            }
        });

        return res.json(produtoAtualizado);
    },
};