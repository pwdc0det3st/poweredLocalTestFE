const Request = require('../../helper/requestHelper'),
      prospectUrls = require('./res');

export default {
    submit : async function(prospect) {
        return await Request.default.requestWithBody(
            `${prospectUrls.rootUrl}/${prospectUrls.signUpUrl}`,
            prospectUrls.signUpMethod,
            prospect
        );
    }
}

