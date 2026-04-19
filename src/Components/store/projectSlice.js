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
        },

        updateTask: (state, action) => {
            const { projectId, column, taskId, updateTask } = action.payload;
            const project = state.projectsList?.find((p, index) =>
                p.id === Number(projectId) || index === Number(projectId)
            );
            if (project && project.tasks) {
                //מחיקת המשימה השינה מכל העמודות
                Object.keys(project.tasks).forEach(col => {
                    project.tasks[col] = project.tasks[col].filter(t => t.id !== taskId);
                });
                project.tasks[column].push({
                    id: taskId,
                    ...updateTask
                });
            }
        },

        deleteProject: (state, action) => {
            const projectIdToDelete = action.payload;
            state.projectsList = state.projectsList.filter((project, index) => index != parseInt(projectIdToDelete));
        },

        updateProject: (state, action) => {
            const { id, updatedData } = action.payload;

            if (state.projectsList[id]) {
                
                state.projectsList[id] = {
                    ...state.projectsList[id],
                    ...updatedData
                };
            }
        }

    }
});

export const { addProject, AddTaskToProject, deleteTask, updateTask, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;