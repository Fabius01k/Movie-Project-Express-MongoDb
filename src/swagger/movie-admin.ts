// MOVIE BY ADMIN SWAGGER TAGS
/**
 * @swagger
 * tags:
 *   name: Movie-Admin
 *   description: Movie`s CRUD Admin
 */

// MOVIE BY ADMIN FIND COMPONENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     MovieFind:
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
 *               type: Date
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
 *               format: date-time
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


// ALL USER BY ADMIN RESPONSE
/**
 * @swagger
 * /movies/get-all-movies:
 *  get:
 *   summary: Return movies with paging by admin
 *   tags: [Movie]
 *   parameters:
 *     - in: query
 *       name: searchNameTerm
 *       schema:
 *         type: string
 *         default: null
 *     - in: query
 *       name: searchReleaseDateTerm
 *       schema:
 *         type: string
 *         default: null
 *     - in: query
 *       name: searchDurationTerm
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
 *               $ref: '#components/schemas/MovieFind'
 */

