


// import React, { useState } from 'react';
// import { Dialog } from 'primereact/dialog';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Dropdown } from 'primereact/dropdown';
// import { Calendar } from 'primereact/calendar';
// import { useForm, Controller } from 'react-hook-form'; // ייבוא הספרייה
// import { useDispatch } from 'react-redux';
// import { AddTaskToProject } from './store/projectSlice';
// import { useParams } from 'react-router-dom';
// import AddItemToTask from './AddItemToTask';

// // const AddTask = () => {
// //     const [visible, setVisible] = useState(false);
// //     const { id: projectId } = useParams(); // שליפת ה-ID של הפרויקט מה-URL
// //     const dispatch = useDispatch();
    
// //     // הגדרת react-hook-form
// //     const { control, handleSubmit, reset, formState: { errors } } = useForm({
// //         defaultValues: {
// //             taskName: '',
// //             description: '',
// //             priority: 'בינונית',
// //             status: 'todo',
// //             deadline: null
// //         }
// //     });

// //     // פונקציית השמירה
// //     const onSubmit = (data) => {
// //         const columnMap = {
// //             'לביצוע': 'todo',
// //             'בתהליך': 'doing',
// //             'בבדיקה': 'testing',
// //             'בוצע': 'done'
// //         };

// //         dispatch(AddTaskToProject({
// //             projectId: parseInt(projectId),
// //             column: data.status,
// //             task: {
// //                 name: data.taskName,
// //                 description: data.description,
// //                 priority: data.priority,
// //                 deadline: data.deadline ? data.deadline.toLocaleDateString() : ''
// //             }
// //         }));
        
// //         reset(); // איפוס הטופס
// //         setVisible(false); // סגירת המודאל
        
// //     };

// // הוסיפי את ה-Props האלו בסוגריים: visible, onHide, taskData, isEditMode
// const AddTask = ({ visible: externalVisible, onHide, taskData, isEditMode }) => {
//     // אנחנו משתמשים ב-internalVisible בשביל כפתור ה"+" הרגיל
//     const [internalVisible, setInternalVisible] = useState(false);
//     const dispatch = useDispatch();
//     const { id: projectId } = useParams();

//     // קובעים איזה visible לקחת: מהאבא (עריכה) או פנימי (הוספה)
//     const isVisible = isEditMode ? externalVisible : internalVisible;

//     const { control, handleSubmit, reset } = useForm({
//         defaultValues: {
//             taskName: '',
//             description: '',
//             priority: 'בינונית',
//             status: 'todo',
//             deadline: null
//         }
//     });

//     // הקוד הקריטי: ברגע ש-taskData משתנה, הטופס מתמלא!
//     React.useEffect(() => {
//         if (taskData && isEditMode) {
//             reset({
//                 taskName: taskData.name,
//                 description: taskData.description,
//                 priority: taskData.priority,
//                 status: 'todo', // תוכלי להתאים לפי הטור
//                 deadline: taskData.deadline ? new Date(taskData.deadline) : null
//             });
//         }
//     }, [taskData, isEditMode, reset]);

//     // פונקציית סגירה מאוחדת
//     const handleClose = () => {
//         if (isEditMode) {
//             onHide();
//         } else {
//             setInternalVisible(false);
//         }
//         reset(); // מנקה את הטופס בסגירה
//     };

//     const footerContent = (
//         <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px', direction: 'rtl' }}>
//             <Button label="שמור משימה" icon="pi pi-check" onClick={handleSubmit(onSubmit)}  className="p-button-primary" />
//             <Button label="ביטול" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-danger p-button-outlined" />
//         </div>
//     );

//     return (
//         <div className="card flex justify-content-center">
//             <Button icon="pi pi-plus" onClick={() => setVisible(true)} text style={{ color: '#1976d2', fontSize: '1.8rem' }} />

//             <Dialog header="הוספת משימה חדשה" visible={visible} style={{ width: '520px' }} onHide={() => setVisible(false)} footer={footerContent} rtl={true}>
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', direction: 'rtl' }}>
                    
//                     {/* שם משימה עם וולידציה */}
//                     <div>
//                         <label className="block font-bold mb-2">* שם המשימה</label>
//                         <Controller
//                             name="taskName"
//                             control={control}
//                             rules={{ required: 'שם משימה הוא חובה' }}
//                             render={({ field, fieldState }) => (
//                                 <InputText {...field} className={fieldState.invalid ? 'p-invalid w-full' : 'w-full'} placeholder="מה שם המשימה?" />
//                             )}
//                         />
//                         {errors.taskName && <small className="p-error">{errors.taskName.message}</small>}
//                     </div>

//                     {/* תיאור */}
//                     <div>
//                         <label className="block font-bold mb-2">תיאור</label>
//                         <Controller
//                             name="description"
//                             control={control}
//                             render={({ field }) => <InputTextarea {...field} rows={3} className="w-full" />}
//                         />
//                     </div>

//                     <div style={{ display: 'flex', gap: '20px' }}>
//                         {/* עדיפות */}
//                         <div style={{ flex: 1 }}>
//                             <label className="block font-bold mb-2">עדיפות</label>
//                             <Controller
//                                 name="priority"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <Dropdown {...field} options={['נמוכה', 'בינונית', 'גבוהה']} className="w-full" />
//                                 )}
//                             />
//                         </div>
                        

