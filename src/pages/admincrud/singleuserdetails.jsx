import React from 'react'
import { useParams } from 'react-router-dom';

const SingleUserDetails = () => {
    const { uid } = useParams();
  return (
    <div>
      SingleUserid - {uid}
    </div>
  )
}

export default SingleUserDetails
