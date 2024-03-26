import FormInfo from '@comps/FormInfo'
import { FloatLabelInput, InputRow, FloatLabelTextArea, FileDialog, DateTimePicker, Select } from '@comps/Input'

function CreateMovieForm({ handleSubmit = () => {}, categories = [] }) {
  return (
    <>
      <FormInfo onSubmit={handleSubmit} id='add-movie-form' enctype='multipart/form-data'>
        <InputRow>
          <FloatLabelInput
            label='Movie name'
            inputAttributes={{
              id: 'movie-name',
              name: 'name',
              type: 'text'
            }}
          />
          <FloatLabelInput
            label='Director name'
            inputAttributes={{
              id: 'director-name',
              name: 'director',
              type: 'text'
            }}
          />
        </InputRow>
        <InputRow>
          <FloatLabelInput
            label='Time'
            inputAttributes={{
              id: 'time',
              type: 'number',
              name: 'time',
              min: 1
            }}
          />
          <DateTimePicker label='Launch date' inputAttributes={{ id: 'launchdate', name: 'launchdate' }} />
          <DateTimePicker label='Fishish date' inputAttributes={{ id: 'finishtime', name: 'finishtime' }} />
        </InputRow>
        <FloatLabelInput label='Actors' inputAttributes={{ id: 'actors', type: 'text', name: 'actors' }} />
        <FloatLabelTextArea label='Description' textareaAttributes={{ id: 'desc', name: 'description' }} />
        <FileDialog
          title='Poster'
          label={
            <>
              <i className='fas fa-upload'></i> Choose a poster
            </>
          }
          inputAttributes={{
            id: 'poster-dialog',
            accept: 'images/*',
            name: 'poster'
          }}
        />
        <FloatLabelInput label='Rated' inputAttributes={{ id: 'rated', type: 'text', name: 'rated' }} />
        <Select name='categoryid' label='Category'>
          {categories.map(item => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            )
          })}
        </Select>
      </FormInfo>
    </>
  )
}

export default CreateMovieForm
