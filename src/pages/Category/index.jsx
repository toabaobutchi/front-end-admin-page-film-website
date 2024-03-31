import ActionBar from '@comps/ActionBar'
import './Category.scss'
import { useState, useEffect } from 'react'
import HttpClient from '@utils/HttpClient'
import ToastObj from '@utils/Toast'
import Toast from '@comps/Toast'
import ToastContainer from '@comps/Toast/ToastContainer'
import Tooltip from '@comps/Tooltip'
import Modal from '@comps/Modal'
import FormInfo from '@comps/FormInfo'
import { FloatLabelInput } from '@comps/Input'

const http = new HttpClient()

function Category() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({ id: 0, name: '' })
  const [toast, setToast] = useState(new ToastObj())
  const [createModal, setCreateModal] = useState(false)

  const handleCreateModal = () => {
    setCreateModal(!createModal)
  }

  const handleEditCell = category => {
    setSelectedCategory(category)
  }
  const refreshCategoriesData = () => {
    http.get('/categories').then(res => {
      const [data] = res
      setCategories(data)
    })
  }
  const handleUpdateCategory = () => {
    http.put('/categories/' + selectedCategory.id, { name: selectedCategory.name }).then(res => {
      const [data, status] = res
      if (status / 100 !== 2) {
        setToast(ToastObj.errorToast(toast, { content: 'Action cannot be done!' }))
      } else {
        if (data > 0) {
          setToast(ToastObj.successToast(toast, { content: 'Update completelly!' }))
          refreshCategoriesData()
        } else {
          setToast(ToastObj.errorToast(toast, { content: 'Failed to update category!' }))
        }
        setSelectedCategory({ id: 0, name: '' })
      }
    })
  }
  const handleDeleteCategory = () => {
    http.delete('/categories/' + selectedCategory.id).then(res => {
      const [data, status] = res
      if (status / 100 !== 2) {
        setToast(ToastObj.errorToast(toast, { content: 'Action cannot be done!' }))
      } else {
        if (data > 0) {
          setToast(ToastObj.successToast(toast, { content: 'Delete completelly!' }))
          refreshCategoriesData()
        } else {
          setToast(ToastObj.errorToast(toast, { content: 'Failed to delete category!' }))
        }
        setSelectedCategory({ id: 0, name: '' })
      }
    })
  }
  const handleCreateSubmit = (e) => {
    const formData = new FormData(e.target)
    http.post('/categories', { name: formData.get('name') }).then(res => {
      const [data, status] = res
      if (status / 100 !== 2) {
        setToast(ToastObj.errorToast(toast, { content: 'Action cannot be done!' }))
      } else {
        if (data > 0) {
          setToast(ToastObj.successToast(toast, { content: 'Create completelly!' }))
          refreshCategoriesData()
        } else {
          setToast(ToastObj.errorToast(toast, { content: 'Failed to create category!' }))
        }
        handleCreateModal()
        setSelectedCategory({ id: 0, name: '' })
      }
    })
  }

  useEffect(() => {
    http.get('/categories').then(res => {
      const [data] = res
      setCategories(data)
    })
  }, [])
  return (
    <>
      <ActionBar searchLabel='Search category' handleToggleCreateModal={handleCreateModal} addButtonContent='Add new category' />
      <div className='category-data'>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
            {categories.map(c => {
              return (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td
                    onClick={() => {
                      handleEditCell(c)
                    }}>
                    {selectedCategory.id !== c.id && c.name}
                    {selectedCategory.id === c.id && (
                      <div className='action-cell'>
                        <input autoFocus className='update-input' value={selectedCategory.name} onChange={e => handleEditCell({ id: c.id, name: e.target.value })} />
                        <button
                          onClick={e => {
                            e.stopPropagation()
                            handleUpdateCategory()
                          }}
                          className='update-btn btn btn-warning'>
                          <i className='fas fa-pencil-alt'></i> Update
                        </button>
                        <button
                          disabled={c.film_count != 0}
                          onClick={e => {
                            e.stopPropagation()
                            handleDeleteCategory()
                          }}
                          className={`update-btn btn btn-danger ${c.film_count != 0 ? 'has-tooltip' : ''}`}>
                          <i className='fas fa-trash-alt'></i> Delete
                          {c.film_count != 0 && (
                            <Tooltip direction='top' theme='dark'>
                              This category has <strong className='error-text'>{c.film_count}</strong> movie(s)
                            </Tooltip>
                          )}
                        </button>
                        <button
                          className='update-btn btn btn-info'
                          onClick={e => {
                            e.stopPropagation()
                            handleEditCell({ id: 0, name: '' })
                          }}>
                          <i className='fas fa-undo-alt'></i> Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {createModal && (
        <Modal
          handleToggleModal={handleCreateModal}
          header='Add new category'
          modalType='success'
          closeIcon={<i className='fas fa-times'></i>}
          footerButtons={[
            {
              props: {
                className: 'btn btn-success',
                form: 'add-category-form'
              },
              title: 'Add'
            },
            {
              props: {
                className: 'btn btn-danger',
                closeButton: true
              },
              title: 'Cancel'
            }
          ]}>
          <FormInfo id='add-category-form' onSubmit={handleCreateSubmit}>
            <FloatLabelInput label='Category name' inputAttributes={{ id: 'category-name', name: 'name' }} />
          </FormInfo>
        </Modal>
      )}
      <ToastContainer>{toast.open && <Toast {...toast} onRemove={() => setToast({...toast, open: false})} />}</ToastContainer>
    </>
  )
}

export default Category
