import { Box, Input ,Heading,chakra} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { myContext } from './context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Useredit() {
    let {userData,setUserData}=useContext(myContext)
    let [newData,setnewData]=useState({...userData})
    let [validMob, setValid] = useState(true)
    const navigate=useNavigate()

    
    const handelChange=(e)=>{
        const { name, value } = e.target;

        setnewData({
            ...newData,
            [name]: value,
        });
    }

    const updateData=(e)=>{
        e.preventDefault()
        const mobileType = /^[0-9]{10}$/;
        if (mobileType.test(newData.mobileNo)){
            setValid(true)
            axios.put(`http://localhost:5000/users/${userData.id}`, newData)
            .then((res)=>{
                setUserData({...newData})
            })
            navigate('/userData')
        }else{
            setValid(false)
        }
    }

  return (
    <Box width={'50%'} margin={'auto'} mt={10} padding={10} boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
        <form onSubmit={updateData}>
            <Heading textAlign={'center'}>Edit your Data</Heading>
            <span>User Name</span>
            <Input type='text' defaultValue={userData.userName} name={'userName'} onChange={handelChange}/>
            <span>First Name</span>
            <Input type='text' defaultValue={userData.firstName} name={'firstName'} onChange={handelChange}/>
            <span>Last Name</span>
            <Input type='text' defaultValue={userData.lastName} name={'lastName'} onChange={handelChange}/>
            <span>DOB</span>
            <Input type='date'  name={'dob'} onChange={handelChange}/>
            <span>Mobile No.</span>
            <Input type='number' defaultValue={userData.mobileNo} name={'mobileNo'} onChange={handelChange}/>
            {validMob ? <></> : <chakra.span color={'red'} >Please enter a Valid Number</chakra.span >}
                    <br />
            <span>Email Id</span>
            <Input type='email' defaultValue={userData.emailId} name={'emailId'} onChange={handelChange}/>
            <Input cursor={'pointer'} mt={10} color={'white'} bg={'blue'} type='submit' value={'Update'} />
        </form>

      
    </Box>
  )
}
