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

