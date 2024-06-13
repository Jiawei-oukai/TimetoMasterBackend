import * as recordsService from './../services/records-service.js';

import { setResponse1, setErrorResponse } from './response-handler.js';

// Fetch all records
export const index = async (request, response) => {
    try {
     
        const email = request.params.email;
        const records = await recordsService.getByUserEmail(email);
        setResponse1(200, records, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}

// Fetch all records by user ID
export const getByUserId = async (request, response) => {
    try {
        const userId = request.params.userId;
        const records = await recordsService.getByUserId(userId);
        setResponse1(200, records, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}


// Create a new record
export const CreateNewRecord = async (request, response) => {
    try {
        const newRecord = request.body;
        const record = await recordsService.save(newRecord);
        setResponse1(201, record, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
};

// Update an existing records
export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const existingRecord = await recordsService.getById(id);
        if (!existingRecord) {
            setErrorResponse(404, `records with id ${id} not found`, response);
            return;
        }
        const updatedRecord = request.body; // The request body should not include userId
        const records = await recordsService.update(id, updatedRecord);
        if (!records) {
            setErrorResponse(404, `records with id ${id} not found`, response);
            return;
        }
        setResponse1(200, records, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
};

// Delete a records
export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const records = await recordsService.remove(id);
        if (!records) {
            setErrorResponse(404, `records with id ${id} not found`, response);
            return;
        }
        setResponse1(200, {}, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
}

// Fetch a records by id
export const getById = async (request, response) => {
    try {
        const id = request.params.id;
        const records = await recordsService.getById(id);
        if (!records) {
            setErrorResponse(404, `records with id ${id} not found`, response);
            return;
        }
        setResponse1(200, records, response);
    } catch (err) {
        setErrorResponse(500, err, response);
    }
};

export const searchAllByGid = async (request, response) => {
    try {
        const { gid } = request.query;
        const records = await recordsService.searchAllByGid(gid);
        setResponse1(200, records, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}

export const searchDailyTimeByGoalId = async (request, response) => {
    try {
        const { gid } = request.query;
        const records = await recordsService.searchDailyTimeByGoalId(gid);
        setResponse1(200, records, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}
export const searchWeeklyTimeByGoalId = async (request, response) => {
    try {
        const { gid } = request.query;
        const records = await recordsService.searchWeeklyTimeByGoalId(gid);
        setResponse1(200, records, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}

export const searchMonthlyTimeByGoalId = async (request, response) => {
    try {
        const { gid } = request.query;
        const monthlyTime = await recordsService.searchMonthlyTimeByGoalId(gid);
        setResponse1(200, monthlyTime, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
};



export const searchAllByUid = async (request, response) => {
    try {
        const { uid } = request.query;
        const records = await recordsService.searchAllByUid(uid);
        setResponse1(200, records, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}

export const searchDailyTimeByEmail = async (request, response) => {
    try {
        const { email } = request.query;
        const records = await recordsService.searchDailyTimeByEmail(email);
        setResponse1(200, records, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}

export const searchWeeklyTimeByEmail = async (request, response) => {
    try {
        const { email } = request.query;
        const records = await recordsService.searchWeeklyTimeByEmail(email);
        setResponse1(200, records, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}

export const searchMonthlyTimeByEmail = async (request, response) => {
    try {
        const { email } = request.query;
        const monthlyTime = await recordsService.searchMonthlyTimeByEmail(email);
        setResponse1(200, monthlyTime, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
};

export const searchByDate = async (request, response) => {
    try {
        const { date, email } = request.query;
        if (!date || !email) {
            setErrorResponse(400, "Date and email are required", response);
            return;
        }
        console.log("date in controller:" + date);
        const records = await recordsService.searchByDate(date, email);
        setResponse1(200, records, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
};
