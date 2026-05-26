import { restrictNumber } from '../../utils/formValidators';

export default function Input({label, error, placeholder, type, onlyNumbers, ...props}) {
  const renderError = (error) => <span className='smallest text-red-500'>{error?.message}</span>

  let inputProps = {
    placeholder: placeholder ?? label,
    type: type ?? 'text',
    ...props
  }

  if (onlyNumbers) {
    inputProps = {...inputProps, onKeyPress: restrictNumber}
  }

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input
        {...inputProps}
      />
      {renderError(error)}
    </>
  )
}