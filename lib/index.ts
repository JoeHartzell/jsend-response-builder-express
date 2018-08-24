import { NextFunction, Request, Response } from 'express';
import JSendResponseBuilder, { IJSendResponseBuilderOptions } from 'jsend-response-builder';

/* tslint:disable:interface-name */
// this is to add the jsend property to the express Response object
declare module 'express' {
    interface Response {
        jsend: IJSendMiddleware;
    }
}
/* tslint:enable:interface-name */

/**
 * interface that defines the structure of the JSend middleware
 */
export interface IJSendMiddleware {
    success: <T>(data: T, code?: number) => void;
    fail: <T>(data: T, code?: number) => void;
    error: <T = null>(message: string, code?: number, data?: T) => void;
}

/**
 * configures the jsend express middleware
 * @param options options for configuring the jsend middleware
 */
export default function jsend(options?: IJSendResponseBuilderOptions) {
    // the JSendResponseBuilder
    const responseBuilder = new JSendResponseBuilder(options);

    return (req: Request, res: Response, next: NextFunction) => {
        res.jsend = {
            /**
             * returns a jsend success response
             * @param data data for the success response
             * @param code the response code (defaults to 200)
             */
            success: <T>(data: T, code?: number) => {
                // set the code if it exists
                if (code) {
                    res.status(code);
                }

                // send the response
                return res
                    .json(
                        responseBuilder.success(data),
                    );
            },

            /**
             * sends a jsend fail response
             * @param data data for the fail response
             * @param code the response code
             */
            fail: <T>(data: T, code?: number) => {
                // set the code if it exists
                if (code) {
                    res.status(code);
                }

                // send the response
                return res
                    .json(
                        responseBuilder.fail(data),
                    );
            },

            /**
             * sends a jsend error response
             * @param message error message
             * @param code the response code
             * @param data additional information about the error (optional)
             */
            error: <T = null>(message: string, code?: number, data?: T) => {
                // set the code if it exists
                if (code) {
                    res.status(code);
                }

                // send the response
                return res
                    .json(
                        responseBuilder.error(message, res.statusCode, data),
                    );
            },
        };
    };
}

