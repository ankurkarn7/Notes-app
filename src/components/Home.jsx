import React, { useEffect, useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Homec.css'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get('pasteId');
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
      if(pasteId){
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste?.title);
        setValue(paste?.content);
      }
    }, [pasteId])
    

    function createPaste(){
      const paste = {
        title : title,
        content : value,
        _id : pasteId || Date.now().toString(36),
        createdAt : new Date().toISOString(),
      }

      if(pasteId){
        // update
        dispatch(updateToPastes(paste));
      }else{
        // create
        dispatch(addToPastes(paste));
      }

      //clean title and content after updation or creation
      setTitle('');
      setValue('');
      setSearchParams({});
    }

  return (
    <div>
      <div className='type'>
        <input className='title'
          type = 'text'
          placeholder = 'enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createPaste}>
          {
            pasteId ? 'Upadte my note' : 'Create my note'
          }
        </button>
      </div>
      <div>
        <textarea className='content'
          value = {value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Enter content here '
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home
