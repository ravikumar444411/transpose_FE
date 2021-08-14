const baseurl = 'https://backend-api-application.herokuapp.com/'

//Dynamic allocation of backend data to access at any required page

export const loginUrl = `${baseurl}auth/login`
export const getPickup = `${baseurl}pickup/getPickup`
export const postScan = `${baseurl}barcode/scan`
export const getSellers = `${baseurl}sellers/getSellers`
export const getShipments = `${baseurl}shipments/getShipments`
export const getValidate = `${baseurl}barcode/validate`
