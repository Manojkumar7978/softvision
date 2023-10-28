import React, { useContext, useEffect } from 'react'
import { myContext } from './context'
import { Navigate, useNavigate } from 'react-router-dom'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    // ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    useToast
  } from '@chakra-ui/react'
import axios from 'axios'

export default function Userdata() {
    const {userData,setUserData}=useContext(myContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate=useNavigate()
    const toast=useToast()

    useEffect(()=>{
        onOpen()
    },[])

    const deleteUser=()=>{
        axios.delete(`http://localhost:${process.env.REACT_APP_PORT}/users/${userData.id}`,{
          headers: {
            Authorization: `Bearer ${null}`,
          },
        })
        .then((res)=>{
            toast({
                title: 'Account deleted.',
                description: "Account deleted Sucessfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            navigate('/')
        })
        .catch((err)=>{

        })
    }

    const formatDate=(inputDate)=>{
      let datearr=inputDate.split('-')
      let day=datearr[2]
      let month=datearr[1]
      let year=datearr[0]
      const months=[
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      if(month<=9){
        month=months[month[1]-1]
      }else{
         month=months[month-1]
      }
      
      let newDate=`${day}-${month}-${year}`
     return newDate
  }

    

  return (
    <div>
      {
        userData===null ? <>
        {
            <Navigate to={'/'} />
        }
        </> :<>
        <Modal isOpen={isOpen} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader margin={'auto'}>User Details</ModalHeader>
          <ModalBody>
          <Text fontSize={'20px'} fontWeight={'bold'}>{`User name : ${userData.userName}`}</Text>
            <Text fontSize={'20px'} fontWeight={'bold'}>{`Name : ${userData.firstName+' '+userData.lastName}`}</Text>
            <Text fontSize={'20px'} fontWeight={'bold'}>{`DOB : ${formatDate(userData.dob)}`}</Text>
            <Text fontSize={'20px'} fontWeight={'bold'}>{`Mobile No. : ${userData.mobileNo} `}</Text>
            <Text fontSize={'20px'} fontWeight={'bold'}>{`Email : ${userData.emailId}`}</Text>
          </ModalBody>

          <ModalFooter gap={5}>
            <Button variant='solid' colorScheme='blue'
            onClick={()=>{
                navigate('/userData/edit')
            }}
            >Edit</Button>
            <Button variant='solid' colorScheme='blue'
            onClick={deleteUser}
            >Delete your id</Button>
            <Button variant='solid' colorScheme='blue'
            onClick={()=>{
                setUserData(null)
            }}
            >Logout</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        
        </>
      }
    </div>
  )
}
