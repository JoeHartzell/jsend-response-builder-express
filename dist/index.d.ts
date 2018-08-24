import { NextFunction, Request, Response } from 'express';
import { IJSendResponseBuilderOptions } from 'jsend-response-builder';
declare module 'express' {
    interface Response {
        jsend: IJSendMiddleware;
    }
}
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
export default function jsend(options?: IJSendResponseBuilderOptions): (req: Request, res: Response, next: NextFunction) => void;
