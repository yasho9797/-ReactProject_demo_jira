import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { deleteTask } from './store/projectSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const AddItemToTask = ({ task, column, onEdit, accentColor }) => {
  const dispatch = useDispatch();
  const { id: projectId } = useParams();

  const handleDelete = () => {
    dispatch(deleteTask({ projectId, column, taskId: task.id }));
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const getPrioritySeverity = (priority) => {
    switch (priority) {
      case 'גבוהה': return 'danger';
      case 'בינונית': return 'warning';
      case 'נמוכה': return 'success';
      default: return 'info';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'גבוהה': return { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', color: '#ef4444' };
      case 'בינונית': return { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', color: '#f59e0b' };
      case 'נמוכה': return { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', color: '#10b981' };
      default: return { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.25)', color: '#6366f1' };
    }
  };

  const priorityColors = getPriorityColor(task.priority);
  const accent = accentColor || '#6366f1';

  const footer = (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '6px',
      direction: 'ltr',
      paddingTop: '4px',
    }}>
      <button
        onClick={handleEdit}
        style={{
          background: 'rgba(6,182,212,0.08)',
          border: '1px solid rgba(6,182,212,0.2)',
          borderRadius: '7px',
          color: '#06b6d4',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          transition: 'all 0.2s ease',
          padding: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.18)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
        title="ערוך משימה"
      >
        ✏️
      </button>
      <button
        onClick={handleDelete}
        style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '7px',
          color: '#ef4444',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          transition: 'all 0.2s ease',
          padding: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.transform = 'scale(1)'; }}
        title="מחק משימה"
      >
        🗑️
      </button>
    </div>
  );

  return (
    <div style={{
      width: '100%',
      marginBottom: '10px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      padding: '14px',
      boxShadow: 'var(--shadow-card)',
      direction: 'rtl',
      transition: 'all 0.25s ease',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'var(--bg-card-hover)';
      e.currentTarget.style.borderColor = `rgba(${hexToRgb(accent)}, 0.3)`;
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = `var(--shadow-elevated), 0 0 20px rgba(${hexToRgb(accent)}, 0.08)`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'var(--bg-card)';
      e.currentTarget.style.borderColor = 'var(--border-subtle)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
    }}
    >
      {/* Accent left bar */}
      <div style={{
        position: 'absolute',
        right: 0, top: 0, bottom: 0,
        width: '3px',
        background: `linear-gradient(180deg, ${accent}, transparent)`,
        borderRadius: '0 12px 12px 0',
      }} />

      {/* Task name */}
      <div style={{
        fontFamily: 'Heebo, sans-serif',
        fontWeight: 700,
        fontSize: '0.9rem',
        color: 'var(--text-primary)',
        marginBottom: '6px',
        paddingRight: '6px',
      }}>
        {task.name}
      </div>

      {/* Description */}
      {task.description && (
        <div style={{
          fontFamily: 'Heebo, sans-serif',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          marginBottom: '10px',
          lineHeight: 1.5,
          paddingRight: '6px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {task.description}
        </div>
      )}

      {/* Meta row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        paddingRight: '6px',
      }}>
        {/* Priority badge */}
        {task.priority && (
          <div style={{
            background: priorityColors.bg,
            border: `1px solid ${priorityColors.border}`,
            borderRadius: '100px',
            padding: '2px 10px',
            fontSize: '0.72rem',
            color: priorityColors.color,
            fontFamily: 'Heebo, sans-serif',
            fontWeight: 700,
          }}>
            {task.priority}
          </div>
        )}

        {/* Deadline */}
        {task.deadline && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontFamily: 'Heebo, sans-serif',
          }}>
            <span>📅</span>
            <span>{task.deadline}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '8px' }} />

      {/* Footer actions */}
      {footer}
    </div>
  );
};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : '99,102,241';
}

export default AddItemToTask;