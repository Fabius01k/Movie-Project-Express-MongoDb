import {Router} from "express";
import {adminController} from "../../composition-root";
import {userAdminCreateUpdateValidator } from "../../validation/user-validation";
import {inputValidationMiddleware} from "../../middlewares/input-validation-middleware";
import {basicAuthorizationMiddleware} from "../../middlewares/basic-authorization-middleware";


export const adminRouter = Router({})

// USER BY ADMIN SWAGGER TAGS
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User`s CRUD Admin
 */


// USER BY ADMIN FIND COMPONENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       description: The unique identifier of the user
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the user
 *         createdAt:
 *           type: string
 *           description: The creation date of the user
 *         accountData:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the user
 *             age:
 *               type: string
 *               description: The age of the user
 *             sex:
 *               type: string
 *               description: The sex of the user
 *             login:
 *               type: string
 *               description: The login of the user
 *             email:
 *               type: string
 *               description: The email of the user
 *           required:
 *             - name
 *             - age
 *             - sex
 *             - login
 *             - email
 *         passwordData:
 *           type: object
 *           properties:
 *             passwordHash:
 *               type: string
 *               description: The hashed password of the user
 *             passwordSalt:
 *               type: string
 *               description: The salt used for password hashing
 *           required:
 *             - passwordHash
 *             - passwordSalt
 *         emailConfirmationData:
 *           type: object
 *           properties:
 *             confirmationCode:
 *               type: string
 *               description: The confirmation code for email verification
 *             expirationDate:
 *               type: string
 *               format: date-time
 *               description: The expiration date for email confirmation code
 *             isConfirmed:
 *               type: boolean
 *               description: Indicates if the email is confirmed
 *           required:
 *             - confirmationCode
 *             - expirationDate
 *             - isConfirmed
 *         passwordUpdateData:
 *           type: object
 *           properties:
 *             resetPasswordCode:
 *               type: string
 *               default: null
 *               description: The code used for resetting the password
 *             expirationDatePasswordCode:
 *               type: string
 *               format: date-time
 *               default: null
 *               description: The expiration date for password reset code
 *         userTags:
 *           type: array
 *           items:
 *             type: string
 *           default: []
 *       required:
 *         - id
 *         - createdAt
 *         - accountData
 *         - passwordData
 *         - emailConfirmationData
 *         - passwordUpdateData
 *         - userTags
 example:
 id: 1234141
 createdAt: "2022-01-01T12:00:00Z"
 accountData:
 name: "John Doe"
 age: "30"
 sex: "Male"
 login: "johndoe123"
 email: "johndoe@example.com"
 passwordData:
 passwordHash: "hashedPassword123"
 passwordSalt: "randomSalt123"
 emailConfirmationData:
 confirmationCode: "confirmationCode123"
 expirationDate: "2022-01-02T12:00:00Z"
 isConfirmed: false
 passwordUpdateData:
 resetPasswordCode: null
 expirationDatePasswordCode: null
 userTags: ["tag1", "tag2"]
 */
// ALL USER BY ADMIN SWAGGER RESPONSE
/**
 * @swagger
 * /admin/users/get-all-users:
 *  get:
 *   summary: Return users with paging by admin
 *   tags: [Users]
 *   parameters:
 *     - in: query
 *       name: searchNameTerm
 *       schema:
 *         type: string
 *         default: null
 *         description: test
 *     - in: query
 *       name: searchAgeTerm
 *       schema:
 *         type: string
 *         default: null
 *     - in: query
 *       name: searchLoginTerm
 *       schema:
 *         type: string
 *         default: null
 *     - in: query
 *       name: searchEmailTerm
 *       schema:
 *         type: string
 *         default: null
 *     - in: query
 *       name: sortBy
 *       schema:
 *         type: string
 *         default: createdAt
 *     - in: query
 *       name: sortDirection
 *       schema:
 *         type: string
 *         default: desc
 *         enum:
 *           - asc
 *           - desc
 *     - in: query
 *       name: pageNumber
 *       schema:
 *         type: integer($int32)
 *         default: 1
 *     - in: query
 *       name: pageSize
 *       schema:
 *         type: integer($int32)
 *         default: 10
 *   responses:
 *     200:
 *       description:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#components/schemas/User'
 */

adminRouter.get('users/get-all-users',basicAuthorizationMiddleware,
    adminController.getAllUsers.bind(adminController))

// GET USER BY ID BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/users/{id}:
 *  get:
 *   summary: Return users by id by admin
 *   tags: [Users]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description:
 *   responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#components/schemas/User'
 *     404:
 *       description: Not Found
 */

adminRouter.get('users/:id', basicAuthorizationMiddleware,
    adminController.getUserById.bind(adminController))

// USER BY ADMIN CREATE COMPONENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreate:
 *       type: object
 *       description: The unique identifier of the user
 *       properties:
 *         name:
 *               type: string
 *               description: The name of the user
 *         age:
 *               type: string
 *               description: The age of the user
 *         sex:
 *               type: string
 *               description: The sex of the user
 *         login:
 *               type: string
 *               description: The login of the user
 *         email:
 *               type: string
 *               description: The email of the user
 example:
 id: 1234141
 createdAt: "2022-01-01T12:00:00Z"
 accountData:
 name: "John Doe"
 age: "30"
 sex: "Male"
 login: "johndoe123"
 email: "johndoe@example.com"
 */
// CREATE USER BY ADMIN
/**
 * @swagger
 * /admin/users/create-user/:
 *  post:
 *   summary: Create new user by admin
 *   tags: [Users]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/UserCreate'
 *   responses:
 *     201:
 *       description: Return the newly created user
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/User'
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
 */

adminRouter.post('users/create-user',basicAuthorizationMiddleware,userAdminCreateUpdateValidator,
    inputValidationMiddleware,
    adminController.createUser.bind(adminController))

adminRouter.post('/create-movie',
    adminController.createMovie.bind(adminController))

// UPDATE USER BY ID BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/users/update-user/:
 *  put:
 *   summary: Update existing user by id by admin
 *   tags: [Users]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description:
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/UserCreate'
 *   responses:
 *     204:
 *       description: No content
 *     404:
 *       description: Not found
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
 */

adminRouter.put('users/update-user',basicAuthorizationMiddleware,userAdminCreateUpdateValidator,
    inputValidationMiddleware,
    adminController.updateUser.bind(adminController))

adminRouter.put('update-movie',basicAuthorizationMiddleware,
    adminController.updateMovie.bind(adminController))

// DELETE USER BY ID BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/users/delete-user/:
 *  delete:
 *   summary: Delete existing user by id by admin
 *   tags: [Users]
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description:
 *   responses:
 *     204:
 *       description: No content
 *     404:
 *       description: Not found
 */
adminRouter.delete('users/delete-user',basicAuthorizationMiddleware,
    adminController.deleteUser.bind(adminController))

adminRouter.delete('delete-movie',basicAuthorizationMiddleware,
    adminController.deleteMovie.bind(adminController))

