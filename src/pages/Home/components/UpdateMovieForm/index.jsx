import FormInfo from '../../../../components/FormInfo'
import { FloatLabelInput, InputRow, FloatLabelTextArea, FileDialog, DateTimePicker, Select } from '../../../../components/Input'

function UpdateMovieForm({ handleSubmit = () => { }, categories = [], data = {} }) {
  console.log(data);
  const { name = '', director = '', launch_date = '', time = '', finish_date = '', actors = '', description = '', rated = '', id = '' } = data
  return (
    <>
      <FormInfo onSubmit={e => handleSubmit(e, id)} id='update-movie-form' enctype='multipart/form-data'>
        <InputRow>
          <FloatLabelInput label='Movie name' inputAttributes={{ id: 'movie-name', name: 'name', type: 'text', value: name }} />
          <FloatLabelInput label='Director name' inputAttributes={{ id: 'director-name', name: 'director', type: 'text', value: director }} />
        </InputRow>
        <InputRow>
          <FloatLabelInput label='Time' inputAttributes={{ id: 'time', type: 'number', name: 'time', value: time }} />
          <DateTimePicker label='Launch date' inputAttributes={{ id: 'launchdate', type: 'datetime-local', name: 'launch_date', value: launch_date }} />
          <DateTimePicker label='Fishish date' inputAttributes={{ id: 'finishtime', type: 'datetime-local', name: 'finish_date', value: finish_date }} />
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
        <Select name='category_id' label='Category'>
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
