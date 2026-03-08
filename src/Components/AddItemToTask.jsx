import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge'; // בשביל להציג את העדיפות בצורה יפה
import AddTask from './AddTask';
import { deleteTask } from './store/projectSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


const AddItemToTask = ({ task, column, onEdit }) => {
const dispatch = useDispatch();
const { id: projectId } = useParams();

const handleDelete = () => {
        // שליחת כל הנתונים הדרושים למחיקה
        dispatch(deleteTask({ 
            projectId: projectId, 
            column: column, 
            taskId: task.id 
        }));
    };


    const handleEdit = () => {
        // שליחת כל הנתונים הדרושים למחיקה
        // dispatch(deleteTask({ 
        //     projectId: projectId, 
        //     column: column, 
        //     taskId: task.id 
        // }));
      onEdit(task);
    };
    // פונקציה לבחירת צבע לפי עדיפות,
    const getPrioritySeverity = (priority) => {
        switch (priority) {
            case 'גבוהה': return 'danger';   // אדום
            case 'בינונית': return 'warning'; // צהוב/כתום
            case 'נמוכה': return 'success';  // ירוק
            default: return 'info';
        }
    };

    // הכפתורים שיופיעו בתחתית הריבוע
    const footer = (
        <div className="flex justify-content-end gap-2" style={{ direction: 'ltr' }}>
            <Button 
                icon="pi pi-pencil" 
                rounded 
                text 
                severity="info" 
                onClick={() => handleEdit({task})                
                } 
                 
                tooltip="ערוך משימה"
                
            />
            <Button 
                icon="pi pi-trash" 
                rounded 
                text 
                severity="danger" 
                onClick={() => handleDelete()                
                } 
                tooltip="מחק משימה"
            />
        </div>
    );

    return (
        <Card 
            title={task.name} 
            subTitle={task.deadline} 
            footer={footer} 
            style={{ 
                width: '250px', 
                marginBottom: '1em', 
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                direction: 'rtl' 
            }}
        >
            <div className="flex flex-column gap-3">
                <p className="m-0" style={{ fontSize: '0.9rem', color: '#666' }}>
                    {task.description || 'אין תיאור למשימה'}
                </p>
                
                <div>
                    <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>עדיפות:</span>
                    <Badge value={task.priority} severity={getPrioritySeverity(task.priority)} />
                </div>
            </div>
        </Card>
    );
};

export default AddItemToTask;