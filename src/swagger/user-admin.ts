// USER BY ADMIN SWAGGER TAGS
/**
 * @swagger
 * tags:
 *   name: Users-Admin
 *   description: User`s CRUD Admin
 */

////////////////////////////////////////////////USERS||||||||||||||||||||||||||||||||||||||||||||||||||||||


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

// ALL USER BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/users/get-all-users:
 *  get:
 *   summary: Return users with paging by admin
 *   tags: [Admin]
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


// GET USER BY ID BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/users/{id}:
 *  get:
 *   summary: Return users by id by admin
 *   tags: [Admin]
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


// CREATE USER BY ADMIN
/**
 * @swagger
 * /admin/users/create-user/:
 *  post:
 *   summary: Create new user by admin
 *   tags: [Admin]
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


// UPDATE USER BY ID BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/users/update-user/:
 *  put:
 *   summary: Update existing user by id by admin
 *   tags: [Admin]
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


// DELETE USER BY ID BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/users/delete-user/:
 *  delete:
 *   summary: Delete existing user by id by admin
 *   tags: [Admin]
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


////////////////////////////////////////////////MOVIES||||||||||||||||||||||||||||||||||||||||||||||||||||||


// MOVIE VIEW MODEL FOR ADMIN - COMPONENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     MovieViewModelForAdmin:
 *       type: object
 *       description: The unique identifier of the user
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the user
 *         createdAt:
 *           type: string
 *           description: The creation date of the user
 *         mainData:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the movie
 *             releaseDate:
 *               type: string
 *               format: date-time
 *               description: The date of release the movie
 *             duration:
 *               type: number
 *               description: The duration of the movie
 *             ageLimit:
 *               type: string
 *               description: The age limit of the movie
 *             releaseCountry:
 *               type: string
 *               description: The release country of the movie
 *             categories:
 *               type: array
 *               items:
 *                 type: string
 *               description: The categories of the movie
 *             type:
 *               type: string
 *               description: The type of the movie
 *           required:
 *             - name
 *             - releaseDate
 *             - duration
 *             - ageLimit
 *             - releaseCountry
 *             - categories
 *             - type
 *         actorsAndDirectors:
 *           type: object
 *           properties:
 *             actors:
 *               type: array
 *               items:
 *                 type: string
 *               description: The actors of the movie
 *             directors:
 *               type: array
 *               items:
 *                 type: string
 *               description: The directors of the movie
 *           required:
 *             - actors
 *             - directors
 *         description:
 *           type: object
 *           properties:
 *             shortDescription:
 *               type: string
 *               description: The short description of the movie
 *             fullDescription:
 *               type: string
 *               description: The full description of the movie
 *           required:
 *             - shortDescription
 *             - fullDescription
 *         mainPhotoUrl:
 *           type: string
 *           description: The mainPhotoUrl date of the user
 *       required:
 *         - id
 *         - createdAt
 *         - mainData
 *         - actorsAndDirectors
 *         - description
 *         - mainPhotoUrl
 example:
 id: 1234141
 createdAt: "2022-01-01T12:00:00Z"
 mainData:
 name: "Movie Name"
 releaseDate: "2022-01-01T00:00:00Z"
 duration: 120
 ageLimit: "PG-13"
 releaseCountry: "USA"
 categories: ["Action", "Adventure"]
 type: "Feature Film"
 actorsAndDirectors:
 actors: ["Actor 1", "Actor 2"]
 directors: ["Director 1", "Director 2"]
 description:
 shortDescription: "Short description of the movie"
 fullDescription: "Full description of the movie"
 mainPhotoUrl: "https://example.com/mainPhoto.jpg"
 */

// MOVIE CREATE MODEL BY ADMIN - COMPONENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     MovieCreate:
 *       type: object
 *       description: The unique identifier of the movie
 *       properties:
 *         name:
 *               type: string
 *               description: The name of the user
 *         releaseDate:
 *               type: string
 *               format: date-time
 *               description: The date release of the movie
 *         duration:
 *               type: number
 *               description: The duration of the user
 *         ageLimit:
 *               type: string
 *               description: The age limit of the movie
 *         releaseCountry:
 *               type: string
 *               description: The release country of the movie
 *         categories:
 *               type: array
 *               items:
 *                 type: string
 *               description: The categories of the movie
 *         type:
 *               type: string
 *               description: The type of the movie
 *         actors:
 *               type: array
 *               items:
 *                 type: string
 *               description: The actors of the movie
 *         directors:
 *               type: array
 *               items:
 *                 type: string
 *               description: The directors of the movie
 *         shortDescription:
 *               type: string
 *               description: The short description of the movie
 *         fullDescription:
 *               type: string
 *               description: The full description of the movie
 *         mainPhotoUrl:
 *                type: string
 *                description: The mainPhotoUrl date of the user
 */


// CREATE MOVIE BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/movies/create-movie/:
 *  post:
 *   summary: Create new movie by admin
 *   tags: [Admin]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#components/schemas/MovieCreate'
 *   responses:
 *     201:
 *       description: Return the newly created movie
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/MovieViewModelForAdmin'
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


// UPDATE MOVIE BY ID BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/movies/update-movie/:
 *  put:
 *   summary: Update existing movie by id by admin
 *   tags: [Admin]
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
 *           $ref: '#components/schemas/MovieCreate'
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


// DELETE USER BY ID BY ADMIN RESPONSE
/**
 * @swagger
 * /admin/movies/delete-movie/:
 *  delete:
 *   summary: Delete existing movie by id by admin
 *   tags: [Admin]
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