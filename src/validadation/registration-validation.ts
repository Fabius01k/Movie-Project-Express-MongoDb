import {body} from "express-validator";
import {userModel} from "../db/db";



export const registrationCodeValidator = [

    body('code').isString().notEmpty().custom(async (value: string) => {

        const user = await userModel.findOne({"emailConfirmation.confirmationCode": value})

        if(!user) {
            throw new Error('user doesn`t exist');
        }

        if (user && user.emailConfirmation.isConfirmed) {
            throw new Error('user already confirmed');
        }
    })
]

export const emailCodeResendingValidator = [

    body('email').isString().notEmpty().custom(async (value: string) => {

        const user = await userModel.findOne({"accountData.userName.email": value})

        if(!user) {
            throw new Error('user doesn`t exist');
        }

        if (user && user.emailConfirmation.isConfirmed) {
            throw new Error('user already confirmed');
        }
    })
]



