import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../Redux/redux-store'
import { clearFavoriteJokeList, removeJokeInFavoriteList, CurrentJokeType, giveJokeTC, addJokeInFavoriteList } from '../Redux/appReducer'
import styled from 'styled-components'
import FavoriteJokeButton from './FavoriteJokeButton_Components'

const BtnGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    
`
const Btn = styled.button`
    margin-top: 10px;
    background-color: #4CAF50;
    border: 1px solid green;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    width: 150px;
    display: block;
    :hover {
        background-color: #3e8e41;
    }
`
//----------TYPE BLOCK------------
type MapStateToPropsType = {
    isFavoriteJokeListOpen: boolean
    currentJoke: CurrentJokeType
    favoriteJokeList: Array<CurrentJokeType> | []
}
type MapDispathPropsType = {
    giveJokeTC: () => void
    addJokeInFavoriteList: () => void
    removeJokeInFavoriteList: (joke: CurrentJokeType) => void
    clearFavoriteJokeList: () => void
}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispathPropsType & OwnPropsType
// -------------------------------
const ButtonBlock: React.FC<PropsType> = ({ clearFavoriteJokeList, removeJokeInFavoriteList, addJokeInFavoriteList,
    giveJokeTC, currentJoke, favoriteJokeList, ...props }) => {

    const [FlowJokeBtn, setFlowJokeBtn] = useState(false)
    const toggleFlowJokeBtn = () => { setFlowJokeBtn(!FlowJokeBtn) }
    useEffect(() => {
        if (FlowJokeBtn === true) {
            const interval = setInterval(() => {giveJokeTC()},
            3000);
            return () => clearInterval(interval);
        }
    }, [FlowJokeBtn, giveJokeTC]);

    const RemoveOrAddJokeInFavoriteJokeList = () => {
        if (favoriteJokeList.length === 0 || favoriteJokeList.every(elem =>
            elem?.id !== currentJoke?.id)) {
            addJokeInFavoriteList()
        } else {
            removeJokeInFavoriteList(currentJoke)
        }
    }
    return (
        <BtnGroup>
            <FavoriteJokeButton />
            <Btn onClick={giveJokeTC}>{currentJoke ? "Next joke" : "Show joke"}</Btn>
            <Btn onClick={toggleFlowJokeBtn}>{FlowJokeBtn ? 'Flow joke OFF' : 'Flow joke ON'}</Btn>
            <Btn onClick={RemoveOrAddJokeInFavoriteJokeList}>
                {(favoriteJokeList.some(e => e?.id === currentJoke?.id)) ? 'Remove from favorites' : 'Add to favorites'}
            </Btn>
            <Btn onClick={clearFavoriteJokeList}>Clear Favorit list</Btn>
        </BtnGroup>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isFavoriteJokeListOpen: state.app.isFavoriteJokeListOpen,
        currentJoke: state.app.currentJoke,
        favoriteJokeList: state.app.favoriteJokeList
    }
}
// -----------------------------------------------------------------------------
export default compose(
    connect<MapStateToPropsType, MapDispathPropsType, OwnPropsType, AppStateType>
        (mapStateToProps, {
            giveJokeTC,
            addJokeInFavoriteList,
            removeJokeInFavoriteList,
            clearFavoriteJokeList
        })
)(ButtonBlock)