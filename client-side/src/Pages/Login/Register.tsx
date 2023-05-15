import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");


  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: ""
  })
  
  // Submit form function 
  const handleOnSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = (e: { target: {
    [x: string]: any; value: any; 
}; }) => {
    const value = e.target.value
    setValues({
      ...values,
      [e.target.name]: value,
    })
  }


  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
        <h1 className="text-lg font-bold">Register</h1>
        <form onSubmit={handleOnSubmit} className="flex flex-col mt-4">
          <input
            onChange={handleOnChange}
            type="text"
            name="name"
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Name"
            value={values.name}
          />
          <input
            onChange={handleOnChange}
            type="text"
            name="lastName"
            className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Last name"
            value={values.lastName}
          />

          <input
            onChange={handleOnChange}
            type="email"
            name="email"
            className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Email address"
            value={values.email}
          />
          <input
            onChange={handleOnChange}
            type="password"
            name="password"
            className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Password"
            value={values.password}
          />

          <button
            type="submit"
            className="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex w-full justify-center items-center font-medium"
          >
            Register
          </button>
          <div className="flex flex-col items-center mt-5">
            <p className="mt-1 text-xs font-light text-gray-500">
              Register already?
              <Link to="/login" className="ml-1 font-medium text-blue-400">
                Login now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
