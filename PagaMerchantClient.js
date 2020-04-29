const axios = require('axios')
const sha512 = require('js-sha512').sha512;

function PagaMerchantClient(build){

    this.principal = build.clientId;
    this.password = build.password;
    this.hash = build.apiKey;
    this.test = build.test;

	const test_server = "https://beta.";
	const live_server = "https://www.";
	const service_url = "mypaga.com/paga-webservices/merchant-rest/";

    this.buildRequest = (uri, hash, request) => {
        return axios({
            method: 'post',
            url: uri,
            headers: {'content-type': 'application/json',
                      'Accept': 'application/json',
                      'principal' : this.principal,
                      'credentials': this.password,
                      'hash': hash
                      },

            data: request,

            timeout: 120000,
      
          });
    }

    this.createHashSHA512 = (message, iterations, returnHex) => {

        var hash = sha512.create()
        hash.update(message)

        var byteTemp = hash.digest();
        var digest;

        for (var i = 1; i < iterations; i++){
            byteTemp = hash.digest();
            hash.update(byteTemp);
        }

        if (iterations == 1){
            digest = hash.digest(message);
        }else{
            digest = hash.digest(byteTemp);
        }

        if (returnHex){
            return hash.hex(digest);
        }else{
            return digest;
        }

    }

 /**
     * This service allows the merchant to verify the status and details of an executed process or
     * to determine if a transaction was indeed executed on the system using the pre-shared transaction reference number.
     * The transaction reference number used is unique across the platform,
     * so merchant aggregators checking for transaction status across multiple users should use this method.
     *
     * @param  {string} referenceNumber The unique transaction code returned as part of a previously executed transaction
     *
     *  @return {Promise}                         A Promise Object thats receives the response
    *       
 */
    this.getTransactionDetails = async(referenceNumber) => {

        var server = (this.test) ? test_server : live_server;

        var obj = {
            "referenceNumber":referenceNumber
        }

        var sBuilder = []
        sBuilder.push(referenceNumber + this.hash)
        sBuilder.join("")

        var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

        var response
        try {
            response = await this.buildRequest(server + service_url + "secured/getTransactionDetails", hashString, obj)
        } catch (error) {
            response = {
                "errorCode" : -1,
                "exception" : error,
            }
        } finally {
            return response;
        }

    }

  /**
     * This service allows the merchant to verify the status and details of an executed process or
     * to determine if a transaction was indeed executed on the system using the pre-shared transaction invoice number.
     * The invoice number used is unique across the platform,
     * so merchant aggregators checking for transactions status across multiple users should use this method.
     *
     * @param {string} invoiceNumber The invoice number returned as part of a previously executed transaction
     *
     *  @return {Promise}                         A Promise Object thats receives the response
     */

    this.getTransactionDetailsByInvoiceNumber = async(invoiceNumber) => {

        var server = (this.test) ? test_server : live_server;

        var obj = {
            "invoiceNumber":invoiceNumber
        }

        var sBuilder = []
        sBuilder.push(invoiceNumber + this.hash)
        sBuilder.join("")

        var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

        var response
        try {
            response = await this.buildRequest(server + service_url + "secured/getTransactionDetailsByInvoiceNumber", hashString, obj)
        } catch (error) {
            response = {
                "errorCode" : -1,
                "exception" : error,
            }
        } finally {
            return response;
        }

    }

    /**
     * \This service allows the merchant to verify the status and details of an executed process or
     * to determine if a process was indeed executed on the system using the pre-shared process code.
     * The process code used is unique per merchant ,
     * so merchant aggregators checking for transactions status across multiple users should use the getTransactionDetails method.
     * @param {string} processCode The process code returned as part of a previously executed transaction
     *
     *   @return {Promise}                         A Promise Object thats receives the response
     */

    this.getProcessDetails = async(processCode) => {

        var server = (this.test) ? test_server : live_server;

        var obj = {
            "processCode":processCode
        }

        var sBuilder = []
        sBuilder.push(processCode + this.hash)
        sBuilder.join("")

        var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

        var response
        try {
            response = await this.buildRequest(server + service_url + "secured/getProcessDetails", hashString, obj)
        } catch (error) {
            response = {
                "errorCode" : -1,
                "exception" : error,
            }
        } finally {
            return response;
        }



    }

     /**
     * This service provides the mechanism for Merchant to retrieve reconciled reports,
     * on the date range provided containing list of processes and transactions.
     * @param {Date} periodStartDateTimeUTC The datetime period for the reconciliation report to start
     * @param {Date} periodEndDateTimeUTC The datetime period for the reconciliation report ends
     *
     * @return {Promise}                         A Promise Object thats receives the response
     */

    this.reconciliationReport = async(periodStartDateTimeUTC, periodEndDateTimeUTC) => {

        var server = (this.test) ? test_server : live_server;

        var obj = {
            "periodStartDateTimeUTC":periodStartDateTimeUTC,
            "periodEndDateTimeUTC":periodEndDateTimeUTC
        }

        var sBuilder = []
        sBuilder.push(periodEndDateTimeUTC + periodStartDateTimeUTC + this.hash)
        sBuilder.join("")

        var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

        var response
        try {
            response = await this.buildRequest(server + service_url + "secured/reconciliationReport", hashString, obj)
        } catch (error) {
            response = {
                "errorCode" : -1,
                "exception" : error,
            }
        } finally {
            return response;
        }
    }

       /**
     * This service provides the mechanism to determine the exchange rate , of the majority of currencies.
     * an exchange rate, of the majority of currencies
     * @param {String} baseCurrency the originating currency code
     * @param {string} foreignCurrency the currency code we want to get the exchange rate for.
     * 
     * @return {Promise}  A Promise Object thats receives the response
     */
    this.getForeignExchangeRate = async (baseCurrency, foreignCurrency) => {

        var server = (this.test) ? test_server : live_server;

        var obj = {
            "baseCurrency":baseCurrency,
            "foreignCurrency":foreignCurrency
        }

        var sBuilder = []
        sBuilder.push(baseCurrency + foreignCurrency + this.hash)
        sBuilder.join("")

        var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

        var response
        try {
            response = await this.buildRequest(server + service_url + "secured/getForeignExchangeRate", hashString, obj)
        } catch (error) {
            response = {
                "errorCode" : -1,
                "exception" : error,
            }
        } finally {
            return response;
        }
    }

    /**
     * This service allows merchants to fully or partially refund bill payment previously made to them by a customer.
     * The refund specified may be in full or a partial amount. Full refunds may include or exclude customer fee.
     * @param {String} referenceNumber The unique reference number provided as part of the original transaction which identifies the transaction to be refunded.
     * @param {Boolean} includesCustomerFee Indicates whether the refund includes the customer fee (true) or not (false)
     * @param {Boolean} fullRefund Indicates whether the refund is full or partial
     * @param {String} refundAmount Only provided for a partial refund, this indicates the amount to be refunded.
     * @param {String} currencyCode The currency used in the transaction.
     * @param {String} reason Human readable reason for refund
     * @param {String} customerPhoneNumber The phone number of the customer that performed the operation
     * 
     * @return {Promise}  A Promise Object thats receives the response
     */
    this.refundBillPay = async (referenceNumber, includesCustomerFee, fullRefund, refundAmount, currencyCode, reason, customerPhoneNumber) => {

        var server = (this.test) ? test_server : live_server;

        var obj = {
            "referenceNumber":referenceNumber,
            "includesCustomerFee":includesCustomerFee,
            "fullRefund":fullRefund,
            "refundAmount":refundAmount,
            "currency":currencyCode,
            "reason":reason,
            "customerPhoneNumber":customerPhoneNumber
        }

        var sBuilder = []
        sBuilder.push(referenceNumber + refundAmount + customerPhoneNumber + this.hash)
        sBuilder.join("")

        var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();

        var response
        try {
            response = await this.buildRequest(server + service_url + "secured/refundBillPay", hashString, obj)
        } catch (error) {
            response = {
                "errorCode" : -1,
                "exception" : error,
            }
        } finally {
            return response;
        }

    }


     /**
      * This service allows the merchant to verify the status and details of an executed transaction or to determine if a transaction was indeed executed on the system using the merchant reference number.
     * @param {String} merchantReference The Merchant unique transaction code used as part of a previously executed transaction
     * 
     * @return {Promise}  A Promise Object thats receives the response
     */
    this.getTransactionDetailsByMerchantReferenceNumber = async (merchantReference) => {
        var server = (this.test) ? test_server : live_server;
        var obj = {
            "merchantReference":merchantReference
        }
        var sBuilder = []; 
        sBuilder.push(merchantReference + this.hash);
        sBuilder.join("");
        
        var hashString = this.createHashSHA512(sBuilder.toString(), 1, true).toString();
        var response;
        try {
            response = await this.buildRequest(server + service_url + "secured/getTransactionDetailsByMerchantReference", hashString, obj);
        } catch (error) {
            response = {
                "errorCode" : -1,
                "exception" : error
            }
        }
        finally {
            return response;
        }
    }

}

PagaMerchantClient.Builder = () => {
    class Builder {
        setPrincipal(clientId) {
           this.clientId = clientId;
           return this;
        }
        setCredential(password){
           this.password = password;
           return this;
        }
        setApiKey(apiKey){
           this.apiKey = apiKey;
           return this;
        }
        setIsTest(test){
           this.test = test
           return this
        }
        build() {
           return new PagaMerchantClient(this);
        }
     }
     return new Builder();
}

module.exports = PagaMerchantClient