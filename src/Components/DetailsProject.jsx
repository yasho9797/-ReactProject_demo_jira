
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Card } from '@mui/material';
// import AddTask from '../Components/AddTask'; 
// import AddItemToTask from './AddItemToTask';
// import React, { useState } from 'react';


// const DetailsProject = () => {
//     const { id } = useParams();
    
//     // שליפת הפרויקט מה-Store לפי ה-ID מה-URL
//     const project = useSelector(state => {
//         const list = state.project.projectsList || []; 
//         return list[id]; 
//     });

//         const [isEditOpen, setIsEditOpen] = useState(false);
//     const [taskToEdit, setTaskToEdit] = useState(null);

//     const handleEdit = (task) => {
//     setTaskToEdit(task); // שומרים את המשימה שרוצים לערוך
//     setIsEditOpen(true); // פותחים את המודאל

// };

    
//     // הגנה מפני קריסה בזמן טעינה או רענון
//     if (!project) {
//         return (
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
//                 <Card sx={{ p: 4, textAlign: 'center', maxWidth: '400px' }}>
//                     <h2 style={{ color: '#1976d2' }}>טוען נתונים...</h2>
//                     <p>הפרויקט לא נמצא או שהדף ברענון.</p>
//                 </Card>
//             </div>
//         );
//     }
// //     const handleEdit = (task) => {
// //     console.log("עריכת משימה:", task);
// // };


//     return (
//         <div style={{ width: '100vw', margin: '0', padding: '0', overflowX: 'hidden', direction: 'rtl' }}>
            
//             {/* כותרת הפרויקט העליונה */}
//             <div style={{ 
//                 width: '100%', backgroundColor: '#f0f4f8', padding: '1.5rem', 
//                 textAlign: 'center', fontWeight: 'bold', marginBottom: '15px',
//                 fontSize: '1.8rem', borderBottom: '2px solid #d1d9e6'
//             }}>
//                 פרויקט: {project.name}
//             </div>
            

//             {/* שורת התיבות (קנבן) */}
//             <div style={{ 
//                 display: 'flex', 
//                 width: '100%', 
//                 gap: '15px', 
//                 padding: '0 15px',
//                 boxSizing: 'border-box' 
//             }}>
              
                
//                  {/* תיבה 4 - בוצע */}
//                 <div style={columnStyle('#f3e5f5')}>
//                     <AddTask/>  
//                     <div style={labelStyle}>משימות שנבדקו</div>
//                 {project?.tasks?.done?.map((task) => (
//                 <AddItemToTask 
//                 key={task.id}
//                 task={task}
//                 column="done" />
//             ))}
                    
//                 </div>
//                 {/* תיבה 3 - בדיקה */}
//                 <div style={columnStyle('#fff3e0')}>
//                     <AddTask />
//                     <div style={labelStyle}>מוכנות לבדיקה</div> 
//                         {project?.tasks?.testing?.map((task) => (
                       
//                         <AddItemToTask key={task.id} task={task} column="testing"  />
//             ))}
                    
//                     </div>
//                  {/* תיבה 2 - בביצוע */}
//                      <div style={columnStyle('#f3e5f5')}>
//                     <AddTask/> 
//                     <div style={labelStyle}>משימות בביצוע</div> 
//                 {project?.tasks?.doing?.map((task) => (
//                 <AddItemToTask key={task.id} task={task} column="doing" 
//                 />
//             ))}
                    
                    
//                 </div>

//                       {/* תיבה 1 - לביצוע */}
//                <div style={columnStyle('#f3e5f5')}>
//                     <AddTask/> 
                     
//                      <div style={labelStyle}>משימות לביצוע</div>
//                 {project?.tasks?.todo?.map((task) => (
//                 <AddItemToTask key={task.id} task={task} column="todo" 
//               />
//             ))}
                    
//                 </div>


//             </div>
//         </div>
//     );
// };

