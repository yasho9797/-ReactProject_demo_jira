import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AddTaskToProject, updateTask } from './store/projectSlice';
import { useParams } from 'react-router-dom';


const AddTask = ({ visible: externalVisible, onHide, taskData, isEditMode }) => {
    const [internalVisible, setInternalVisible] = useState(false);
    const dispatch = useDispatch();
    const { id: projectId } = useParams();

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
            dispatch(updateTask({
                projectId: projectId,
                column: data.status,
                taskId: taskData.id,
                updateTask: {
                    name: data.taskName,
                    description: data.description,
                    priority: data.priority,
                    deadline: data.deadline ? data.deadline.toLocaleDateString() : ''
                }
            }));
        } else {
            dispatch(AddTaskToProject({
                projectId: parseInt(projectId),
                column: data.status,
                task: {
                    id: Date.now(),
                    name: data.taskName,
                    description: data.description,
                    priority: data.priority,
                    deadline: data.deadline ? data.deadline.toLocaleDateString() : ''
                }
            }));
        }
        handleClose();
    };

    /* ===== FOOTER ===== */
    const footerContent = (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '10px',
            direction: 'rtl',
            padding: '4px 0',
        }}>
            {/* Save / Update button */}
            <button
                onClick={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none',
                    borderRadius: '9px',
                    color: 'white',
                    fontFamily: 'Heebo, sans-serif',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    padding: '9px 18px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(99,102,241,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                <i className="pi pi-check" style={{ fontSize: '0.8rem' }} />
                {isEditMode ? 'עדכן שינויים' : 'שמור משימה'}
            </button>

            {/* Cancel button */}
            <button
                onClick={handleClose}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: '9px',
                    color: '#ef4444',
                    fontFamily: 'Heebo, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    padding: '9px 18px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.16)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
            >
                <i className="pi pi-times" style={{ fontSize: '0.8rem' }} />
                ביטול
            </button>
        </div>
    );

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* Plus button — only in add mode */}
            {!isEditMode && (
                <button
                    onClick={() => setInternalVisible(true)}
                    style={{
                        background: 'rgba(99,102,241,0.1)',
                        border: '1px dashed rgba(99,102,241,0.35)',
                        borderRadius: '10px',
                        color: '#818cf8',
                        width: '44px',
                        height: '44px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.3rem',
                        transition: 'all 0.2s ease',
                        marginBottom: '12px',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(99,102,241,0.18)';
                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)';
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(99,102,241,0.2)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                    title="הוסף משימה"
                >
                    +
                </button>
            )}

            <Dialog
                header={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', direction: 'rtl' }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: '9px',
                            background: isEditMode
                                ? 'linear-gradient(135deg, #06b6d4, #0891b2)'
                                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.9rem',
                            boxShadow: isEditMode
                                ? '0 4px 12px rgba(6,182,212,0.35)'
                                : '0 4px 12px rgba(99,102,241,0.35)',
                            flexShrink: 0,
                        }}>
                            {isEditMode ? '✏️' : '➕'}
                        </div>
                        <span style={{
                            fontFamily: 'Heebo, sans-serif',
                            fontWeight: 800,
                            fontSize: '1rem',
                            color: 'var(--text-primary)',
                        }}>
                            {isEditMode ? 'עריכת משימה' : 'הוספת משימה חדשה'}
                        </span>
                    </div>
                }
                visible={isVisible}
                style={{ width: '520px' }}
                onHide={handleClose}
                footer={footerContent}
                rtl={true}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    direction: 'rtl',
                    paddingTop: '6px',
                }}>
                    {/* Task name */}
                    <div>
                        <label style={labelStyle}>* שם המשימה</label>
                        <Controller
                            name="taskName"
                            control={control}
                            rules={{ required: 'שם משימה הוא חובה' }}
                            render={({ field, fieldState }) => (
                                <InputText
                                    {...field}
                                    className={fieldState.invalid ? 'p-invalid w-full' : 'w-full'}
                                    placeholder="מה שם המשימה?"
                                    style={{ fontFamily: 'Heebo, sans-serif' }}
                                />
                            )}
                        />
                        {errors.taskName && (
                            <small style={{ color: '#ef4444', fontFamily: 'Heebo, sans-serif', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
                                {errors.taskName.message}
                            </small>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label style={labelStyle}>תיאור</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <InputTextarea
                                    {...field}
                                    rows={3}
                                    className="w-full"
                                    placeholder="תיאור קצר של המשימה..."
                                    style={{ fontFamily: 'Heebo, sans-serif', resize: 'none' }}
                                />
                            )}
                        />
                    </div>

                    {/* Priority + Status */}
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>עדיפות</label>
                            <Controller
                                name="priority"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={['נמוכה', 'בינונית', 'גבוהה']}
                                        className="w-full"
                                        style={{ fontFamily: 'Heebo, sans-serif' }}
                                    />
                                )}
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>סטטוס</label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={[
                                            { label: 'לביצוע', value: 'todo' },
                                            { label: 'בביצוע', value: 'doing' },
                                            { label: 'בבדיקה', value: 'testing' },
                                            { label: 'בוצע', value: 'done' }
                                        ]}
                                        className="w-full"
                                        style={{ fontFamily: 'Heebo, sans-serif' }}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Deadline */}
                    <div>
                        <label style={labelStyle}>תאריך יעד</label>
                        <Controller
                            name="deadline"
                            control={control}
                            render={({ field }) => (
                                <Calendar
                                    {...field}
                                    showIcon
                                    className="w-full"
                                    dateFormat="dd/mm/yy"
                                    style={{ fontFamily: 'Heebo, sans-serif' }}
                                />
                            )}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

/* ===== SHARED STYLES ===== */
const labelStyle = {
    display: 'block',
    fontFamily: 'Heebo, sans-serif',
    fontSize: '0.78rem',
    fontWeight: 700,
    color: 'var(--text-secondary)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: '7px',
};

export default AddTask;