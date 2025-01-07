import { APIError } from "./errorHandler.js";

export const urlVersioning = (version) => (req, res, next) => {
    if (req.url.includes(`/api/${version}`)) {
        next();
    } else {
        next(new APIError('Invalid API version', 400));
    }
}

export const headerVersioning = (version) => (req, res, next) => {
    if (req.get('Accept-Version') === version) {
        next();
    } else {
        next(new APIError('Invalid API version', 400));
    }
}

export const contentTypeVersioning = (version) => (req, res, next) => {
    if (req.get('Content-Type') === `application/vnd.api.${version}+json`) {
        next();
    } else {
        next(new APIError('Invalid API version', 400));
    }
}