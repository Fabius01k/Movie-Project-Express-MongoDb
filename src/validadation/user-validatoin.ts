import {body} from "express-validator";

export const userCreateValidators = [

    body('login').isString().notEmpty().
        trim().isLength({min:3,max:30})
        .matches(/^[a-zA-Z0-9_-]*$/)
        .withMessage('login is not correct'),

    body('password').isString().notEmpty().
    trim().isLength({min:6,max:20})
        .withMessage('password is not correct'),

    body('email').isString().notEmpty().
    trim().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .withMessage('email is not correct'),
]