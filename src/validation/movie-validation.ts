import {body} from "express-validator";
import {userRepository} from "../composition-root";
import {Request, Response} from "express";
export const movieAdminCreateUpdateValidator = [

    body('name')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:1,max:50})
        .matches(/^[a-zA-Z0-9_-]*$/)
        .withMessage((value, { req }) => {
            return `${req.body.name} is not correct`;
        }),

    body('releaseDate')
        .custom((value, { req }) => {
            const releaseDate = new Date(value);
            if (!(releaseDate instanceof Date) || isNaN(releaseDate.getTime())) {
                throw new Error('Release date must be a valid Date object');
            }
            return true;
        })
        .withMessage('Release date must be a valid Date object'),

    body('duration')
        .notEmpty()
        .trim()
        .isNumeric().withMessage('Duration must be a number')
        .isInt({ max: 400 }).withMessage('Duration must not exceed 400'),


    body('ageLimit')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:2,max:3})
        .custom((value) => {
            const validAgeLimits = ['0+', '6+', '12+', '16+', '18+'];
            if (!validAgeLimits.includes(value)) {
                throw new Error('Age limit must be 0+, 6+, 12+, 16+ or 18+');
            }
            return true;
        })
        .withMessage('Field age limit is not correct'),

    body('releaseCountry')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:1,max:30})
        .withMessage('Field release country is not correct'),

    body('categories')
        .isArray({ min: 1 })
        .custom((value) => {
            if (Array.isArray(value)) {
                for (let country of value) {
                    if (typeof country !== 'string' || country.length < 1 || country.length > 30) {
                        throw new Error('Field release country is not correct');
                    }
                }
                return true;
            } else {
                throw new Error('Field release country is not an array');
            }
        }),

    body('type')
        .isString()
        .notEmpty()
        .trim()
        .custom((value) => {
            const validAgeLimits = ['movie', 'cartoon', 'serial'];
            if (!validAgeLimits.includes(value)) {
                throw new Error('Age limit must be movie, cartoon or serial');
            }
            return true;
        })
        .withMessage('Field type is not correct'),

    body('actors')
        .isArray({ min: 1 })
        .custom((value) => {
            if (Array.isArray(value)) {
                for (let country of value) {
                    if (typeof country !== 'string' || country.length < 1 || country.length > 30) {
                        throw new Error('Field actors is not correct');
                    }
                }
                return true;
            } else {
                throw new Error('Field actors is not an array');
            }
        }),

    body('directors')
        .isArray({ min: 1 })
        .custom((value) => {
            if (Array.isArray(value)) {
                for (let country of value) {
                    if (typeof country !== 'string' || country.length < 1 || country.length > 30) {
                        throw new Error('Field directors is not correct');
                    }
                }
                return true;
            } else {
                throw new Error('Field directors is not an array');
            }
        }),

    body('shortDescription')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:1,max:200})
        .withMessage('Field shortDescription is not correct'),

    body('fullDescription')
        .isString()
        .notEmpty()
        .trim()
        .isLength({min:1,max:1000})
        .withMessage('Field shortDescription is not correct'),
]