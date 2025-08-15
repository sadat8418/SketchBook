import React from 'react'
import companyLogo from '../assets/a.png';

function Logo({width = '100px'}) {
  return (
    <div className='flex items-center' style={{width}}>
 <img src={companyLogo} alt="BigCo Inc. logo"/>    </div>

  )
}

export default Logo