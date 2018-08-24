"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsend_response_builder_1 = require("jsend-response-builder");
/**
 * configures the jsend express middleware
 * @param options options for configuring the jsend middleware
 */
function jsend(options) {
    // the JSendResponseBuilder
    const responseBuilder = new jsend_response_builder_1.default(options);
    return (req, res, next) => {
        res.jsend = {
            /**
             * returns a jsend success response
             * @param data data for the success response
             * @param code the response code (defaults to 200)
             */
            success: (data, code) => {
                // set the code if it exists
                if (code) {
                    res.status(code);
                }
                // send the response
                return res
                    .json(responseBuilder.success(data));
            },
            /**
             * sends a jsend fail response
             * @param data data for the fail response
             * @param code the response code
             */
            fail: (data, code) => {
                // set the code if it exists
                if (code) {
                    res.status(code);
                }
                // send the response
                return res
                    .json(responseBuilder.fail(data));
            },
            /**
             * sends a jsend error response
             * @param message error message
             * @param code the response code
             * @param data additional information about the error (optional)
             */
            error: (message, code, data) => {
                // set the code if it exists
                if (code) {
                    res.status(code);
                }
                // send the response
                return res
                    .json(responseBuilder.error(message, res.statusCode, data));
            },
        };
    };
}
exports.default = jsend;
//# sourceMappingURL=index.js.map