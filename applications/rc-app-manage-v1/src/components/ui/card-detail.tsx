import React, { type ReactNode } from 'react'

interface cardDetailProps {
    title: string
    icon?: ReactNode
    label: string
    value: string | number

}

const CardDetails: React.FC<cardDetailProps> = ({title, icon, value, label}) => {
  return (
    <div className='card-detail'>
        <div className="title-card">
            <span>{title}</span>
            {icon && icon}
        </div>

        <div className="detail">
            <p>{value}</p>
            <span>{label}</span>
        </div>
    </div>
  )
}

export default CardDetails