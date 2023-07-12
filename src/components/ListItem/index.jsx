import './index.css'
import PropTypes from 'prop-types'

/**
 * List Item
 */
function ListItem({ item, onDelete }) {
  //call onDelete function with item id
  const deleteItem = () => {
    onDelete(item.id)
  }

  return (
    <div className="listitem">
      {item.title}
      <button className="listitem__button" onClick={deleteItem}>
        Delete
      </button>
    </div>
  )
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  onDelete: PropTypes.func,
}

export default ListItem
