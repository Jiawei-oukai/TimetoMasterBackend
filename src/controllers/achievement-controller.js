//achievement-controller
import { request, response } from 'express';
import { save, get, remove, update, fetch} from './../services/achievement-service.js';
import * as achievementService from './../services/achievement-service.js';


import {
    setResponse, setResponse1, setErrorResponse
} from './response-handler.js';


// post function: create a achievement
export const post = async (request, response) => {
    try {
        //const userId = request.params.userId;
        const newAchievement = request.body;

        if (newAchievement.description == null) {
                setErrorResponse(500, new Error("Invalid achievement data"), response);
                return null;
        }
        const savedAchievement = await save(newAchievement); 
        setResponse(savedAchievement, response);
    } catch (error) {
        setErrorResponse(500, error, response);
        console.log("error:", error); 
    }
};



// find function: get a achievement by achievementId
export const find = async(request, response) => {
    try {
        //const userId = request.params.userId;
        const id = request.params.id;
        const achievement = await get(id); 
        if (achievement == null) {
            setErrorResponse(500, new Error("Achievement not found"), response);
            return null;
        }
        setResponse(achievement, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }        
};

//delete function: delete a achievement by achievementId
export const Remove = async(request,response) => {
    try{
        //const userId = request.params.userId;
        const id = request.params.id;
        const achievement = await remove(userId, id);
        if (achievement == null) {
            setErrorResponse(500, new Error("Achievement not found"), response);
            return null;
        }
        setResponse({},response);
    }catch(error){
        setErrorResponse(500, error, response);
    }        
}

//update function: update a achievement by achievementId
export const Update = async(request,response) => {
    try{
        //const userId = request.params.userId;
        const id = request.params.id;
        const newAchievement = request.body;
        if (newAchievement.description == null) {
                setErrorResponse(500, new Error("Invalid achievement data"), response);
                return null;
        }
        
        const achievement = await update(id, newAchievement);
        if (achievement == null) {
            setErrorResponse(500, new Error("Achievement not found"), response);
            return null;
        }
        setResponse(achievement, response);
    }catch(error){
        setErrorResponse(500, error, response);
    }        
}


// Fetch all goals
export const index = async (request, response) => {
    try {
        const params = {...request.query};
        const achievements = await achievementService.search(params);
        setResponse1(200, achievements, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }
}


//fetch function: fetch all existing achievements
export const Fetch = async(request,response) => {
    try {
        const userId = request.params.userId;
        const achievements = await fetch(userId); 
        
        //const goals = await goalService.getByUserId(userId);
        setResponse(achievements, response);
    } catch (error) {
        setErrorResponse(500, error, response);
    }        
};
