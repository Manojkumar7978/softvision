import React, { useContext, useRef, useState } from 'react'
import { Box, Heading, Input, chakra, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { myContext } from './context';

export default function Signup() {
    let formRef = useRef(null)
    let signinRef=useRef(null)
    let [validMob, setValid] = useState(true)
    const toast = useToast()
    const navigate=useNavigate()
    let {setUserData}=useContext(myContext)
    console.log(process.env.REACT_APP_PORT)
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: '',
        mobileNo: '',
        emailId: '',
    });
    const [signinData,setSigninData]=useState({
        userName:"",
        password:""
    })

    const handelSignupChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handelSigninChange = (e) => {
        const { name, value } = e.target;

        setSigninData({
            ...signinData,
            [name]: value,
        });
    };

    const handelSignup = (e) => {
        e.preventDefault();
        const mobileType = /^[0-9]{10}$/;
        if (mobileType.test(formData.mobileNo)) {
            // console.log(process.env.PORT)
            axios.post(`http://localhost:${process.env.REACT_APP_PORT}/users`, formData)
            formRef.current.reset();
            setValid(true)
            setFormData({
                userName: '',
                password: '',
                firstName: '',
                lastName: '',
                dob: '',
                mobileNo: '',
                emailId: '',
            })
            toast({
                title: 'Account created.',
                description: "Account created Sucessfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } else {
            setValid(false)
        }

    }

    const handelSignin=async (e)=>{
        e.preventDefault()
        signinRef.current.reset()
        console.log(process.env.REACT_APP_PORT)
        let user=await axios.get(`http://localhost:${process.env.REACT_APP_PORT}/users?userName=${signinData.userName}&&password=${signinData.password}`)
        if(user.data.length===1){
            setUserData(user.data[0])
            navigate('/userData')
        }else{
            toast({
                title: 'User not found',
                description: "Please enter correct details",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    



    return (
        <chakra.div padding={10} margin={'auto'} display={'flex'} gap={5}>
            <Box className='signup' width={'50%'}
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
                padding={10}

            >
                <form ref={formRef} onSubmit={handelSignup} >
                    <Heading textAlign={'center'}>Sign Up</Heading>
                    <span>User Name</span>
                    <Input type='text' name='userName' onChange={handelSignupChange} />
                    <span>Password</span>
                    <Input type='password' name='password' onChange={handelSignupChange} />
                    <span>First Name</span>
                    <Input type='text' name='firstName' onChange={handelSignupChange} />
                    <span>Last Name</span>
                    <Input type='text' name='lastName' onChange={handelSignupChange} />
                    <span>Date of Birth</span>
                    <Input type='date' name='dob' onChange={handelSignupChange} />
                    <span>Mobile no.</span>
                    <Input type='number' name='mobileNo' onChange={handelSignupChange} />
                    {validMob ? <></> : <chakra.span color={'red'} >Please enter a Valid Number</chakra.span >}
                    <br />
                    <span>Email Id</span>
                    <Input type='email' name='emailId' onChange={handelSignupChange} />
                    <Input type='submit' value={'Sign Up'} mt={5} color={'white'} bg={'blue'} cursor={'pointer'} />
                </form>

            </Box>
            <Box className='login' width={'50%'}
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
                padding={10}
            >
                <form ref={signinRef} onSubmit={handelSignin}  >
                    <Heading textAlign={'center'}>Sign In</Heading>
                    <span>User Name</span>
                    <Input type='text' name='userName' onChange={handelSigninChange} />
                    <span>Password</span>
                    <Input type='password' name='password'  onChange={handelSigninChange}/>
                    <Input type='submit' value={'Sign In'} mt={5} color={'white'} bg={'blue'} cursor={'pointer'} />
                </form>

            </Box>

        </chakra.div>
    )
}
