const router = require("express").Router();
const ProductsController = require("../controller/Products/ProductsController");
const CategoryController = require("../controller/Category/CategoryController");
const ProviderController = require("../controller/Provider/ProviderController")
const HomeController = require("../controller/home/HomeController")

router.get('/',HomeController.index);


router.get('/products',ProductsController.findProducts);
router.get('/product',ProductsController.productRender);
router.get('/product/:id',ProductsController.productEdit);
router.post('/product',ProductsController.create)
router.post('/product/edit/:id',ProductsController.update)
router.post('/product/delete',ProductsController.delete)

router.get('/categories',CategoryController.findCategories)
router.get('/category',CategoryController.categoryRender)
router.get('/category/:id',CategoryController.renderUpdate)
router.post('/category',CategoryController.create)
router.post('/category/edit/:id',CategoryController.update)
router.post('/category/delete',CategoryController.delete)


router.get('/providers',ProviderController.findProviders)
router.get('/provider',ProviderController.providerRender)
router.get('/provider/:id',ProviderController.renderUpdate)
router.post('/provider',ProviderController.create)
router.post('/provider/edit/:id',ProviderController.update)
router.post('/provider/delete',ProviderController.delete)


module.exports =  router