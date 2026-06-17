import React from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import './Homec.css'
import './ViewPastes.css'
import { relativeTime } from '../utils/time'

const ViewPastes = () => {

  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className='page'>
        <div className='empty-state'>
          <div className='empty-icon'>🔍</div>
          <h3>Note not found</h3>
          <p>This note may have been deleted.</p>
          <NavLink className='btn-primary empty-cta' to='/pastes'>Back to notes</NavLink>
        </div>
      </div>
    )
  }

  function handleCopy(){
    navigator.clipboard.writeText(paste.content);
    toast.success('Copied to clipboard', { duration: 1000 });
  }

  return (
    <div className='page editor'>
      <div className='view-head'>
        <NavLink to='/pastes' className='back-link'>← All notes</NavLink>
        <span className='view-meta'>{relativeTime(paste.createdAt)}</span>
      </div>

      <article className='editor-card view-card'>
        <h1 className='view-title'>{paste.title}</h1>
        <div className='view-content'>{paste.content || 'No content'}</div>

        <div className='editor-footer'>
          <div className='counter'>
            <span>{paste.content?.trim() ? paste.content.trim().split(/\s+/).length : 0} words</span>
          </div>
          <div className='editor-actions'>
            <button className='btn-ghost' onClick={handleCopy}>Copy</button>
            <NavLink className='btn-primary view-edit' to={`/?pasteId=${paste._id}`}>Edit note</NavLink>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ViewPastes
