import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ValidationError } from "joi";

import { throwError } from "../../utilities/errorHandlers";
import { errorTypes } from "../../utilities/errorHandlers/enums";
function checkErrors<T>(error: ValidationError | undefined, value: T) {
    throwError(
        {
            type: errorTypes.GENERAL_ERROR_INVERSE,
            message: "Validation Error. The value(s) is/are either invalid or missing",
            statusCode: 401,
            data: { error, value }
        },
        error
    );
}
export function checkForParameters(request: Request, response: Response, next: NextFunction) {
    const parametersSchema: Joi.StringSchema = Joi.string().length(24).required();
    const { error, value } = parametersSchema.validate(request.params._id);
    checkErrors<typeof value>(error, value);
    next();
}
export function checkSaveRequestBody(request: Request, response: Response, next: NextFunction) {
    const saveRequestBodySchema = Joi.object({
        message: Joi.string().required()
    });
    const { error, value } = saveRequestBodySchema.validate(request.body);
    checkErrors<typeof value>(error, value);
    next();
}
export function checkUpdateRequestBody(request: Request, response: Response, next: NextFunction) {
    const updateRequestBodySchema = Joi.object({
        _id: Joi.string().length(24).required(),
        message: Joi.string().required()
    });
    const { error, value } = updateRequestBodySchema.validate(request.body);
    checkErrors(error, value);
    next();
}
