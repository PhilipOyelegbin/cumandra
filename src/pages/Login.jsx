import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../components/FormEntry';
import signin from '../assets/signin.png';

const Login = () => {
    // a state for showing error
    const [input_error, setInput_error] = useState('');
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({username: '', password: ''});
    
    const [data, setData] = useState({username: '', password: ''});

    const formAttributes = [
        {id: 1, label: "Username", name: "username", type: "text", placeholder: "Enter username"},
        {id: 2, label: "Password", name: "password", type: (`${show ? "text" : "password"}`), placeholder: "xxxxxx"}
    ];

    useEffect(() => {
        document.title = "Cumandra - Login Page"
        fetch("https://api.steinhq.com/v1/storages/6308a9527bccea08c11432cb/Sheet1")
            .then(res => res.json())
            .then(data => data.map(obj => setData(obj)))
            .catch(err => err)
    }, []);

    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        if (data?.username !== values.username || data?.password !== values.password) {
            setInput_error('Data does not match, Please register!')
        } else {
            sessionStorage.setItem('username', values.username);
            navigate('/create');
        }
    };

    const handleChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value});
    }

  return (
    <>
        <header className="h-[80vh] bg-[url('https://img.freepik.com/free-photo/business-finance-employment-female-successful-entrepreneurs-concept-friendly-smiling-office-manager-greeting-new-coworker-businesswoman-welcome-clients-with-hand-wave-hold-laptop_1258-59122.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
            <div className='bg-black bg-opacity-60 h-full flex flex-col justify-center items-center'>
                <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInDown animate__slow">
                    <h2 className='text-4xl font-bold'>WELCOME BACK</h2>
                    <p className='text-xl mx-auto'>Nice to see you again!</p>
                </div>
            </div>
        </header>

        <section className='flex flex-row justify-between items-center p-5'>
            <form onSubmit={handleLogin} autoComplete="off" className='p-5 w-full md:p-10 md:w-1/2 animate__animated animate__lightSpeedInLeft animate__slow'>
                <h3 className='text-xl text-center font-semibold'>Login to create a blog</h3>
                {formAttributes?.map(obj => (
                    <FormInput key={obj.id} {...obj} value={values[obj.name]} onchange={handleChange}/>
                ))}
                <div className='flex items-center gap-1'>
                    <input className='w-5 h-5' type="checkbox" name="show" onClick={() => setShow(prev => !prev)} />
                    <label htmlFor="show">Show password</label>
                </div>

                <p className='text-xl text-center text-red-900 font-bold my-5'>{input_error}</p>
                    
                <button type='submit' className='btn'>Sign In</button>

                <p className='text-center text-sm mt-3'>Don't have an account? <Link className='text-indigo-500 font-bold' to='/register'>Create one!</Link></p>
            </form>

            <div className='hidden animate__animated animate__lightSpeedInRight animate__slow md:block md:w-1/2'>
                <img src={signin} className='w-full h-full' alt="image" />
            </div>
        </section>
    </>
  )
}

export default Login