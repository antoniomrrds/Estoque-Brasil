const validation = require('../../validation/validation')
const { nothingSpace } = validation();
const validator = require('validator');
const Category = require('../../models/Category')




class CategoryController {

    async findCategories(req, res) {
        let errorCategory = req.flash("errorCategory");
        errorCategory = (errorCategory == null || errorCategory.length == 0 || errorCategory == undefined) ? undefined : errorCategory

        try {
            const categoryData = await Category.find()
            const testcategory =  categoryData.length 
            if (categoryData == null ||testcategory == 0 || categoryData == null) {
                res.render("category/category", {
                    category: 0,
                    err: "Não possui categorias cadastradas !",
                    errorCategory
                })
            } else {
                res.render("category/category", { category: categoryData, errorCategory })
            }
        } catch (err) {
            res.redirect("/")
        }
    }


    categoryRender(req, res) {
        let nameError = req.flash("nameError");

        let name = req.flash("name");
        nameError = (nameError == null || nameError.length == 0 || nameError == undefined) ? undefined : nameError
        //dados  
        name = (name == null || name == undefined || nothingSpace(name) == null) ? "" : name
        res.render("category/createCategory", {
            nameError,
            name: name
        })
    }








    async create(req, res) {
        const { name } = req.body;
        let nameError;
        let errorCategory;
        if (nothingSpace(name) == null || name == undefined || validator.isEmpty(name) || !name) {
            nameError = "O Nome é obrigatório !!!";
        }

        if (nameError != undefined) {

            req.flash("name", name);
            req.flash("nameError", nameError);
            res.redirect("/category");
        } else {
            const nameNothingSpace = nothingSpace(name)

            const category = {
                name: nameNothingSpace
            }
            const result = await Category.find({ name: nameNothingSpace })
            if (result.length != 0) {

                errorCategory = "A categoria já existe !!!"

                if (errorCategory != undefined) {
                    req.flash("errorCategory", errorCategory);
                    res.redirect("/categories");

                }
            } else {
                try {
                    await Category.create(category);
                    res.redirect("/categories")
                } catch (err) {
                    res.redirect("/")
                }
            }

        }
    }


    async renderUpdate(req, res) {
        const id = req.params.id;
        if (!id || validator.isEmpty(id)) {
            res.redirect("/categories")
        }

        let nameError = req.flash("nameError");
        nameError = (nameError == null || nameError.length == 0 || nameError == undefined) ? undefined : nameError


        try {
            const category = await Category.findOne({ _id: id })

            if (category.length != 0 || category != undefined) {
                res.render(`category/categoryEdit`, { category: category, nameError })
            } else {
                res.redirect("/categories")
            }
        } catch (err) {
            res.redirect("/")
        }

    }



    async update(req, res) {
        const id = req.params.id;
        const { name } = req.body
        let errorCategory;

        if (!id || validator.isEmpty(id)) {
            res.redirect("/categories")
        }

        let nameError;
        if (nothingSpace(name) == null || name == undefined || validator.isEmpty(name) || !name) {
            nameError = "O Nome é obrigatório !!!";
        }
        if (nameError != undefined) {
            req.flash("name", name);
            req.flash("nameError", nameError);
            res.redirect(`/category/${id}`);
        } else {

            const nameNothingSpace = nothingSpace(name)

            const category = {
                name: nameNothingSpace
            }
            const result = await Category.find({ name: nameNothingSpace })
            if (result.length != 0) {

                errorCategory = "A categoria já existe !!!"

                if (errorCategory != undefined) {
                    req.flash("errorCategory", errorCategory);
                    res.redirect("/categories");

                }
            } else {
                const categoryData = await Category.findOne({ _id: id })

                if (categoryData.length != 0 || categoryData != undefined) {
                    try {
                        const updateProvider = await Category.updateOne({ _id: id }, category);
                        res.redirect("/categories")

                        if (updateProvider.matchedCount === 0) {
                            res.redirect("/categories")
                            return
                        }
                    } catch (err) {
                        res.redirect("/categories")
                    }
                } else {
                    res.redirect("/categories")
                }
            }

        }
    }

    async delete(req, res) {
        try {
            const id = req.body.id;
        if (!id || validator.isEmpty(id) || id == null) {
            res.redirect("/categories")
        }
        
            const categoryData = await Category.findOne({ _id: id })
            
            if (categoryData.length != 0 || categoryData != undefined) {
               
                await Category.deleteOne({_id: id});
               
                res.redirect("/categories")
            } else {
                res.redirect("/categories")
            }

        } catch (err) {
            res.redirect("/categories")
        }
    }
}

module.exports = new CategoryController();