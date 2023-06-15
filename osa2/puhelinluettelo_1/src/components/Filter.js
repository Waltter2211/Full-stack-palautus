const Filter = ({searchText, setSearchText}) => {
    return (
        <div>
          search: <input type="text" value={searchText} onChange={({target}) => setSearchText(target.value)}/>
        </div>
    )
}

export default Filter