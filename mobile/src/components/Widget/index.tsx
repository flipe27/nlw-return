import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { ChatTeardropDots } from 'phosphor-react-native'
import { theme } from '../../theme'
import BottomSheet from '@gorhom/bottom-sheet'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Options } from '../Options'
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Form } from '../Form'
import { Sucess } from '../Sucess'

export type FeedbackType = keyof typeof feedbackTypes

function Widget() {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const[feedbackSent, setFeedbackSent] = useState(false)

    function handleOpen() {
        bottomSheetRef.current?.expand()
    }
    function handleRestartFeedback() {
        setFeedbackType(null)
        setFeedbackSent(false)
    }
    function handleFeedbackSent() {
        setFeedbackSent(true)
    }

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={handleOpen}>
                <ChatTeardropDots size={24} color={theme.colors.text_on_brand_color} weight="bold" />
            </TouchableOpacity>

            <BottomSheet ref={bottomSheetRef} snapPoints={[1, 280]} backgroundStyle={styles.modal} handleIndicatorStyle={styles.indicator}>
                {feedbackSent ? <Sucess onSendAnotherFeedback={handleRestartFeedback} /> : 
                <>
                    {feedbackType ? <Form feedbackType={feedbackType} onFeedbackCanceled={handleRestartFeedback} onFeedbackSent={handleFeedbackSent} /> : <Options onFeedbackTypeChanged={setFeedbackType} />}
                </>}
            </BottomSheet>
        </>
    )
}

export default gestureHandlerRootHOC(Widget)
