
const validation = require('../../validation/validation')
const { nothingSpace } = validation();
const validator = require('validator');
const Product = require('../../models/Product')
const Provider = require('../../models/Provider')
const Category = require('../../models/Category')

class ProductController {

    async findProducts(req, res) {
        try {
            const providerData = await Provider.find()
            const categoryData = await Category.find()
            const productData = await Product.find()
            const testprovider = productData.length
            if (productData == null || testprovider == 0 || productData == undefined) {
                res.render("product/product", {
                    product: 0,
                    err: "Não possui Produtos cadastrados !"
                })
            } else {
                res.render("product/product", { 
                    product: productData,
                    provider:providerData,
                    category:categoryData
                 })
            }
        } catch (err) {
         
            res.redirect("/")
        }
    }


    async  productRender(req, res) {

        const providerData = await Provider.find()
        const categoryData = await Category.find()
        let providerError = req.flash("providerError");
        let valueError = req.flash("valueError");
        let theAmountError = req.flash("theAmountError");
        let categoryError = req.flash("categoryError");
        let nameError = req.flash("nameError");

        let theAmount = req.flash("theAmount");
        let category = req.flash("category");
        let value = req.flash("value");
        let name = req.flash("name");
        let provider = req.flash("provider");

        //erros do formulario
        providerError = (providerError == null || providerError == undefined || providerError.length == 0) ? undefined : providerError
        valueError = (valueError == null || valueError == undefined || valueError.length == 0) ? undefined : valueError
        theAmountError = (theAmountError == null || theAmountError == undefined || theAmountError.length == 0) ? undefined : theAmountError
        categoryError = (categoryError == null || categoryError == undefined || categoryError.length == 0) ? undefined : categoryError
        nameError = (nameError == null || nameError == undefined || nameError.length == 0) ? undefined : nameError
        //dados  
        name = (name == null || name == undefined || name.length == 0) ? "" : name
        category = (category == null || category == undefined || category.length == 0) ? "" : category
        theAmount = (theAmount == null || theAmount == undefined || theAmount.length == 0) ? "" : theAmount
        value = (value == null || value == undefined || value.length == 0) ? "" : value
        provider = (provider == null || provider == undefined || provider.length == 0) ? "" : provider


        res.render("product/createProduct", {
            providerError,
            valueError,
            theAmountError,
            categoryError,
            nameError,
            theAmount: theAmount,
            category: category,
            value: value,
            provider: provider,
            name: name,
            providerData:providerData,
            categoryData:categoryData

        })
    }

    async create(req, res) {
        const { name, value, theAmount, category, provider } = req.body;

        let providerError;
        let valueError;
        let theAmountError;
        let categoryError;
        let nameError;
        let numberValue = 
                value
                .replace('R$','') 
                .replace(/\./g,'')
                .replace(',','.')
        


        if (nothingSpace(name) == null || validator.isEmpty(name)) {
            nameError = "O Nome é obrigatório !!!";

        }
        if (numberValue == undefined || validator.isEmpty(numberValue) ||numberValue == 0) {
            valueError = "O Valor é obrigatório !!!";

        }
        if (nothingSpace(provider) == null || provider == undefined || provider == "Selecione" || validator.isEmpty(provider)) {
            providerError = "O Fornecedor é obrigatório !!!";

        }
        if (theAmount == undefined || validator.isEmpty(theAmount) || !validator.isInt(theAmount)) {
            theAmountError = "A Quantidade é obrigatória !!!"

        }
        if (nothingSpace(category) == null || category == "Selecione" || validator.isEmpty(category)) {
            categoryError = "A Categoria é obrigatória !!!"
        }


        if (
            theAmountError != undefined ||
            categoryError != undefined ||
            providerError != undefined ||
            valueError != undefined ||
            nameError != undefined
        ) {
            req.flash("theAmountError", theAmountError);
            req.flash("categoryError", categoryError);
            req.flash("providerError", providerError);
            req.flash("valueError", valueError);
            req.flash("nameError", nameError);
            //dados
            req.flash("provider", provider);
            req.flash("value", value);
            req.flash("theAmount", theAmount);
            req.flash("name", name);
            req.flash("category", category);
            res.redirect("/product");
        } else {



            const product = {
                name: name,
                theAmount,
                provider: nothingSpace(provider),
                value:numberValue ,
                category: nothingSpace(category)
            }
            try {
                try {
                    await Product.create(product);
                    res.redirect("/products")
                } catch (err) {
                  console.log(err)
                    res.redirect("/")
                }
            } catch (err) {
                res.redirect("/products")
            }
        }
    }



