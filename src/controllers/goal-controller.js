import * as goalService from './../services/goal-service.js';

import { setResponse1, setErrorResponse } from './response-handler.js';

// Fetch all goals
export const index = async (request, response) => {
    try {
        const params = {...request.query};
        const goals = await goalService.search(params);
        setResponse1(200, goals, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}

// Fetch all goals by user ID
export const getByUserId = async (request, response) => {
    try {
        const userId = request.params.userId;
        const goals = await goalService.getByUserId(userId);
        setResponse1(200, goals, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}


// Fetch all goals by user ID
export const getByUserEmail = async (request, response) => {
    try {
        const userEmail = request.params.userEmail;
        const goals = await goalService.getByUserEmail(userEmail);
        setResponse1(200, goals, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}

// Create a new goal
export const post = async (request, response) => {
    try {
        const newGoal = request.body;
        const goal = await goalService.save(newGoal);
        setResponse1(201, goal, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
};

// Update an existing goal
export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const existingGoal = await goalService.getById(id);
        if (!existingGoal) {
            setErrorResponse(404, `Goal with id ${id} not found`, response);
            return;
        }
        const updatedGoal = request.body; // The request body should not include userId
        const goal = await goalService.update(id, updatedGoal);
        if (!goal) {
            setErrorResponse(404, `Goal with id ${id} not found`, response);
            return;
        }
        setResponse1(200, goal, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
};

// Delete a goal
export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const goal = await goalService.remove(id);
        if (!goal) {
            setErrorResponse(404, `Goal with id ${id} not found`, response);
            return;
        }
        setResponse1(200, {}, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

// Fetch a goal by id
export const getById = async (request, response) => {
    try {
        const id = request.params.id;
        const goal = await goalService.getById(id);
        if(!goal) {
            setErrorResponse(404, `Goal with id ${id} not found`, response);
            return;
        }
        setResponse1(200, goal, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
};


// Fetch a user's goals by date range
export const searchByProgress = async (request, response) => {
    try {
        const { email, start, end } = request.query;
        const goals = await goalService.searchByProgress(email, start, end);
        setResponse1(200, goals, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}
