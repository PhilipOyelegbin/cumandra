import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput} from '../components/FormEntry';
import hero from '..//assets/hero.png'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [articles, setArticles] = useState(null)

    const navigate = useNavigate();
    
    const handleRead = () => {
        navigate('/blogboard');
    }

    const handleSubscribe = (e) => {
        e.preventDefault();
        setLoading(true)
    }

    useEffect(() => {
        fetch("https://api.steinhq.com/v1/storages/6308a9527bccea08c11432cb/Sheet2")
            .then((res) => res.json())
            .then(data => {
                setLoading(false); setArticles(data)
            })
            .catch(err => {
                setLoading(false); err && setError("Unable to load articles")
            })
    }, [])

    console.log(articles);
    

  return (
    <>
        <header className='h-screen flex flex-col-reverse md:flex-row justify-center items-center'>
            <div className='w-5/6 px-3 md:px-20 md:w-1/2 animate__animated animate__lightSpeedInLeft animate__slow'>
                <h2 className='text-4xl font-bold text-center my-5 md:text-left md:w-96'>Lorem ipsum dolor sit amet.</h2>
                <p className='text-xl text-center my-5 md:text-left md:w-96'>Lorem ipsum dolor sit amet consectetur adipisicing elit, nostrum accusamus possimus illo quos earum?</p>
                <div className='flex justify-center gap-5 my-5 md:justify-start'>
                    <Link to="#blogs" className='btn'>Get Stared</Link>
                    <Link to="/register" className='btn text-[#C31192] bg-slate-200 hover:text-slate-200 hover:bg-[#C31192]'>Sign Up</Link>
                </div>
            </div>
            <div className='w-5/6 px-3 md:px-5 md:w-1/2 animate__animated animate__fadeInDown animate__slow'>
                <img src={hero} alt="hero-image" />
            </div>
        </header>
        <section id="blogs" className='px-3 my-20 md:my-10 md:px-20'>
            <h2 className='text-3xl text-center font-bold'>Curated Articles Just For You!</h2>
            <div className='grid grid-cols-1 gap-5 p-2 md:grid-cols-2 lg:grid-cols-3 mt-5'>
                {loading ? (<h2 className='text-2xl text-center'>Loading...</h2>) : error ? (<h2 className='text-2xl text-center'>{error}</h2>) : articles && articles?.map(article => {
                return (<figure className='flex flex-col hover:-translate-y-2 duration-300' key={article.title}>
                            <img className='rounded-t-2xl' src={article.image || "cover-image"} alt="cover_image" />
                            <figcaption className='bg-slate-500 px-3 py-5 rounded-b-2xl'>
                                <h3 className='text-xl font-bold'><span className='text-[#C31192]'>{article.author || "Unknown"}</span> - {article.title || "Unknown"}</h3>
                                <p className='my-3'>{article.content}</p>
                                {/* <p className='mb-5'>Comments:<span className='rounded-full bg-rose-500 text-white px-2 py-1 ml-1'>{article.comments_count}</span></p> */}
                                <Link to={article.url || "#"} className='btn w-36 text-center'>Read more</Link>
                            </figcaption>
                        </figure>)
                    })
                }
            </div>
        </section>
        <section className='px-3 mb-20 md:px-20'>
            <h2 className='text-3xl text-center font-bold'>Subscribe To Our Newsletter</h2>
            <form onSubmit={handleSubscribe} className="form-control text-xl md:flex-row md:items-center px-3">
                <FormInput type="email" name="email" classname="border px-5 h-14" placeholder="example@email.com" required/>
                <button type="submit" className="btn bg-slate-600 hover:bg-slate-500 hover:text-white h-14 rounded-none">SUBSCRIBE</button>
            </form>
        </section>
    </>
  )
}

export default Home