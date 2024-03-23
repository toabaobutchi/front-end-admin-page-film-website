import FormInfo from '../../../../components/FormInfo'
import { FloatLabelInput, InputRow, FloatLabelTextArea, FileDialog, DateTimePicker, Select } from '../../../../components/Input'

function UpdateMovieForm({ handleSubmit = () => {}, categories = [], data = {} }) {
  const { name = '', director = '', launchdate = '', time = '', finishtime = '', actors = '', description = '', rated = '', id = '' } = data
  return (
    <>
      <FormInfo onSubmit={e => handleSubmit(e, id)} id='update-movie-form' enctype='multipart/form-data'>
        <InputRow>
          <FloatLabelInput label='Movie name' inputAttributes={{ id: 'movie-name', name: 'name', type: 'text', value: name }} />
          <FloatLabelInput label='Director name' inputAttributes={{ id: 'director-name', name: 'director', type: 'text', value: director }} />
        </InputRow>
        <InputRow>
          <FloatLabelInput label='Time' inputAttributes={{ id: 'time', type: 'number', name: 'time', value: time }} />
          <DateTimePicker label='Launch date' inputAttributes={{ id: 'launchdate', name: 'launchdate', value: launchdate }} />
          <DateTimePicker label='Fishish date' inputAttributes={{ id: 'finishtime', name: 'finishtime', value: finishtime }} />
        </InputRow>
        <FloatLabelInput label='Actors' inputAttributes={{ id: 'actors', type: 'text', name: 'actors', value: actors }} />
        <FloatLabelTextArea label='Description' textareaAttributes={{ id: 'desc', name: 'description', value: description }} />
        <FileDialog
          title='Poster'
          label={
            <>
              <i className='fas fa-upload'></i> Choose a poster
            </>
          }
          inputAttributes={{ id: 'poster-dialog', accept: 'images/*', name: 'poster' }}
        />
        <FloatLabelInput label='Rated' inputAttributes={{ id: 'rated', type: 'text', name: 'rated', value: rated }} />
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

export default UpdateMovieForm
