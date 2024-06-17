import Goal from "../models/goal.js";

//Fetch all goals
export const search = async (params) => {
    const goal = Goal.find(params).exec();
    return goal;
}

// Fetch all goals for a specific user by user ID
export const getByUserId = async (userId) => {
    return Goal.find({ userId }).exec();
}

// Fetch all goals for a specific user by userEmail
export const getByUserEmail = async (userEmail) => {
    return Goal.find({ userEmail }).exec();
}



// Fetch a goal by id
export const getById = async (id) => {
    const goal = Goal.findById(id).exec();
    return goal;
}

// Create a new goal
export const save = async (newGoal) => {
    const goal = new Goal(newGoal);
    return goal.save();
}

// Update an existing goal
export const update = async (id, updatedGoal) => {
    const goal = await Goal.findByIdAndUpdate(id, updatedGoal, { new: true }).exec();
    return goal;
}

// Delete a goal
export const remove = async (id) => {
    const goal = await Goal.findByIdAndDelete(id).exec();
    return goal;
}


// Fetch goals by due date for a specific user
// export const searchByProgress = async (uid, start, end) => {
//     return Goal.find({
//         userId: uid,
//         progress: {
//             $gte: start, 
//             $lte: end    
//         }
//     });
// }

// Fetch goals by due date for a specific user
export const searchByProgress = async (email, start, end) => {
    return Goal.find({
        userEmail: email,
        progress: {
            $gte: start, 
            $lte: end    
        }
    });
}