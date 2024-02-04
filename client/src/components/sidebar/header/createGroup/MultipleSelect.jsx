import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const MultipleSelect = ({
    selectedUsers,
    searchResults,
    setSelectedUsers,
    handleSearch
}) => {

  return (
    <div className=' mt-4'>
    <Select  
    options={searchResults} 
    placeholder="Search, select users"
    onChange={setSelectedUsers}
    onKeyDown={(e)=>handleSearch(e)}
    isMulti
    formatOptionLabel={(user)=>(
      <div className='flex items-center gap-1'>
        <img className='w-8 h-8 object-cover rounded-full' src={user.picture} alt="" />
        <span className='text-[#222]'>{user.label}</span>
      </div>
    )}
    styles={{
        control:(baseStyles,state)=>({
            ...baseStyles,
            border:"none",
            background:"transparent",
        })
    }}
    />
    </div>
  )
}

export default MultipleSelect