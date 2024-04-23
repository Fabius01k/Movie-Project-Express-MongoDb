//// ME INFORMATION FIND COMPONENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     MeInformation:
 *       type: object
 *       description: The unique identifier of the user
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the user
 *         userName:
 *           type: string
 *           description: The username of the user
 *         age:
 *           type: string
 *           description: The age of the user
 *         sex:
 *           type: string
 *           description: The sex of the user
 *         login:
 *           type: string
 *           description: The login of the user
 *         email:
 *           type: string
 *           description: The email of the user
 example:
 id: 1234141
 userName: "John Doe"
 age: "30"
 sex: "Male"
 login: "johndoe123"
 email: "johndoe@example.com"
 */

//// LOGIN BODY COMPONENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       description: The unique identifier of the user
 *       properties:
 *         loginOrEmail:
 *           type: string
 *           description: The login or email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 example:
 loginOrEmail: "johndoe@example.com"
 password: "123456"
 */

//// ACCESS TOKEN COMPONENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     AccessToken:
 *       type: object
 *       description: The unique identifier of the user
 *       properties:
 *         accessToken:
 *           type: string
 *           description: JWT access token
 example:
 accessToken: "string"
 */



// GET INFORMATION ABOUT ME RESPONSE
/**
 * @swagger
 * /authentication/me:
 *  get:
 *   summary: Get information about current user
 *   tags: [Authentication]
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#components/schemas/MeInformation'
 *     401:
 *       description: Unauthorized
 */

// LOGIN USER RESPONSE
/**
 * @swagger
 * /authentication/login:
 *  post:
 *   summary: Try login user to the system
 *   tags: [Authentication]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/LoginBody'
 *   responses:
 *     200:
 *       description: Returns JWT accessToken in body and JWT refreshToken in cookie
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/AccessToken'
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
 *     401:
 *       description: If the password or login is wrong
 *     429:
 *       description: More than 5 attempts from one IP-address during 10 seconds
 */

// LOGOUT USER RESPONSE
/**
 * @swagger
 * /authentication/logout:
 *  post:
 *   summary: Logout user from the system, in cookie must be refreshToken
 *   tags: [Authentication]
 *   responses:
 *     204:
 *       description: No Content
 *     401:
 *       description: If the JWT refreshToken inside cookie is missing, expired or incorrect
 */

// REFRESH TOKEN CREATE RESPONSE
/**
 * @swagger
 * /authentication/refresh-token:
 *  post:
 *   summary: Generate new a pair of access and refresh tokens, in cookie must be refreshToken
 *   tags: [Authentication]
 *   responses:
 *     200:
 *       description: Returns JWT accessToken in body and JWT refreshToken in cookie
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/AccessToken'
 *     401:
 *       description: If the JWT refreshToken inside cookie is missing, expired or incorrect
 */

