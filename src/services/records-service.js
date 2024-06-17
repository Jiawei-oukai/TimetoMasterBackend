import Record from "../models/records.js";
import Goal from "../models/goal.js";
import moment from 'moment';

//Fetch all records
export const search = async (email) => {
    const records = Record.find(email).exec();
    return records;
}

export const getByUserEmail = async (userEmail) => {
    return Record.find({ userEmail }).exec();
}

// Fetch all records for a specific user by user ID
export const getByUserId = async (userId) => {
    return Record.find({ userId }).exec();
}

// Fetch a records by id
export const getById = async (id) => {
    console.log(id);
    const records = Record.findById(id).exec();
    return records;
}

// Create a new record and update the corresponding goal
export const save = async (newRecord) => {
    const record = new Record(newRecord);

    try {
        await record.save(record);

        const goal = await Goal.findOne({ _id: record.goalId });
        if (goal) {
            goal.investedHours += record.Time;
            goal.progress = Math.min(goal.investedHours / goal.totalHours, 1);

            await goal.save();
        } else {
            console.warn("Goal not found for the given goalId:", record.goalId);
        }

        return record; 
    } catch (error) {
        console.error("An error occurred while saving the record and updating the goal:", error);
        throw error;
    }
};

export const update = async (id, updatedRecord) => {
    const records = await Record.findByIdAndUpdate(id, updatedRecord, { new: true }).exec();
    return records;
}

export const remove = async (id) => {
    const records = await Record.findByIdAndDelete(id).exec();
    return records;
}

export const searchAllByGid = async (gid) => {
    return Record.find({
        goalId: gid
    });
}

export const searchDailyTimeByGoalId = async (gid) => {
    const records = await Record.find({ goalId: gid });
    const dailyTime = {};

    records.forEach(record => {
        const date = record.recordsDate.toISOString().split('T')[0]; // Convert dates to YYYY-MM-DD format
        if (!dailyTime[date]) {
            dailyTime[date] = {
                goalId: gid,
                goalName: record.goalName,
                recordsDate: date,
                totalHours: 0
            };
        }
        dailyTime[date].totalHours += record.Time;
    });

    return Object.values(dailyTime);
}

export const searchWeeklyTimeByGoalId = async (gid) => {
    const goalRecord = await Record.findOne({ goalId: gid });
    const goalName = goalRecord ? goalRecord.goalName : "Unknown Goal";

    const weeks = 8; // last 8 weeks
    const weeklyTime = Array.from({ length: weeks }, () => ({
        goalId: gid,
        goalName,
        recordsDate: "",
        totalHours: 0
    }));

    const today = new Date();
    const offset = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const currentSunday = new Date(today);
    currentSunday.setDate(today.getDate() - offset); // set to the most recent Sunday
    currentSunday.setHours(0, 0, 0, 0); // set to midnight

    for (let i = 0; i < weeks; i++) {
        const sunday = new Date(currentSunday);
        sunday.setDate(currentSunday.getDate() - 7 * i);
        weeklyTime[i].recordsDate = sunday.toISOString().split('T')[0];
    }

    const records = await Record.find({ goalId: gid });
    records.forEach(record => {
        const recordDate = new Date(record.recordsDate);
        const recordOffset = recordDate.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
        const recordSunday = new Date(recordDate);
        recordSunday.setDate(recordDate.getDate() - recordOffset); // get the most recent Sunday for the record
        const weeksAgo = Math.floor((currentSunday - recordSunday) / (1000 * 60 * 60 * 24 * 7));
        if (weeksAgo >= 0 && weeksAgo < weeklyTime.length) {
            weeklyTime[weeksAgo].totalHours += record.Time;
        }
    });

    return weeklyTime.reverse();
};


export const searchMonthlyTimeByGoalId = async (gid) => {
    const records = await Record.find({ goalId: gid });

    if (records.length === 0) {
        return [];
    }

    const goalName = records[0].goalName || "Unknown Goal";

    // Create an array containing the last 6 months
    const monthlyTime = Array.from({ length: 6 }, (_, i) => {
        const date = moment().startOf('month').subtract(i, 'months');
        return {
            goalId: gid,
            goalName,
            recordsDate: date.format('YYYY-MM'),
            totalHours: 0
        };
    });

    // Calculate total time per month
    records.forEach(record => {
        const recordDate = moment(record.recordsDate).startOf('month');
        const monthsDifference = moment().startOf('month').diff(recordDate, 'months');

        // Check if the records are within the last 6 months
        if (monthsDifference >= 0 && monthsDifference < 6) {
            monthlyTime[monthsDifference].totalHours += record.Time;
        }
    });

    // Return results in chronological order (oldest to newest)
    return monthlyTime.reverse();
};


export const searchAllByUid = async (uid) => {
    return Record.find({
        userId: uid
    });
}

export const searchDailyTimeByEmail = async (email) => {
    const records = await Record.find({ userEmail: email });

    const dailyTime = {};

    records.forEach(record => {
        const date = record.recordsDate.toISOString().split('T')[0]; 
        if (!dailyTime[date]) {
            dailyTime[date] = {
                recordsDate: date,
                totalHours: 0
            };
        }
        dailyTime[date].totalHours += record.Time;
    });

    return Object.values(dailyTime);
}


moment.updateLocale('en', {
    week: {
        dow: 1, // Monday is the first day of the week
    },
});

export const searchWeeklyTimeByEmail = async (email) => {
    const weeklyTime = Array.from({ length: 8 }, () => ({
        recordsDate: "",
        totalHours: 0,
    }));

    const today = moment();
    const currentSunday = today.clone().day(0);

    for (let i = 0; i < 8; i++) {
        const sunday = currentSunday.clone().add(i, 'days').subtract(i, 'weeks');
        weeklyTime[i].recordsDate = sunday.format('YYYY-MM-DD');
    }

    const records = await Record.find({ userEmail: email });
    records.forEach((record) => {
        const recordDate = moment(record.recordsDate);

        for (let i = 0; i < 8; i++) {
            const startOfWeek = moment(weeklyTime[i].recordsDate); 
            const endOfWeek = moment(weeklyTime[i].recordsDate).add(6, 'days'); 

            if (recordDate.isSameOrAfter(startOfWeek) && recordDate.isSameOrBefore(endOfWeek)) {
                weeklyTime[i].totalHours += record.Time;
            }
        }
    });

    return weeklyTime.reverse();
};

export const searchMonthlyTimeByEmail = async (email) => {
    
    const records = await Record.find({ userEmail: email });

    if (records.length === 0) {
        return [];
    }

    
    const monthlyTime = Array.from({ length: 6 }, (_, i) => {
        const date = moment().startOf('month').subtract(i, 'months');
        return {
            recordsDate: date.format('YYYY-MM'),
            totalHours: 0
        };
    });


    
    records.forEach(record => {
        const recordDate = moment(record.recordsDate).startOf('month');
        const monthsDifference = moment().startOf('month').diff(recordDate, 'months');

        
        if (monthsDifference >= 0 && monthsDifference < 6) {
            monthlyTime[monthsDifference].totalHours += record.Time;
        }
    });

    
    return monthlyTime.reverse();
};

// Fetch records by due date
export const searchByDate = async (date, email) => {
    const startDate = moment(date).startOf('day').toDate();
    const endDate = moment(date).endOf('day').toDate();

    return Record.find({
        userEmail: email,
        recordsDate: {
            $gte: startDate,
            $lte: endDate
        }
    }).exec();
};