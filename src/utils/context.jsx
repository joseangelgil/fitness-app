import { useState, useEffect, createContext, useContext } from 'react'

const AppContext = createContext()

const AppProvider = ({ children }) => {

  const [activeWeekDay, setActiveWeekDay] = useState('Lunes')
  const [comidas, setComidas] = useState([{name: 'Almuerzo', time: '10:00'}, {name: 'Comida', time: '14:00'}, {name: 'Cena', time: '21:00'}])
  const [modal, setModal] = useState('none')
  const [nombreNuevaComida, setNombreNuevaComida] = useState('')
  const [horaNuevaComida, setHoraNuevaComida] = useState('')
  const [comidaOIngrediente, setComidaOIngrediente] = useState('')
  const [cantidadNuevoIngrediente, setCantidadNuevoIngrediente] = useState('')
  const [ingredientes, setIngredientes] = useState([
    {name: 'Queso', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
    {name: 'Espaguetis', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
    {name: 'Bacon', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
    {name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
  ])

  const changeActiveButton = (weekDay) => {
  setActiveWeekDay(weekDay)
  }

  const chooseVariant = (weekDay) => {
  return activeWeekDay === weekDay ? 'contained' : 'outlined'
  }

  const setDisplay = () => {
    if(modal === 'none') setModal('block')
    else setModal('none')
    setNombreNuevaComida('')
    setHoraNuevaComida('')
  }

  const añadirComida = () => {
    const nuevaComida = {name: nombreNuevaComida, time: horaNuevaComida}
    const comidasActualizadas = [...comidas, nuevaComida]

    const comidasOrdenadas = comidasActualizadas.sort((a,b) => {
      if(a.time > b.time) return 1
      else if(a.time < b.time) return -1
      else return 0
    })

    setComidas(comidasOrdenadas)
    setDisplay()
  }  

  const eliminarComida = (name) => {
    const nuevasComidas = comidas.filter(comida => comida.name !== name )
    setComidas(nuevasComidas)
  }

  const calculateTotal = (macroNutriente) => {
    let total = 0;
    ingredientes.forEach(ingrediente => total += +ingrediente[macroNutriente])

    return total
  }
  
  const añadirIngrediente = (name= 'Nuevo ingrediente', cantidad, kcal, hc, prot, gras) => {
    const nuevoIngrediente = {name: name, cantidad: cantidad, kcal: cantidad * kcal, hc: cantidad * hc, prot: cantidad * prot, gras: cantidad * gras}
    const ingredientesActualizados = [...ingredientes, nuevoIngrediente]

    setIngredientes(ingredientesActualizados)
    setDisplay()
  } 

  const quitarIngrediente = (name) => {
    const nuevosIngredientes = ingredientes.filter(ingrediente => ingrediente.name !== name)
    setIngredientes(nuevosIngredientes)
  }

  return (
    <AppContext.Provider value={{ 
      changeActiveButton,
      chooseVariant,
      activeWeekDay, 
      setActiveWeekDay, 
      comidas, 
      setComidas, 
      modal, 
      setModal, 
      nombreNuevaComida, 
      setNombreNuevaComida, 
      horaNuevaComida, 
      setHoraNuevaComida,
      comidaOIngrediente,
      setComidaOIngrediente,
      cantidadNuevoIngrediente,
      setCantidadNuevoIngrediente,
      ingredientes,
      setIngredientes,
      setDisplay,
      añadirComida,
      eliminarComida,
      calculateTotal,
      añadirIngrediente,
      quitarIngrediente,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export default AppProvider