    async productEdit(req, res) {
        const id = req.params.id

        const providerData = await Provider.find()
        const categoryData = await Category.find()
    
        if (!id  ||  !isNaN(id) ||validator.isEmpty(id) || id == undefined) {
             res.redirect("/products")
           
            return
        }else{

      

        let providerError = req.flash("providerError");
        let valueError = req.flash("valueError");
        let theAmountError = req.flash("theAmountError");
        let categoryError = req.flash("categoryError");
        let nameError = req.flash("nameError");




        providerError = (providerError == null || providerError == undefined || providerError.length == 0) ? undefined : providerError
        valueError = (valueError == null || valueError == undefined || valueError.length == 0) ? undefined : valueError
        theAmountError = (theAmountError == null || theAmountError == undefined || theAmountError.length == 0) ? undefined : theAmountError
        categoryError = (categoryError == null || categoryError == undefined || categoryError.length == 0) ? undefined : categoryError
        nameError = (nameError == null || nameError == undefined || nameError.length == 0) ? undefined : nameError

        try {
           
            const productData = await Product.findOne({ _id: id })
          
           
            if (productData.length != 0 || productData != undefined) {
                return  res.render("product/productEdit", { 
                    product: productData, 
                    providerData,
                    categoryData ,
                    nameError, 
                    valueError,
                    providerError,
                    categoryError,
                    theAmountError

                
                })
            } else {
                 res.redirect("/products")
               
            }
        } catch (err) {
          
              res.redirect("/")
        }
      



    }
    }

    async update(req, res) {
        const { name, value, theAmount, category, provider } = req.body;
        const id = req.params.id
        let numberValue = 
        value
            .replace('R$','') 
            .replace(/\./g,'')
            .replace(',','.')

        let providerError;
        let valueError;
        let theAmountError;
        let categoryError;
        let nameError;


        if (nothingSpace(name) == null || validator.isEmpty(name)) {
            nameError = "O Nome é obrigatório !!!";

        }
        if (numberValue == undefined || validator.isEmpty(numberValue) ||numberValue == 0)  {
            valueError = "O Valor é obrigatório !!!";

        }
        if ( provider == undefined || provider == "Selecione" || validator.isEmpty(provider)) {
            providerError = "O Fornecedor é obrigatório !!!";

        }
        if (theAmount == undefined || validator.isEmpty(theAmount) || !validator.isInt(theAmount)) {
            theAmountError = "A Quantidade é obrigatória !!!"

        }
        if (nothingSpace(category) == null || category == "Selecione" || validator.isEmpty(category)) {
            categoryError = "A Categoria é obrigatória !!!"
        }


        if (
            theAmountError != undefined ||
            categoryError != undefined ||
            providerError != undefined ||
            valueError != undefined ||
            nameError != undefined
        ) {
            req.flash("theAmountError", theAmountError);
            req.flash("categoryError", categoryError);
            req.flash("providerError", providerError);
            req.flash("valueError", valueError);
            req.flash("nameError", nameError);
            //dados
            req.flash("provider", provider);
            req.flash("value", value);
            req.flash("theAmount", theAmount);
            req.flash("name", name);
            req.flash("category", category);
            res.redirect(`/product/${id}`);
        } else {
            const product = {
                name: nothingSpace(name),
                theAmount,
                provider: provider,
                value:numberValue,
                category
            }
          


            const productData = await Product.findOne({ _id: id })

            if (productData.length != 0 || productData != undefined) {
                try {
                    const updateProduct = await Product.updateOne({ _id: id }, product);
                 
                    if (updateProduct.matchedCount === 0) {
                        res.redirect("/products")
                        return
                    }
                    res.redirect("/products")
                } catch (err) {
                    res.redirect("/products")
                }
            } else {
               
                res.redirect("/products")
            }




        }


    }
    async delete(req, res) {
        try {
            const id = req.body.id;
            if (!id || validator.isEmpty(id) || id == null) {
                res.redirect("/products")
            }

            const productData = await Product.findOne({ _id: id })
            if (productData.length != 0 || productData != undefined) {
                await Product.deleteOne({ _id: id });
                res.redirect("/products")
            } else {
                res.redirect("/products")
            }

        } catch (err) {
            res.redirect("/products")
        }
    }

}
module.exports = new ProductController();