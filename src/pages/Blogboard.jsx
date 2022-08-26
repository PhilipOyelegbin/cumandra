import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import register from '../assets/register.jpg';
import {useAxiosGet} from '../hooks/useAxiosAsync';

const Blogboard = () => {
  const {url} = useParams()
  const {loading, error, data: articles} = useAxiosGet(url)

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Cumandra - Blogboard';
  }, []);

  return (
    <section className=''>
      <section className='p-3'>
        <h2 className='text-2xl text-center font-bold'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
        <div className='flex flex-col'>
          {articles?.map(article => {
          return (<figure className='card' key={article.id}>
                    <img src={article.cover_image || register} alt="cover_image" />
                    <figcaption>
                        <h3 className='text-xl font-bold'>{article.title} - {article.readable_publish_date}</h3>
                        <p>{article.body}</p>
                        <p>Comments:<span className='rounded-full bg-rose-500 text-white px-2 py-1 ml-1'>{article.comments_count}</span></p>
                    </figcaption>
                  </figure>)
              })
          }
        </div>
      </section> 
      <button className="btn bg-slate-600 hover:bg-slate-500" onClick={() => navigate('/')}>Go back</button>
    </section>
  )
}

export default Blogboard