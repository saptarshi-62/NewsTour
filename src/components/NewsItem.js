import React from 'react'

const NewsItem=(props)=>{
    let {title, description,imageUrl,newsUrl,author,date,source}=props;
    return (
      <div className="my-4">
        <div className="card" >
        <img src={!imageUrl?"https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750,h_375/https://www.psypost.org/wp-content/uploads/2025/06/brain-activity-750x375.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...<span className="badge text-bg-secondary">{source.name.length>=35?source.name.slice(0,35)+"...":source.name}</span></h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More...</a>
        </div>
        </div>
      </div>
    )
}
export default NewsItem
