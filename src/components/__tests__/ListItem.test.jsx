import { render, screen, fireEvent } from '@testing-library/react'
import ListItem from '../ListItem'

describe('ListItem', () => {
  it('should render correctly', () => {
    const item = { id: '1', title: 'New Task' }
    render(<ListItem item={item} />)
    expect(screen.getByText('New Task')).toBeInTheDocument()
  })
  it('should call onDelete when click delete button', () => {
    const item = { id: '1', title: 'New Task' }
    const onDelete = jest.fn()
    render(<ListItem item={item} onDelete={onDelete} />)
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    expect(onDelete).toBeCalledWith('1')
  })
})
