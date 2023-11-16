import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(
  ({ children, buttonLabel, alternateButtonLabel, title }, refs) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      }
    })

    const viewButtonId = `view-${title}`

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id={viewButtonId} onClick={toggleVisibility}>
            {buttonLabel}
          </button>
        </div>
        <div style={showWhenVisible} className="togglableContent">
          {children}
          <button onClick={toggleVisibility}>{alternateButtonLabel}</button>
        </div>
      </div>
    )
  },
)

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  alternateButtonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
