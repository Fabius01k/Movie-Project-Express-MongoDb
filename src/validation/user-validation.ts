import {body} from "express-validator";
import {userRepository} from "../composition-root";
import {Request, Response} from "express";
export const userAdminCreateUpdateValidator = [

    body('name').isString().notEmpty()
        .trim().isLength({min:3,max:30})
        .matches(/^[a-zA-Z0-9_-]*$/)
        .withMessage((value, { req }) => {
            return `${req.body.name} is not correct`;
        }),

    body('age').isString().notEmpty()
        .trim().isLength({min:1,max:3})
        .withMessage((value, { req }) => {
            return `${req.body.age} is not correct`;
        }),

    body('sex').isString().notEmpty()
        .trim()
        .custom((value, { req }) => {
            if (value !== 'man' && value !== 'woman') {
                throw new Error('Sex must be either "man" or "woman"');
            }
            return true;
        }),

    body('login').isString().notEmpty()
        .trim().isLength({min:3,max:10})
        .matches(/^[a-zA-Z0-9_-]*$/)
        .custom(async v => {const user = await userRepository.findUserByLoginOrEmail(v)

            if (user) {throw new Error(`Login ${v} already use`)
            } else {
                return true
            }
        }),

    body('email').isString().notEmpty()
        .trim()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .custom(async v => {const user = await userRepository.findUserByLoginOrEmail(v)

            if (user) {throw new Error(`Email ${v} already use`)
            } else {
                return true
            }
        }),

    body('password').isString().notEmpty()
        .trim()
        .isLength({min:6,max:20})
        .withMessage('Field password is not correct'),
]