import {validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";

const requestCounts: { [key: string]: { [key: string]: Date[] } } = {}; // Объект для отслеживания количества запросов от каждого IP адреса и URL

export const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip; // Получаем IP адрес из запроса
    const url = req.url; // Получаем URL из запроса

    const currentTime = new Date(); // Текущее время
    const tenSecondsAgo = new Date(currentTime.getTime() - 10000); // Время 10 секунд назад

    // Проверяем, есть ли запись для данного IP адреса и URL
    if (!requestCounts[ip]) {
        requestCounts[ip] = {};
    }

    if (!requestCounts[ip][url]) {
        requestCounts[ip][url] = [];
    }

    // Фильтруем запросы только за последние 10 секунд
    const recentRequests = requestCounts[ip][url].filter((timestamp) => timestamp > tenSecondsAgo);

    // Если количество запросов больше 5, возвращаем статус 429
    if (recentRequests.length > 5) {
        return res.status(429).send('Too Many Requests');
    }

    // Добавляем текущий момент времени в массив запросов
    requestCounts[ip][url].push(currentTime);

    next();
};

