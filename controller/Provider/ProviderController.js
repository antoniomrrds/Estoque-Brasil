const validation = require('../../validation/validation')
const { nothingSpace } = validation();
const validator = require('validator');
const Provider = require('../../models/Provider')

class ProviderController {

    async findProviders(req, res) {
     
        try {
            const providerData = await Provider.find()
            const testprovider = providerData.length
            if (testprovider == 0 || providerData == null) {
                res.render("provider/providers", {
                    providers: 0,
                    err: "Não possui Fornecedores cadastrados !"
                })
            } else {
                res.render("provider/providers", { providers: providerData })
            }
        } catch (err) {
            
            res.redirect("/")
        }
    }


    providerRender(req, res) {
        let name = req.flash("name");
        let nameError = req.flash("nameError");
        let stateError = req.flash("stateError");

        nameError = (nameError == null || nameError.length == 0 || nameError == undefined) ? undefined : nameError
        stateError = (stateError == null || stateError.length == 0 || stateError == undefined) ? undefined : stateError
        //dados  
        name = (name == null || name == undefined || nothingSpace(name) == null) ? "" : name
        res.render("provider/createProvider", {
            nameError,
            stateError,
            name: name
        })
    }
    async create(req, res) {
        const { name, state } = req.body;

        let nameError;
        let stateError;

        if (nothingSpace(name) == null || name == undefined || validator.isEmpty(name) || !name) {
            nameError = "O Nome é obrigatório !!!";
        }
        if (!state || state == undefined || state == "Selecione" || state == "Estado") {
            stateError = "O Estado é obrigatório !!!";
        }

        if (nameError != undefined || stateError != undefined) {

            req.flash("name", name);
            req.flash("nameError", nameError);
            req.flash("stateError", stateError);
            res.redirect("/provider");
        } else {
            const nameNothingSpace = nothingSpace(name)

            const provider = {
                name: nameNothingSpace,
                state
            }
                try {
                    await Provider.create(provider);
                    res.redirect("/providers")
                } catch (err) {
                    res.redirect("/")
                }
            }

        
    }


    async renderUpdate(req, res) {
        const id = req.params.id;
        if (!id || validator.isEmpty(id)) {
            res.redirect("/providers")
        }

        let nameError = req.flash("nameError");
        nameError = (nameError == null || nameError.length == 0 || nameError == undefined) ? undefined : nameError

        let stateError = req.flash("stateError");
        stateError = (stateError == null || stateError.length == 0 || stateError == undefined) ? undefined : stateError
    
       
        try {
            

            const providerData = await Provider.findById({ _id: id })

            if (providerData.length != 0 || providerData != undefined) {
                res.render(`provider/providerEdit`, { providers: providerData, nameError, stateError })
            } else {
                res.redirect("/providers")
            }
        } catch (err) {
            res.redirect("/")
        }

    }




    async update(req, res) {
        const id = req.params.id;
        const { name, state } = req.body
        let stateError;
        if (!id || validator.isEmpty(id)) {
            res.redirect("/providers")
        }

        let nameError;
        if (nothingSpace(name) == null || name == undefined || validator.isEmpty(name) || !name) {
            nameError = "O Nome é obrigatório !!!";
        }

        if (!state || state == undefined || state == "Selecione" || state == "Estado") {
            stateError = "O Estado é obrigatório !!!";
        }

        if (nameError != undefined || stateError != undefined) {

            req.flash("name", name);
            req.flash("nameError", nameError);
            req.flash("stateError", stateError);
            res.redirect(`/provider/${id}`);
        } else {

            const nameNothingSpace = nothingSpace(name)

            const provider = {
                name: nameNothingSpace,
                state
            }
           
                const providerData = await Provider.findOne({ _id: id })

                if (providerData.length != 0 || providerData != undefined) {
                    try {
                        const updateProvider = await Provider.updateOne({ _id: id }, provider);
                        res.redirect("/providers")

                        if (updateProvider.matchedCount === 0) {
                            res.redirect("/providers")
                            return
                        }
                    } catch (err) {
                        res.redirect("/providers")
                    }
                } else {
                    res.redirect("/providers")
                }
            }
        

    
}

    async delete (req, res) {
    try {
        const id = req.body.id;
        if (!id || validator.isEmpty(id) || id == null) {
            res.redirect("/providers")
        }

        const providerData = await Provider.findOne({ _id: id })
        if (providerData.length != 0 || providerData != undefined) {
            await Provider.deleteOne({ _id: id });
            res.redirect("/providers")
        } else {
            res.redirect("/providers")
        }

    } catch (err) {
        res.redirect("/providers")
    }
}
}

module.exports = new ProviderController();