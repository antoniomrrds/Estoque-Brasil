const Product = require("../../models/Product");
const Category = require("../../models/Category");
const Provider = require("../../models/Provider")
class HomeController{

    async index(req, res){
        try{
            let totalPerProduct = 0;
            let totalTheAmount ;
            const totalProductValue = 0;
            const providerData = await Provider.find()
            const categoryData = await Category.find()
            const productData = await Product.find()
           

        
                totalPerProduct=   productData.reduce((totalproduct,product) => totalproduct +=  product.theAmount*product.value ,0)

//value formater
                let formatter = new Intl.NumberFormat([], {
                    style: 'currency',
                    currency: 'BRL'
                  })
               
                  totalTheAmount = productData.reduce((totalproduct,product) => totalproduct + product.theAmount ,0)

            const products = (productData.length == 0 )?  0:productData.length
            const category = (categoryData.length == 0)?  0:categoryData.length
            const provider = (providerData.length == 0)?  0:providerData.length
               res.render('index',{
            product:totalTheAmount,
            provider:provider,
            category:category,
            totalProductValue:formatter.format(totalPerProduct)

        })
        }catch(err){
            console.log(err)
            res.redirect("/")
        }
    }
    }
  
        



module.exports = new HomeController();