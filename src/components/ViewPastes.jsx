import React, { useEffect, useState } from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const ViewPastes = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];


  return (
    <div>
      <div className='type'>
        <input className='title'
          type = 'text'
          placeholder = 'enter title here'
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
        />
        {/* <button onClick={createPaste}>
          {
            pasteId ? 'Upadte my note' : 'Create my note'
          }
        </button> */}
      </div>
      <div>
        <textarea className='content'
          value = {paste.content}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Enter content here '
          rows={20}
          disabled
        />
      </div>
    </div>
  )
}

export default ViewPastes
