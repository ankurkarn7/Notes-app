import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Pastes.css'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Pastes = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }

  function handleCopy(content){
    navigator.clipboard.writeText(content);
    toast.success('copied to clipboard', {duration:1000});
  }

  return (
    <div>
      <div>
        <input className='search'
          type='search'
          placeholder='Search here'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='notes'>
        {
          filteredData.length > 0 && filteredData.map(
            (paste) => {
              return(
                <div className='box' key={paste?._id} >
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='buttons'>
                    <button>
                      <NavLink to={`/pastes/${paste?._id}`}>
                        View
                      </NavLink>
                    </button>
                    <button>
                      <NavLink to={`/?pasteId=${paste?._id}`}>
                        Edit
                      </NavLink>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)} >Delete</button>
                    <button onClick={() => handleCopy(paste?.content)}>Copy</button>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Pastes
