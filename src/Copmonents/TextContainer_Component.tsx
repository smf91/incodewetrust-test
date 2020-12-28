import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../Redux/redux-store'
import styled from 'styled-components'

const ContentBlock = styled.div`
    margin: auto;
    height: 150px;
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content : center;
    align-items: center;
    text-align: center;
    font-size: 22px;
    
`
//----------TYPE BLOCK------------
type MapStateToPropsType = {
    isFavoriteJokeListOpen: boolean
    currentJoke :{ id: string, value: string} | null
}
type MapDispathPropsType = {}
type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispathPropsType & OwnPropsType
// -------------------------------
const Content: React.FC<PropsType> = ({currentJoke, ...props}) => {
    return (
        <ContentBlock>
            <span>{currentJoke ?currentJoke.value : null}</span>
        </ContentBlock>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isFavoriteJokeListOpen: state.app.isFavoriteJokeListOpen,
        currentJoke: state.app.currentJoke
    }
}
// -----------------------------------------------------------------------------
export default compose(
    connect<MapStateToPropsType, MapDispathPropsType, OwnPropsType, AppStateType>
        (mapStateToProps, {
            
        })
)
    (Content)