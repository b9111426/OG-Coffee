import { signInRequest, signOutRequest } from './signInRequest'
import {
  frontProductRequest,
  allFrontProductRequest,
  singleProductRequest,
  getCartRequest,
  deleteCartRequest,
  addCartRequest,
  modifyCartRequest,
  frontCategoryRequest,
  postOrderRequest
} from './frontRequest'
import {
  checkRequest,
  productPageRequest,
  allProductRequest,
  delProductRequest,
  upLoadRequest,
  modifyProductRequest,
  addProductRequest,
  getOrdersRequest,
  modifyOrdersRequest,
  deleteOrderRequest,
  getCouponsRequest,
  addCouponsRequest,
  modifyCouponsRequest,
  deleteCouponRequest,
  getArticlesRequest,
  deleteArticleRequest,
  modifyArticleRequest,
  addArticleRequest,
  getArticleRequest
} from './adminRequest'

export const apiSignInRequest = signInRequest
export const apiSignOutRequest = signOutRequest

//front
export const apiAllFrontProduct = allFrontProductRequest
export const apiFrontProduct = frontProductRequest
export const apiSingleProduct = singleProductRequest
export const apiGetCart = getCartRequest
export const apiDeleteCart = deleteCartRequest
export const apiAddCart = addCartRequest
export const apiModifyCart = modifyCartRequest
export const apiDeleteOrder = deleteOrderRequest
export const apiPostOrder = postOrderRequest
//admin
export const apiCheckRequest = checkRequest
export const apiProductPage = productPageRequest
export const apiAllProduct = allProductRequest
export const apiDelProduct = delProductRequest
export const apiUpLoad = upLoadRequest
export const apiModifyProduct = modifyProductRequest
export const apiAddProduct = addProductRequest
export const apiGetOrder = getOrdersRequest
export const apiModifyOrder = modifyOrdersRequest
export const apiGetCoupons = getCouponsRequest
export const apiAddCoupons = addCouponsRequest
export const apiModifyCoupons = modifyCouponsRequest
export const apiDeleteCoupon = deleteCouponRequest
export const apiGetArticles = getArticlesRequest
export const apiDeleteArticle = deleteArticleRequest
export const apiModifyArticle = modifyArticleRequest
export const apiAddArticle = addArticleRequest
export const apiGetArticle = getArticleRequest
export const apiFrontCategory = frontCategoryRequest
