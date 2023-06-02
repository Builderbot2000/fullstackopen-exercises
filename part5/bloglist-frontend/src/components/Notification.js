import './notification.css'

const Notification = ({ message, mode }) => {
  if (message === null) return null
  if (mode === null) return (<div className='notification'>{message}</div>)
  if (mode === 'success') return <div className='success'>{message}</div>
  if (mode === 'fail') return <div className='error'>{message}</div>
}

export default Notification