"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3000;
const db = {
    videos: [
        {
            "id": 123,
            "title": "string",
            "author": "string",
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": "2023-04-01T13:28:23.888Z",
            "publicationDate": "2023-04-01T13:28:23.888Z",
            "availableResolutions": [
                "P144"
            ]
        }
    ]
};
// get all videos
exports.app.get('/videos', (req, res) => {
    res.status(200).send(db.videos);
});
//create new video
exports.app.post('/videos', (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const availableResolutions = req.body.availableResolutions;
    const errors = [];
    const valueAvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160", null];
    if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
        errors.push({
            message: "invalid title",
            field: "title"
        });
    }
    if (!author || typeof author !== 'string' || !author.trim() || author.length > 20) {
        errors.push({
            message: "invalid title",
            field: "author"
        });
    }
    if (!valueAvailableResolutions.includes(availableResolutions)) {
        errors.push({
            message: "invalid title",
            field: "availableResolutions"
        });
    }
    if (errors.length > 0) {
        return res.status(400).send({ errorsMessages: errors });
    }
    const dateNow = new Date();
    const newVideo = {
        id: +dateNow,
        title: title,
        author: author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: dateNow.toISOString(),
        publicationDate: new Date(+dateNow + (1000 * 60 * 60 * 24)).toISOString(),
        availableResolutions: availableResolutions
    };
    db.videos.push(newVideo);
    res.status(200).send(newVideo);
});
exports.app.listen(port, () => {
    const string = '    ';
    console.log(string, ' original');
    console.log(string.trim(), 'trimmed');
    console.log(!string.trim());
    console.log(`Example app listening on port ${port}`);
});
