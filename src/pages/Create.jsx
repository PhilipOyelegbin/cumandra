import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput, FormMultiText } from "../components/FormEntry";
import write from "../assets/writer.png";

const Create = () => {
    const [errormsg, setErrormsg] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [writer, setWriter] = useState({
        image: "", author: "", title: "", content: ""
    });

    const [article, setArticle] = useState(null);

    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true)
        if (writer.image === "" || writer.image.includes(" ")) {
            setErrormsg("Image URL cannot be empty and should not include space")
        } else if (writer.author === "") {
            setErrormsg("Author's name cannot be empty")
        } else if (writer.title === "") {
            setErrormsg("Title cannot be empty")
        } else if (writer.content === "") {
            setErrormsg("Content cannot be empty")
        } else {
            let newArticle = [{image: writer.image, author: writer.author, title: writer.title, content: writer.content}]
            fetch("https://api.steinhq.com/v1/storages/6308a9527bccea08c11432cb/Sheet2", {
                method: "POST", content: "application/json", body: JSON.stringify(newArticle)
            }).then(()=> {
                setLoading(false); setArticle(newArticle); navigate('/');
            }).catch(err => {
                setLoading(false); err && setError("Unable to save article")
            })
        }
    };

    const handleChange = (e) => {
        setWriter({...writer, [e.target.name] : e.target.value});
    };

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
                <FormInput label="Enter image URL" name="image" type="url" value={writer.image} onchange={handleChange} placeholder="https://"/>
                <FormInput label="Author" name="author" type="text" value={writer.author} onchange={handleChange} placeholder="Enter author name"/>
                <FormInput label="Title" name="title" type="text" value={writer.title} onchange={handleChange} placeholder="Enter article title"/>
                <FormMultiText label="Article" name="content" value={writer.content} onchange={handleChange} placeholder="Write your article here..."/>

                {errormsg ? <p className='text-center text-yellow-500 my-3'>{errormsg}</p> : loading ? <p className='text-center text-white my-3'>Loading...</p> : error ? <p className='text-center text-yellow-500 my-3'>{error}</p> : article }

                <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-500">Save</button>
            </form>

            <div className='hidden animate__animated animate__lightSpeedInRight animate__slow md:block md:w-1/2'>
                <img src={write} className='w-full h-full' alt="image" />
            </div>
        </section>
    </>
  )
}

export default Create