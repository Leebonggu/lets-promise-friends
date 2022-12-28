import React from 'react'
import { PromiseType } from '../types';

interface Props {
  title: string;
  loading: boolean;
  value: PromiseType
  onClick: (value: PromiseType) => void;
}
function Button({ title, loading, onClick, value }: Props) {
  return (
    <button 
      className={`${loading ? 'bg-blue-300 opacity-50 cursor-not-allowed' :'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
      onClick={() => onClick(value)}
    >
      {loading ? 'loading...' : title  }
    </button>
  )
}

export default Button