//                         {/* סטטוס - חשוב שיתאים לעמודות ב-Slice */}
//                         <div style={{ flex: 1 }}>
//                             <label className="block font-bold mb-2">סטטוס</label>
//                             <Controller
//                                 name="status"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <Dropdown {...field} 
//                                         options={[
//                                             { label: 'משימות לביצוע', value: 'todo' },
//                                             { label: 'משימות בביצוע', value: 'doing' },
//                                             { label: 'משימות שנבדקו', value: 'done' },
//                                             { label: 'מוכנות לבדיקה', value: 'testing' }
//                                         ]} 
//                                         className="w-full" 
                                        
//                                     />
                                    
//                                 )}
                               
//                             />
//                         </div>
//                     </div>

//                     {/* תאריך */}
//                     <div>
//                         <label className="block font-bold mb-2">תאריך יעד</label>
//                         <Controller
//                             name="deadline"
//                             control={control}
//                             render={({ field }) => (
//                                 <Calendar {...field} showIcon className="w-full" dateFormat="dd/mm/yy" />
//                             )}
//                         />
//                     </div>
//                 </div>
//             </Dialog>
//         </div>
//     );
// }

// export default AddTask;









import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AddTaskToProject } from './store/projectSlice'; // תוודאי שהנתיב נכון
import { useParams } from 'react-router-dom';

const AddTask = ({ visible: externalVisible, onHide, taskData, isEditMode }) => {
    const [internalVisible, setInternalVisible] = useState(false);
    const dispatch = useDispatch();
    const { id: projectId } = useParams();

    // מחליט איזה מצב נראות לקחת
    const isVisible = isEditMode ? externalVisible : internalVisible;

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            taskName: '',
            description: '',
            priority: 'בינונית',
            status: 'todo',
            deadline: null
        }
    });

    // עדכון השדות כשנכנסים למצב עריכה
    useEffect(() => {
        if (taskData && isEditMode) {
            reset({
                taskName: taskData.name || '',
                description: taskData.description || '',
                priority: taskData.priority || 'בינונית',
                status: taskData.status || 'todo',
                deadline: taskData.deadline ? new Date(taskData.deadline) : null
            });
        } else {
            reset({ taskName: '', description: '', priority: 'בינונית', status: 'todo', deadline: null });
        }
    }, [taskData, isEditMode, reset]);

    const handleClose = () => {
        if (isEditMode) {
            onHide();
        } else {
            setInternalVisible(false);
        }
        reset(); 
    };

    const onSubmit = (data) => {
        if (isEditMode) {
            console.log("מעדכן משימה קיימת:", data);
            // כאן תכניסי את ה-dispatch של העריכה (UpdateTask)
        } else {
            dispatch(AddTaskToProject({
                projectId: parseInt(projectId),
                column: data.status,
                task: {
                    id: Date.now(), // יצירת ID זמני
                    name: data.taskName,
                    description: data.description,
                    priority: data.priority,
                    deadline: data.deadline ? data.deadline.toLocaleDateString() : ''
                }
            }));
        }
        handleClose();
    };

    const footerContent = (
        <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '12px', direction: 'rtl' }}>
            <Button label={isEditMode ? "עדכן שינויים" : "שמור משימה"} icon="pi pi-check" onClick={handleSubmit(onSubmit)} className="p-button-primary" />
            <Button label="ביטול" icon="pi pi-times" onClick={handleClose} className="p-button-danger p-button-outlined" />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            {/* כפתור הפלוס מופיע רק אם אנחנו לא במצב עריכה */}
            {!isEditMode && (
                <Button icon="pi pi-plus" onClick={() => setInternalVisible(true)} text style={{ color: '#1976d2', fontSize: '1.8rem' }} />
            )}

            <Dialog 
                header={isEditMode ? "עריכת משימה" : "הוספת משימה חדשה"} 
                visible={isVisible} 
                style={{ width: '520px' }} 
                onHide={handleClose} 
                footer={footerContent} 
                rtl={true}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', direction: 'rtl', paddingTop: '10px' }}>
                    
                    <div>
                        <label className="block font-bold mb-2">* שם המשימה</label>
                        <Controller
                            name="taskName"
                            control={control}
                            rules={{ required: 'שם משימה הוא חובה' }}
                            render={({ field, fieldState }) => (
                                <InputText {...field} className={fieldState.invalid ? 'p-invalid w-full' : 'w-full'} />
                            )}
                        />
                        {errors.taskName && <small className="p-error">{errors.taskName.message}</small>}
                    </div>

                    <div>
                        <label className="block font-bold mb-2">תיאור</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => <InputTextarea {...field} rows={3} className="w-full" />}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label className="block font-bold mb-2">עדיפות</label>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown {...field} options={['נמוכה', 'בינונית', 'גבוהה']} className="w-full" />
                                )}
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <label className="block font-bold mb-2">סטטוס</label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown {...field} 
                                        options={[
                                            { label: 'לביצוע', value: 'todo' },
                                            { label: 'בביצוע', value: 'doing' },
                                            { label: 'בבדיקה', value: 'testing' },
                                            { label: 'בוצע', value: 'done' }
                                        ]} 
                                        className="w-full" 
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold mb-2">תאריך יעד</label>
                        <Controller
                            name="deadline"
                            control={control}
                            render={({ field }) => (
                                <Calendar {...field} showIcon className="w-full" dateFormat="dd/mm/yy" />
                            )}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default AddTask;