// // אובייקטי עיצוב לשימוש חוזר (כדי שהקוד יהיה נקי)
// const columnStyle = (bgColor) => ({
//     flex: '1', 
//     backgroundColor: bgColor, 
//     minHeight: '80vh', 
//     borderRadius: '20px', 
//     display: 'flex', 
//     flexDirection: 'column', 
//     alignItems: 'center', 
//     padding: '25px',
//     boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
//     border: '1px solid rgba(0,0,0,0.03)'
// });

// const labelStyle = {
//     marginTop: '15px', 
//     fontWeight: 'bold', 
//     fontSize: '1.1rem', 
//     color: '#333'
// };

// export default DetailsProject;






import React, { useState } from 'react'; // ייבוא מאוחד
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card } from '@mui/material';
import AddTask from '../Components/AddTask'; 
import AddItemToTask from './AddItemToTask';

const DetailsProject = () => {
    const { id } = useParams();
    
    const project = useSelector(state => {
        const list = state.project.projectsList || []; 
        return list[id]; 
    });

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const handleEdit = (task) => {
        setTaskToEdit(task); 
        setIsEditOpen(true); 
    };

    if (!project) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                <Card sx={{ p: 4, textAlign: 'center', maxWidth: '400px' }}>
                    <h2 style={{ color: '#1976d2' }}>טוען נתונים...</h2>
                    <p>הפרויקט לא נמצא או שהדף ברענון.</p>
                </Card>
            </div>
        );
    }

    return (
        <div style={{ width: '100vw', margin: '0', padding: '0', overflowX: 'hidden', direction: 'rtl' }}>
            
            <div style={{ 
                width: '100%', backgroundColor: '#f0f4f8', padding: '1.5rem', 
                textAlign: 'center', fontWeight: 'bold', marginBottom: '15px',
                fontSize: '1.8rem', borderBottom: '2px solid #d1d9e6'
            }}>
                פרויקט: {project.name}
            </div>
            
            <div style={{ display: 'flex', width: '100%', gap: '15px', padding: '0 15px', boxSizing: 'border-box' }}>
              
                {/* טור בוצע */}
                <div style={columnStyle('#f3e5f5')}>
                    <AddTask />  
                    <div style={labelStyle}>משימות שנבדקו</div>
                    {project?.tasks?.done?.map((task) => (
                        <AddItemToTask key={task.id} task={task} column="done" onEdit={handleEdit} />
                    ))}
                </div>

                {/* טור בדיקה */}
                <div style={columnStyle('#fff3e0')}>
                    <AddTask />
                    <div style={labelStyle}>מוכנות לבדיקה</div> 
                    {project?.tasks?.testing?.map((task) => (
                        <AddItemToTask key={task.id} task={task} column="testing" onEdit={handleEdit} />
                    ))}
                </div>

                {/* טור בביצוע */}
                <div style={columnStyle('#e8f5e9')}>
                    <AddTask /> 
                    <div style={labelStyle}>משימות בביצוע</div> 
                    {project?.tasks?.doing?.map((task) => (
                        <AddItemToTask key={task.id} task={task} column="doing" onEdit={handleEdit} />
                    ))}
                </div>

                {/* טור לביצוע */}
                <div style={columnStyle('#e3f2fd')}>
                    <AddTask /> 
                    <div style={labelStyle}>משימות לביצוע</div>
                    {project?.tasks?.todo?.map((task) => (
                        <AddItemToTask key={task.id} task={task} column="todo" onEdit={handleEdit} />
                    ))}
                </div>
            </div>

            {/* חלון עריכה נסתר שקופץ רק כשצריך */}
            {isEditOpen && (
                <AddTask 
                    isEditMode={true}
                    taskData={taskToEdit} 
                    visible={isEditOpen} 
                    onHide={() => {
                        setIsEditOpen(false);
                        setTaskToEdit(null);
                    }} 
                />
            )}
        </div>
    );
};

const columnStyle = (bgColor) => ({
    flex: '1', backgroundColor: bgColor, minHeight: '80vh', borderRadius: '20px', 
    display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)'
});

const labelStyle = { marginTop: '15px', fontWeight: 'bold', fontSize: '1.1rem', color: '#333' };

export default DetailsProject;