import { signInRequest, signOutRequest } from './signInRequest'
import {
  frontProductRequest,
  allFrontProductRequest,
  singleProductRequest
} from './frontRequest'
import {
  checkRequest,
  productPageRequest,
  allProductRequest,
  delProductRequest,
  upLoadRequest,
  modifyProductRequest,
  addProductRequest
} from './adminRequest'

export const apiSignInRequest = signInRequest
export const apiSignOutRequest = signOutRequest

//front
export const apiAllFrontProduct = allFrontProductRequest
export const apiFrontProduct = frontProductRequest
export const apiSingleProduct = singleProductRequest

//admin
export const apiCheckRequest = checkRequest
export const apiProductPage = productPageRequest
export const apiAllProduct = allProductRequest
export const apiDelProduct = delProductRequest
export const apiUpLoad = upLoadRequest
export const apiModifyProduct = modifyProductRequest
export const apiAddProduct = addProductRequest
