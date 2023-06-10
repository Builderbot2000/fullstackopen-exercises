import { filterChange } from '../reducers/filterReducer'
import { useDispatch, useSelector } from 'react-redux'

const Filter = (props) => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
        event.target.value = ''
        dispatch(filterChange(content))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div>
            filter
            <input
                style={style}
                name="filter"
                value={useSelector(state => state.filter)}
                onChange={handleChange}
            />
        </div>
    )
}

export default Filter