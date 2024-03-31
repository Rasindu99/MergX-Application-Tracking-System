import React from 'react';

const Card = ({ title, value }) => {
    return (
        <div className='w-170px h-170px' style={{backgroundImage: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 100%)',borderRadius: '30px',display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'#191919'}}>
            <div style={{margin: '0 auto'}}>
                <p style={{color:'#ffffff', fontSize:'1rem', textAlign:'center'}}>{title}</p>
                <h1 style={{color:'#EA7122', fontSize: '5rem', marginLeft:'0.8rem',textAlign: 'center'}}>{value}</h1>
            </div>
        </div>
    );
};

export default Card;