import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from "../components/FormEntry";
import signup from '../assets/signup.png';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [regError, setRegerror] = useState(false);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        username: "", first_name: "", last_name: "", email: "", password: "", cpassword: ""
    });

    const [storeddata, setStoreddata] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setRegerror(false);
        if (user?.username === "" || user.username.includes(" ")) {
            setRegerror('username cannot be empty and should not include space')
        } else if (user?.first_name === "") {
            setRegerror('First name cannot be empty')
        } else if (user?.last_name === "") {
            setRegerror('Last name cannot be empty')
        } else if (user?.email === "") {
            setRegerror('Email cannot be empty')
        } else if (user?.password === "" || user.password.length < 6) {
            setRegerror('Password cannot be empty and must be at least 6 characters')
        } else if (user?.cpassword !== user.password) {
            setRegerror('Password does not match')
        } else {
            setLoading(true)
            let newUser = [{username: user.username, first_name: user.first_name, last_name: user.last_name, email: user.email, password: user.password, cpassword: user.cpassword}];
            fetch("https://api.steinhq.com/v1/storages/6308a9527bccea08c11432cb/Sheet1", {
                method: "POST", content: "application/json", body: JSON.stringify(newUser)
            }).then(()=> {
                setLoading(false); setStoreddata(newUser); navigate('/login');
            }).catch(err => {
                setLoading(false); err && setError("Unable to register user")
            })
        }
    };

    const handleChange = (e) => {
        const {value, name} = e.target
        setUser({...user, [name]: value})
    }

    useEffect(() => {
      document.title = "Cumandra - Registration Page"
    }, [])
    

  return (
    <>
        <header className="h-[80vh] bg-[url('https://img.freepik.com/free-photo/confident-brunette-girl-showing-team-members-great-link-gain-new-skills-pointing-fingers-down-inviting-join-courses-group-smiling-advertise-product-standing-white-background_176420-51452.jpg?size=626&ext=jpg&ga=GA1.2.405634466.1654584137')] bg-center bg-no-repeat bg-cover bg-fixed">
            <div className='bg-black bg-opacity-60 h-full flex flex-col justify-center items-center'>
                <div className="w-5/6 flex flex-col justify-center items-center gap-5 text-center animate__animated animate__fadeInDown animate__slow">
                    <h2 className='text-4xl font-bold'>BECOME A MEMBER</h2>
                    <p className='text-xl mx-auto'>Get full access to post articles on the website</p>
                </div>
            </div>
        </header>

        <section className="flex flex-row justify-between items-center p-5">
            <form onSubmit={handleSubmit} autoComplete="off" className="p-5 w-full md:p-10 md:w-1/2 animate__animated animate__lightSpeedInLeft animate__slow">
                <h3 className="text-xl text-center font-semibold">Create an account</h3>
                <FormInput label="Username" type="text" name="username" value={user.username} onchange={handleChange} placeholder="Enter Username"/>
                <FormInput label="First name" type="text" name="first_name" value={user.first_name} onchange={handleChange} placeholder="Enter first name"/>
                <FormInput label="Last name" type="text" name="last_name" value={user.last_name} onchange={handleChange} placeholder="Enter last name"/>
                <FormInput label="Email" type="email" name="email" value={user.email} onchange={handleChange} placeholder="example@mail.com"/>
                <FormInput label="Password" type={`${show ? "text" : "password"}`} name="password" value={user.password} onchange={handleChange} placeholder="xxxxxx"/>
                <FormInput label="Confirm Password" type={`${show ? "text" : "password"}`} name="cpassword" value={user.cpassword} onchange={handleChange} placeholder="xxxxxx"/>
                {/* <div className='flex items-center gap-1 my-3'>
                    <input className='w-auto' type="checkbox" name='Terms' checked={user.Terms} onChange={handleChange} />
                    <label htmlFor="terms">Accept terms and conditions</label>
                </div> */}

                <div className='flex items-center mb-3 gap-1'>
                    <input className='w-5 h-5' type="checkbox" name="show" onClick={() => setShow(prev => !prev)} />
                    <label htmlFor="show">Show password</label>
                </div>

                {regError ? <p className='text-center text-yellow-500 my-3'>{regError}</p> : loading ? <p className='text-center text-white my-3'>Loading...</p> : error ? <p className='text-center text-yellow-500 my-3'>{error}</p> : storeddata }

                <button type="submit" className="btn">Submit</button>

                <p className='text-center text-sm mt-3'>Already have an account? <Link className='text-indigo-500 font-bold' to='/login'>Log in!</Link></p>
            </form>

            <div className="hidden animate__animated animate__lightSpeedInRight animate__slow md:block md:w-1/2">
                <img src={signup} className='w-full h-full' alt="image" />
            </div>
        </section>
    </>
  )
}

export default Register