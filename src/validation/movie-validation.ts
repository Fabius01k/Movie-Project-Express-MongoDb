// import {body} from "express-validator";
// import {userRepository} from "../composition-root";
// import {Request, Response} from "express";
// export const userAdminCreateUpdateValidator = [
//
//     body('name')
//         .isString()
//         .notEmpty()
//         .trim()
//         .isLength({min:1,max:50})
//         .matches(/^[a-zA-Z0-9_-]*$/)
//         .withMessage((value, { req }) => {
//             return `${req.body.name} is not correct`;
//         }),
//
//     body('releaseDate')
//         .isString()
//         .notEmpty()
//         .matches(/^\d{2}\.\d{2}\.\d{4}$/)
//         .withMessage('Release date must be in dd.mm.yyyy format'),
//
//     body('duration')
//         .isString()
//         .notEmpty()
//         .trim()
//         .isLength({min:1,max:20})
//         .withMessage('Field duration is not correct'),
//
//
//     body('ageLimit')
//         .isString()
//         .notEmpty()
//         .trim()
//         .isLength({min:1,max:2})
//         .withMessage('Field age limit is not correct'),
//
//     body('email').isString().notEmpty()
//         .trim()
//         .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
//         .withMessage('email is not correct')
//         .custom(async v => {const user = await userRepository.findUserByLoginOrEmail(v)
//
//             if (user) {throw new Error('Email already use')
//             } else {
//                 return true
//             }
//         }),
//
//     body('password').isString().notEmpty()
//         .trim()
//         .isLength({min:6,max:20})
//         .withMessage('password is not correct'),
// ]