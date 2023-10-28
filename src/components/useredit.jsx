import { Box, Input ,Heading} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { myContext } from './context'

export default function Useredit() {
    let {userData}=useContext(myContext)
  return (
    <Box width={'50%'} margin={'auto'} mt={10} padding={10} boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'>
        <form>
            <Heading textAlign={'center'}>Edit your Data</Heading>
            <span>User Name</span>
            <Input type='text' value={userData.userName} name={'userName'}/>
            <span>First Name</span>
            <Input type='text' value={userData.firstName} name={'firstName'}/>
            <span>Last Name</span>
            <Input type='text' value={userData.lastName} name={'lastName'}/>
            <span>Mobile No.</span>
            <Input type='number' value={userData.mobileNo} name={'mobileNo'}/>
            <span>Email Id</span>
            <Input type='email' value={userData.emailId} name={'emailId'}/>
            <Input cursor={'pointer'} mt={10} color={'white'} bg={'blue'} type='submit' value={'Update'} />
        </form>

      
    </Box>
  )
}
