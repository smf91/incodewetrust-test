import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { AppStateType } from '../Redux/redux-store'
import { toggleFavoriteJokeList, CurrentJokeType, removeJokeInFavoriteList } from '../Redux/appReducer'
import styled, { css } from 'styled-components'

interface IPropsStyled { open: boolean }

const Menu = styled.div<IPropsStyled>`
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 293;
    display: block;
    width: 400px;
    max-width: 100%;
    margin-top: 0px;
    padding-top: 100px;
    padding-right: 0px;
    align-items: stretch;
    background-color: #4CAF50;
    transform: translateX(-100%);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    ${props => props.open && css` transform: translateX(0); `}
`

const JokeItems = styled.div`
    background-color : #f0f0f0;
    margin: 20px 5px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
`
const BtnDelete= styled.button`
    display: block;
    height: 25px;
    width: 25px;
`
//----------TYPE BLOCK------------
type MapStateToPropsType = {
    isFavoriteJokeListOpen: boolean
    favoriteJokeList: Array<CurrentJokeType> | []
}
type MapDispathPropsType = {
    toggleFavoriteJokeList: () => void
    removeJokeInFavoriteList:(joke : CurrentJokeType)=> void
}
type OwnPropsType = {}
type PropsType = MapStateToPropsType & MapDispathPropsType & OwnPropsType
// ----------------------------------------------------------------------------
const FavoriteJokeBlock: React.FC<PropsType> = ({ removeJokeInFavoriteList, isFavoriteJokeListOpen, favoriteJokeList, children, ...props }) => {
    return <Menu open={isFavoriteJokeListOpen}>
        {favoriteJokeList.length !== 0
            ? (favoriteJokeList as Array<CurrentJokeType>).map((e) => {
                return <JokeItems>{e?.value} 
                <BtnDelete onClick={()=>{removeJokeInFavoriteList(e)}} >X</BtnDelete>
                </JokeItems>
            })
            : <></>
        }
    </Menu>
}
// ----------------------------------------------------------------------------
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isFavoriteJokeListOpen: state.app.isFavoriteJokeListOpen,
        favoriteJokeList: state.app.favoriteJokeList
    }
}
// -----------------------------------------------------------------------------
export default compose(
    connect<MapStateToPropsType, MapDispathPropsType, OwnPropsType, AppStateType>
        (mapStateToProps, {
            toggleFavoriteJokeList,
            removeJokeInFavoriteList
        })
)(FavoriteJokeBlock)