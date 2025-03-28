import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    productCategoriesActionType,
    toastType,
} from "../../constants";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    setTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { getProductCategories } from "../../../../js/indexDB";

export const fetchProductCategories =
    (filter = {}, isLoading = true) =>
        async (dispatch) => {
            if (isLoading) {
                dispatch(setLoading(true));
            }
            let url = apiBaseURL.PRODUCTS_CATEGORIES;
            if (
                !_.isEmpty(filter) &&
                (filter.page ||
                    filter.pageSize ||
                    filter.search ||
                    filter.order_By ||
                    filter.created_at)
            ) {
                url += requestParam(filter, null, null, null, url);
            }
            apiConfig
                .get(url)
                .then(async (response) => {
                    dispatch({
                        type: productCategoriesActionType.FETCH_PRODUCTS_CATEGORIES,
                        payload: response.data.data,
                    });
                    dispatch(setTotalRecord(response.data.meta.total));
                })
                .catch(({ response }) => {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                })
                .finally(() => {
                    if (isLoading) {
                        dispatch(setLoading(false));
                    }
                });
        };

export const fetchProductCategory =
    (productId, singleProduct) => async (dispatch) => {
        apiConfig
            .get(
                apiBaseURL.PRODUCTS_CATEGORIES + "/" + productId,
                singleProduct
            )
            .then((response) => {
                dispatch({
                    type: productCategoriesActionType.FETCH_PRODUCT_CATEGORIES,
                    payload: response.data.data,
                });
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const addProductCategory = (products) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.PRODUCTS_CATEGORIES, products)
        .then((response) => {
            dispatch({
                type: productCategoriesActionType.ADD_PRODUCT_CATEGORIES,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "product-category.success.create.message"
                    ),
                })
            );
            dispatch(addInToTotalRecord(1));
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const editProductCategory = (productId, products, handleClose) => async (dispatch) => {
    apiConfig
        .post(apiBaseURL.PRODUCTS_CATEGORIES + "/" + productId, products)
        .then((response) => {
            dispatch({
                type: productCategoriesActionType.EDIT_PRODUCT_CATEGORIES,
                payload: response.data.data,
            });
            handleClose(false);
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "product-category.success.edit.message"
                    ),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({
                    text: response.data.message,
                    type: toastType.ERROR,
                })
            );
        });
};

export const deleteProductCategory = (productId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.PRODUCTS_CATEGORIES + "/" + productId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({
                type: productCategoriesActionType.DELETE_PRODUCT_CATEGORIES,
                payload: productId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "product-category.success.delete.message"
                    ),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchAllProductCategories = () => async (dispatch) => {
    if (navigator.onLine) {
        apiConfig
            .get(`product-categories?page[size]=0`)
            .then((response) => {
                dispatch({
                    type: productCategoriesActionType.FETCH_ALL_PRODUCTS_CATEGORIES,
                    payload: response.data.data,
                });
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({ text: response.data.message, type: toastType.ERROR })
                );
            });
    } else {
        let productCategories = await getProductCategories()
        dispatch({
            type: productCategoriesActionType.FETCH_ALL_PRODUCTS_CATEGORIES,
            payload: productCategories,
        });
    }
};
