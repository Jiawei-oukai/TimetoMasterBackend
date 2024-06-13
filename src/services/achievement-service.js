//achievement-services function
import Achievement from '../models/achievement.js';

export const save = async (newAchievement) => {
    const achievement = new Achievement(newAchievement);
    return achievement.save()
        .then((savedAchievement) => {
            console.log("Achievement saved:", savedAchievement);
            return savedAchievement;
        })
        .catch((error) => {
            console.error("Error saving achievement:", error);
            throw error; 
        });
};


// update: update a achievement by achievementId and userId
export const update = async (id, updatedAchievement) => {
    const achievement = await Achievement.findByIdAndUpdate(id, updatedAchievement, { new: true }).exec();
    return achievement;
};

// // Update an existing goal
// export const update = async (id, updatedGoal) => {
//     const goal = await Goal.findByIdAndUpdate(id, updatedGoal, { new: true }).exec();
//     return goal;
// }


// get: get a achievement by achievementId and userId
export const get = async (id) => {
    const achievement = Achievement.findById(id).exec();
    return achievement;
};

// // Fetch a goal by id
// export const getById = async (id) => {
//     console.log(id);
//     const goal = Goal.findById(id).exec();
//     return goal;
// }

// Fetch all goals for a specific user by user ID
export const getByUserId = async (userId) => {
    return Goal.find({ userId }).exec();
}



// fetch: retrieve all achievements of a user by userId
export const fetch = async (userId) => {
    //const achievement = Achievement.find({ userId }).exec();
    return Achievement.find({ userId }).exec();
}


//Fetch all goals
export const search = async (params) => {
    const achievement = Achievement.find(params).exec();
    return achievement;
}

// delete: user delete a achievement by achievementId
export const remove = async (id) => { 
    const achievement = Achievement.findByIdAndDelete(id).exec();
    return achievement;
};
