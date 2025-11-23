import {loaderStore} from './loaderStore';

export {Loader} from './Loader';
export const showLoader = loaderStore.getState().show;
export const hideLoader = loaderStore.getState().hide;
