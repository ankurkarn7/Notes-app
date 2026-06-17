import React, { useEffect } from 'react'
import './ConfirmDialog.css'

const ConfirmDialog = ({ open, title, message, confirmLabel = 'Delete', cancelLabel = 'Cancel', onConfirm, onCancel }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Enter') onConfirm();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onConfirm, onCancel]);

  if (!open) return null;

  return (
    <div className='dialog-overlay' onClick={onCancel}>
      <div
        className='dialog'
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='dialog-title'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='dialog-icon'>🗑️</div>
        <h3 id='dialog-title' className='dialog-title'>{title}</h3>
        {message && <p className='dialog-message'>{message}</p>}
        <div className='dialog-actions'>
          <button className='btn-ghost' onClick={onCancel}>{cancelLabel}</button>
          <button className='btn-danger' onClick={onConfirm} autoFocus>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
