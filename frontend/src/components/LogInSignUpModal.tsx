import { useDisclosure } from '@chakra-ui/hooks'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import React, { createContext, useContext } from 'react'
import { Form } from './Form'

interface modalValues {
   
    isOpen : boolean,
    onClose : ()=>void,
    onOpen : Function,
}

const LogInSignUpModal : React.FC<modalValues> = (props: modalValues) => {

    const {onClose,isOpen,onOpen} = props



    return (
        <Modal motionPreset="slideInBottom"  onClose={onClose} isOpen={isOpen}>
               
                <ModalOverlay />
                <ModalContent backgroundColor="transparent" w={['100vw','100vw','50vw','50vw']}>
                    <ModalBody>
                        <Form />
                    </ModalBody>
                </ModalContent>
                
        </Modal>
    )
}

export default LogInSignUpModal
