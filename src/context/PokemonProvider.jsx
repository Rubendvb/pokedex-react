import { PokemonContext } from './PokemonContext'

import PropTypes from 'prop-types'

export const PokemonProvider = ({ children }) => {
  return (
    <PokemonContext.Provider value={{ number: 0 }}>
      {children}
    </PokemonContext.Provider>
  )
}

PokemonProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
