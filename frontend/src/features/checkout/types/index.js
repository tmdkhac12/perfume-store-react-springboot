/**
 * @typedef {Object} CheckoutAddress
 * @property {number} id - Example: 1
 * @property {string} receiver - Example: "Nguyen Van A"
 * @property {string} phoneNumber - Example: "0987654321"
 * @property {string} cityName - Example: "Ho Chi Minh"
 * @property {string} wardName - Example: "Ben Nghe"
 * @property {string} deliveryAddress - Example: "123 Ly Tu Trong"
 */

/**
 * @typedef {Object} CheckoutAddressFormValues
 * @property {string} receiver - Example: "Nguyen Van A"
 * @property {string} phoneNumber - Example: "0987654321"
 * @property {string} cityName - Example: "Ho Chi Minh"
 * @property {string} wardName - Example: "Ben Nghe"
 * @property {string} deliveryAddress - Example: "123 Ly Tu Trong"
 */

/**
 * @typedef {Object} CheckoutSummaryItem
 * @property {string} name - Example: "Bleu de Chanel"
 * @property {string} detail - Example: "EDP • 100ml"
 * @property {string} price - Example: "$3,000,000.00"
 * @property {string} image - Example: "https://.../img.jpg"
 * @property {string} dataAlt - Example: "Perfume product image"
 */

/**
 * @typedef {'Cash' | 'Transfer'} CheckoutPaymentMethod
 */

/**
 * @typedef {Object} CheckoutInvoiceItem
 * @property {number} volumePerfumeId - Example: 10
 * @property {number} quantity - Example: 2
 */

/**
 * @typedef {Object} CheckoutInvoiceRequest
 * @property {number} addressId - Example: 1
 * @property {CheckoutPaymentMethod} paymentMethod - Example: "Cash"
 * @property {CheckoutInvoiceItem[]} items - Example: [{ volumePerfumeId: 10, quantity: 2 }]
 */

/**
 * @typedef {Object} CheckoutInvoiceDetail
 * @property {string} perfumeName - Example: "Bleu de Chanel"
 * @property {number} volumeName - Example: 100
 * @property {number} quantity - Example: 1
 * @property {number} buyPrice - Example: 3000000
 */

/**
 * @typedef {Object} CheckoutInvoiceResponse
 * @property {number} id - Example: 1
 * @property {number} total - Example: 5000000
 * @property {CheckoutInvoiceDetail[]} invoiceDetails - Example: [{ perfumeName: "Bleu de Chanel", volumeName: 100 }]
 */

export { };
