//// REGISTRATION BODY COMPONENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     RegistrationBody:
 *       type: object
 *       description: The unique identifier of the user
 *       properties:
 *         login:
 *           type: string
 *           description: The login of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 example:
 login: "string"
 password: "123456"
 email: "johndoe@example.com"
 */


///////////////////////////////////// REGISTRATION-CONFIRMATION BODY COMPONENTS ////////////////////////////////////
/**
 * @swagger
 * components:
 *   schemas:
 *     RegistrationConfirmationBody:
 *       type: object
 *       description: Code that be sent via Email inside link
 *       properties:
 *         code:
 *           type: string
 *           description: Code that be sent via Email inside link
 example:
 code: "string"
 */



///////////////////////////////////// REGISTRATION-EMAIL-RESENDING BODY COMPONENTS ////////////////////////////////
/**
 * @swagger
 * components:
 *   schemas:
 *     RegistrationEmailResendingBody:
 *       type: object
 *       description: Email of already registered but not confirmed user
 *       properties:
 *         email:
 *           type: string
 *           description: Email of already registered but not confirmed user
 example:
 email: "string"
 */

///////////////////////////////////// NEW PASSWORD BODY COMPONENTS ///////////////////////////////////////////////
/**
 * @swagger
 * components:
 *   schemas:
 *     NewPasswordBody:
 *       type: object
 *       description: Email of already registered but not confirmed user
 *       properties:
 *         newPassword:
 *           type: string
 *           description: New password
 *         recoveryCode:
 *           type: string
 *           description: New password
 example:
 newPassword: "string"
 recoveryCode: "string"
 */

///////////////////////////////////// REGISTRATION RESPONSE /////////////////////////////////////////////////////
/**
 * @swagger
 * /register/registration:
 *  post:
 *   summary: Registration in the system
 *   tags: [Registration]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/RegistrationBody'
 *   responses:
 *     204:
 *       description: Input data is accepted. Email with confirmation code will be send to passed email address
 *     400:
 *       description: If the inputModel has incorrect values
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errorsMessages:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                      field:
 *                        type: string
 *     429:
 *       description: More than 5 attempts from one IP-address during 10 seconds
 */

//////////////////////////////////// REGISTRATION CONFIRMATION RESPONSE ////////////////////////////////////////
/**
 * @swagger
 * /register/registration-confirmation:
 *  post:
 *   summary: Confirm registration
 *   tags: [Registration]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/RegistrationConfirmationBody'
 *   responses:
 *     204:
 *       description: Email was verified. Account was activated
 *     400:
 *       description: If the inputModel has incorrect values
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errorsMessages:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                      field:
 *                        type: string
 *     429:
 *       description: More than 5 attempts from one IP-address during 10 seconds
 */

//////////////////////////////////// REGISTRATION EMAIL_RESENDING RESPONSE /////////////////////////////////////
/**
 * @swagger
 * /register/registration-email-resending:
 *  post:
 *   summary: Resending confirmation registration code
 *   tags: [Registration]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/RegistrationEmailResendingBody'
 *   responses:
 *     204:
 *       description: Input data is accepted.Email with confirmation code will send to passed email address.Confirmation code should be inside link as query param
 *     400:
 *       description: If the inputModel has incorrect values
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errorsMessages:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                      field:
 *                        type: string
 *     429:
 *       description: More than 5 attempts from one IP-address during 10 seconds
 */

//////////////////////////////////// PASSWORD RECOVERY USER RESPONSE ///////////////////////////////////////////
/**
 * @swagger
 * /register/password-recovery:
 *  post:
 *   summary: Password recovery. Email should send with recovery code inside
 *   tags: [Registration]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/RegistrationEmailResendingBody'
 *   responses:
 *     204:
 *       description: Even if current email is not registered (for prevent user's email detection)
 *     400:
 *       description: If the inputModel has invalid email
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errorsMessages:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                      field:
 *                        type: string
 *     429:
 *       description: More than 5 attempts from one IP-address during 10 seconds
 */

//////////////////////////////////// NEW PASSWORD RESPONSE ////////////////////////////////////////////////////
/**
 * @swagger
 * /register/new-password:
 *  post:
 *   summary: Confirm password recovery
 *   tags: [Registration]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/NewPasswordBody'
 *   responses:
 *     204:
 *       description: If code is valid and new password is accepted
 *     400:
 *       description: If the inputModel has incorrect value (for incorrect password length) or RecoveryCode is incorrect or expired
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                errorsMessages:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                      field:
 *                        type: string
 *     429:
 *       description: More than 5 attempts from one IP-address during 10 seconds
 */