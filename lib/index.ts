import * as e from 'express';
import JSendResponseBuilder, { IJSendResponseBuilderOptions } from 'jsend-response-builder';

// this extends the response interface to include the new jsend property
/* tslint:disable:interface-name */
declare global {
    namespace Express {
        interface Response {
            jsend: JSendMiddleware;
        }
    }
}
/* tslint:enable:interface-name */

/**
 * @class JSendMiddleware
 * @summary middleware for sending jsend formatted responses
 */
class JSendMiddleware {
    /**
     * the express response
     */
    private response: e.Response;

    /**
     * the jsend response builder instance
     */
    private responseBuilder: JSendResponseBuilder;

    /**
     * @constructor
     * @summary creates a new instance of jsend middleware
     * @param response express response
     * @param responseBuilder jsend response builder
     */
    constructor(response: e.Response, responseBuilder: JSendResponseBuilder) {
        this.response = response;
        this.responseBuilder = responseBuilder;
    }

    /**
     * @summary sends a jsend success response
     * @param data data for the success response
     * @param code response code (optional)
     */
    public success<T>(data: T, code?: number): e.Response {
        this.setStatus(code);

        // send the response
        return this.response.json(
            this.responseBuilder.success(data),
        );
    }

    /**
     * @summary sends a jsend fail response
     * @param data failure description data
     * @param code response code (optional)
     */
    public fail<T>(data: T, code?: number): e.Response {
        this.setStatus(code);

        // send the response
        return this.response.json(
            this.responseBuilder.fail(data),
        );
    }

    /**
     * @summary sends a jsend error response
     * @param message error message
     * @param code response code (optional)
     * @param data additional error data (optional)
     */
    public error<T = null>(message: string, code?: number, data?: T): e.Response {
        this.setStatus(code);

        // send the response
        return this.response.json(
            this.responseBuilder.error(message, this.response.statusCode, data),
        );
    }

    /**
     * @summary sets a response status code if it exists
     * @param res express response
     * @param code status code
     */
    private setStatus(code?: number) {
        if (code) {
            this.response.status(code);
        }
    }
}

/**
 * @summary configures the jsend express middleware
 * @param options options for configuring the jsend middleware
 */
export default function jsend(options?: IJSendResponseBuilderOptions): e.RequestHandler {
    // the JSendResponseBuilder
    const responseBuilder = new JSendResponseBuilder(options);

    return (req: e.Request, res: e.Response, next: e.NextFunction) => {
        res.jsend = new JSendMiddleware(res, responseBuilder);
        return next();
    };
}

