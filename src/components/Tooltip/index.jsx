import './Tooltip.scss'

function Tooltip({ children = '', direction = 'top', theme = 'light' }) {
  return (
      <div className={`tooltip ${direction} ${theme}`}>{children}</div>
  )
}

export default Tooltip
