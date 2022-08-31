import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FormInput, FormMultiText } from "../components/FormEntry";
import write from "../assets/writer.png";

const Create = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [writer, setWriter] = useState({
        image: "", author: "", title: "", content: ""
    });

    const [article, setArticle] = useState(null);

    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const createArticle = async () => {
            try {
                let newArticle = {image: writer.image, author: writer.author, title: writer.title, content: writer.content};
                await axios.post("https://cumandra-api.herokuapp.com/create/", newArticle);
                setLoading(false); setArticle(newArticle);
            } catch (error) {
                setLoading(false); error?.message && setError("Unable to create article");
            }
        };
        createArticle();
    };
    
    const handleChange = (e) => {
        setWriter({...writer, [e.target.name] : e.target.value});
    };

    const handleLogout = () => {
        navigate('/login');
        sessionStorage.removeItem('username');
    }

    useEffect(() => {
        document.title = 'Cumandra - Create Blog';
    }, [])

  return (
    <>
        <header className="h-[80vh] bg-[url('https://img.freepik.com/free-photo/i-ve-missed-you-very-much_637285-12200.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
            <div className='bg-black bg-opacity-60 h-full flex flex-col justify-center items-center'>
                <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInDown animate__slow">
                    <h2 className='text-4xl font-bold'>WE MISSED YOU!</h2>
                    <p className='text-xl mx-auto'>We can't wait to read your next article</p>
                </div>
            </div>
        </header>

        <section className='flex flex-row justify-between items-center p-5'>
            <form onSubmit={handleSave} autoComplete="off" className='p-5 w-full md:p-10 md:w-1/2 animate__animated animate__lightSpeedInLeft animate__slow'>
                <FormInput label="Upload cover image" name="image" type="file" accept="image/*" value={writer.image} onchange={handleChange} required/>
                <FormInput label="Author" name="author" type="text" value={writer.author} onchange={handleChange} placeholder="Enter author name" required/>
                <FormInput label="Title" name="title" type="text" value={writer.title} onchange={handleChange} placeholder="Enter article title" required/>
                <FormMultiText label="Article" name="content" value={writer.content} onchange={handleChange} placeholder="Write your article here..." required/>

                {loading ? <p className='text-center text-white my-3'>Loading...</p> : error ? <p className='text-center text-red-400 my-3'>{error}</p> : article && <p className='text-center text-white my-3'>Article saved</p>}

                <button type="submit" className="btn">Save</button>
                <button className='btn bg-red-600 hover:bg-red-500 ml-3' onClick={handleLogout}>Log Out</button>
            </form>

            <div className='hidden animate__animated animate__lightSpeedInRight animate__slow md:block md:w-1/2'>
                <img src={write} className='w-full h-full' alt="image" />
            </div>
        </section>
    </>
  )
}

export default Create