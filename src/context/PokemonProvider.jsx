import { useEffect, useState } from 'react'
import { PokemonContext } from './PokemonContext'

import PropTypes from 'prop-types'
import { useForm } from '../hook/useForm'

export const PokemonProvider = ({ children }) => {
  const [fiftyPokemons, setFiftyPokemons] = useState([])
  const [allPokemons, setAllPokemons] = useState([])
  const [offset, setOffset] = useState(0)

  // CustomHook - useForm
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: '',
  })

  // States simples
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)

  // Chama a API para pegar 50 pokemons
  const getFiftyPokemons = async (limit = 50) => {
    const baseUrl = 'https://pokeapi.co/api/v2'

    const res = await fetch(
      `${baseUrl}/pokemon?limit=${limit}&offset=${offset}`
    )

    const data = await res.json()
    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data
    })
    const pokemons = await Promise.all(promises)

    setFiftyPokemons(pokemons)
    setLoading(false)
  }

  // Chama a API para pegar todos os pokemons
  const getAllPokemons = async () => {
    const baseUrl = 'https://pokeapi.co/api/v2'

    const res = await fetch(`${baseUrl}/pokemon?limit=100000&offset=0`)

    const data = await res.json()
    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data
    })
    const pokemons = await Promise.all(promises)

    setAllPokemons([...allPokemons, ...pokemons])
    setLoading(false)
  }

  useEffect(() => {
    getFiftyPokemons()
  }, [])

  useEffect(() => {
    getAllPokemons()
  }, [])

  // Chamar pokemon por id
  const getPokemonById = async (id) => {
    const baseUrl = 'https://pokeapi.co/api/v2'

    const res = await fetch(`${baseUrl}/pokemon/${id}`)
    const data = await res.json()
    return data
  }

  return (
    <PokemonContext.Provider
      value={{
        valueSearch,
        onInputChange,
        onResetForm,
        allPokemons,
        fiftyPokemons,
        getPokemonById,
      }}
    >
      {children}
    </PokemonContext.Provider>
  )
}

PokemonProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
