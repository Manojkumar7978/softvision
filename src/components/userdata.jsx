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
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    useToast
  } from '@chakra-ui/react'
import axios from 'axios'

export default function Userdata() {
    const {userData}=useContext(myContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate=useNavigate()
    const toast=useToast()

    useEffect(()=>{
        onOpen()
    },[])

    const deleteUser=()=>{
        axios.delete(`http://localhost:5000/users/${userData.id}`,{
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
            <Text fontSize={'20px'} fontWeight={'bold'}>{`Name : ${userData.firstName+' '+userData.lastName}`}</Text>
            <Text fontSize={'20px'} fontWeight={'bold'}>{`DOB : ${userData.dob}`}</Text>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
        
        </>
      }
    </div>
  )
}
