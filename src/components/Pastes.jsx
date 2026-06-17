import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Pastes.css'
import { removeFromPastes, togglePin } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { relativeTime } from '../utils/time';
import ConfirmDialog from './ConfirmDialog';

const Pastes = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [pendingDelete, setPendingDelete] = useState(null);
  const dispatch = useDispatch();

  const filteredData = pastes
    .filter((paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (paste.content || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice()
    .sort((a, b) => {
      // pinned always first
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return sortBy === 'oldest' ? ta - tb : tb - ta;
    });

  function confirmDelete(){
    if (pendingDelete) {
      dispatch(removeFromPastes(pendingDelete._id));
      setPendingDelete(null);
    }
  }

  function handleCopy(content){
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard', {duration:1000});
  }

  return (
    <div className='page'>
      <div className='notes-head'>
        <div>
          <h1 className='editor-heading'>My Notes</h1>
          <p className='editor-sub'>
            {pastes.length} {pastes.length === 1 ? 'note' : 'notes'} saved
          </p>
        </div>
      </div>

      <div className='toolbar'>
        <input className='search'
          type='search'
          placeholder='Search notes…'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className='sort-select' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='newest'>Newest first</option>
          <option value='oldest'>Oldest first</option>
          <option value='title'>Title A–Z</option>
        </select>
      </div>

      {filteredData.length > 0 ? (
        <div className='notes-grid'>
          {filteredData.map((paste) => (
            <article className={`note-card ${paste.pinned ? 'pinned' : ''}`} key={paste?._id}>
              <button
                className='pin-btn'
                onClick={() => dispatch(togglePin(paste._id))}
                title={paste.pinned ? 'Unpin' : 'Pin to top'}
                aria-label={paste.pinned ? 'Unpin note' : 'Pin note'}
              >
                {paste.pinned ? '📌' : '📍'}
              </button>

              <h2 className='note-title'>{paste.title}</h2>
              <p className='note-content'>{paste.content || 'No content'}</p>

              <div className='note-meta'>{relativeTime(paste.createdAt)}</div>

              <div className='note-actions'>
                <NavLink className='note-btn' to={`/pastes/${paste?._id}`}>View</NavLink>
                <NavLink className='note-btn' to={`/?pasteId=${paste?._id}`}>Edit</NavLink>
                <button className='note-btn' onClick={() => handleCopy(paste?.content)}>Copy</button>
                <button className='note-btn danger' onClick={() => setPendingDelete(paste)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className='empty-state'>
          <div className='empty-icon'>🗒️</div>
          <h3>{searchTerm ? 'No matching notes' : 'No notes yet'}</h3>
          <p>{searchTerm ? 'Try a different search.' : 'Create your first note to get started.'}</p>
          {!searchTerm && <NavLink className='btn-primary empty-cta' to='/'>Create a note</NavLink>}
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title='Delete note?'
        message={pendingDelete ? `"${pendingDelete.title}" will be permanently removed. This can't be undone.` : ''}
        confirmLabel='Delete'
        cancelLabel='Cancel'
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}

export default Pastes
