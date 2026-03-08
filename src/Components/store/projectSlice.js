// import { createSlice } from "@reduxjs/toolkit";
// import AddTask from "../AddTask";

// const projectSlice = createSlice({
//     name:'project',
//     initialState:{
//         projectsList:[],
//     },
//     reducers:{
//         addProject: (state, action) => {
//             const newProject = {
//                 id: Date.now(), 
//                 name: action.payload.name,
//                 description: action.payload.description,
//                 tasks: {
//                     todo: [],
//                     doing: [],
//                     testing: [],
//                     done: []
//                 }
//             };
//             state.projectsList.push(newProject);
//         },
       

//         AddTaskToProject:(state, action) =>{
//             const { projectId, column, task } = action.payload;
            
//             const project = state.projectsList.find(p => p.id === projectId || state.projectsList.indexOf(p) == projectId);
            
//             if (project) {
//                 project.tasks[column].push({
//                     id: Date.now(),
//                     ...task
//                 });
//             }
//         },
        
        

//     }
// })
// export const{addProject, AddTaskToProject} = projectSlice.actions;
// export default projectSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectsList: [],
    },
    reducers: {
        addProject: (state, action) => {
            const newProject = {
                id: Date.now(), 
                name: action.payload.name,
                description: action.payload.description,
                tasks: {
                    todo: [],
                    doing: [],
                    testing: [],
                    done: []
                }
            };
            state.projectsList.push(newProject);
        },


AddTaskToProject: (state, action) => {
    const { projectId, column, task } = action.payload;

    const project = state.projectsList.find((p, index) => 
        p.id === Number(projectId) || index === Number(projectId)
    );

    if (project) {
        if (!project.tasks) {
            project.tasks = { todo: [], doing: [], testing: [], done: [] };
        }
        
        if (!project.tasks[column]) {
            project.tasks[column] = [];
        }

        project.tasks[column].push({
            id: Date.now() + Math.random(),
            ...task
        });
    }
},

deleteTask: (state, action) => {
    const { projectId, column, taskId } = action.payload;

    // 1. מוצאים את הפרויקט המתאים
    const project = state.projectsList.find((p, index) => 
        p.id === Number(projectId) || index === Number(projectId)
    );

    if (project && project.tasks && project.tasks[column]) {
        // 2. מסננים את המערך של הטור הספציפי כך שהמשימה עם ה-taskId תימחק
        project.tasks[column] = project.tasks[column].filter(task => task.id !== taskId);
    }
}

    }
});

export const { addProject, AddTaskToProject , deleteTask} = projectSlice.actions;
export default projectSlice.reducer;