export const changeLevel = (levelName) => dispatch =>{
    dispatch({
        type: 'CHANGE_LEVEL',
        levelName
    })
}