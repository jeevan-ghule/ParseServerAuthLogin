const { recoverPersonalSignature } = require('eth-sig-util');
const { bufferToHex } = require('ethereumjs-util');

function validateAuthData(authData, options) {

    console.log("******************** validateAuthData ********")
    console.log(authData)
    console.log(options)
    const msgBufferHex = bufferToHex(Buffer.from(authData.data, 'utf8'));
    const address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: authData.signature,
    });
    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (address.toLowerCase() === authData.id.toLowerCase()) {
        console.log("User match")
        return Promise.resolve()
    } else {
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Metamask auth not found for this user.');
    }
}

function validateAppId(appIds, authData, options) {
    console.log("************ validateAppId ***********")
    console.log(appIds)
    console.log(authData)
    console.log(options)
    return Promise.resolve();;
}

module.exports = {
    validateAppId,
    validateAuthData,
};