import React, { useEffect, useState } from 'react'
import {useSearchParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import './Homec.css'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const pasteId = searchParams.get('pasteId');
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
      if(pasteId){
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste?.title || '');
        setValue(paste?.content || '');
      } else {
        setTitle('');
        setValue('');
      }
    }, [pasteId])

    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    const chars = value.length;

    function createPaste(){
      if(!title.trim() && !value.trim()){
        toast.error('Write something first ✍️');
        return;
      }

      const paste = {
        title : title.trim() || 'Untitled note',
        content : value,
        _id : pasteId || Date.now().toString(36),
        createdAt : new Date().toISOString(),
      }

      if(pasteId){
        dispatch(updateToPastes(paste));
        setTitle('');
        setValue('');
        navigate('/pastes');
        return;
      }

      dispatch(addToPastes(paste));
      setTitle('');
      setValue('');
      setSearchParams({});
    }

    function cancelEdit(){
      setTitle('');
      setValue('');
      navigate('/pastes');
    }

  return (
    <div className='page editor'>
      <div className='editor-head'>
        <h1 className='editor-heading'>{pasteId ? 'Edit note' : 'Create a note'}</h1>
        <p className='editor-sub'>{pasteId ? 'Make your changes and save.' : 'Jot down whatever is on your mind.'}</p>
      </div>

      <div className='editor-card'>
        <input className='title-input'
          type='text'
          placeholder='Note title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea className='content-input'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Start writing…'
          rows={14}
        />

        <div className='editor-footer'>
          <div className='counter'>
            <span>{words} {words === 1 ? 'word' : 'words'}</span>
            <span className='dot'>•</span>
            <span>{chars} {chars === 1 ? 'char' : 'chars'}</span>
          </div>
          <div className='editor-actions'>
            {pasteId && (
              <button className='btn-ghost' onClick={cancelEdit}>Cancel</button>
            )}
            <button className='btn-primary' onClick={createPaste}>
              {pasteId ? 'Save changes' : 'Create note'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
