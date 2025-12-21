import React from 'react'
import './LoadingSpinners.css'

type Props = {}

const LoadingSppiners = (props: Props) => {
    return (
        <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default LoadingSppiners;