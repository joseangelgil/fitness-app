import { useState, useEffect, createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

const AppContext = createContext()

const AppProvider = ({ children }) => {

  const [activeWeekDay, setActiveWeekDay] = useState('Lunes')
  const [modal, setModal] = useState('none')
  const [nombreNuevaComida, setNombreNuevaComida] = useState('')
  const [horaNuevaComida, setHoraNuevaComida] = useState('')
  const [comidaOIngrediente, setComidaOIngrediente] = useState('')
  const [cantidadNuevoIngrediente, setCantidadNuevoIngrediente] = useState('')
  const [activeFood, setActiveFood] = useState('')
  const [menu, setMenu] = useState(
    {
    'Lunes': [
      {      
      id: uuidv4(),  
      name: 'Almuerzo', 
      time: '10:00', 
      ingredientes: [
        {id: uuidv4(), name: 'Queso', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
        {id: uuidv4(), name: 'Espaguetis', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
        {id: uuidv4(), name: 'Bacon', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},
        {id: uuidv4(), name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'}
      ]
      },
      {
      id: uuidv4(),
      name: 'Comida', 
      time: '14:00',
      ingredientes: []
      },
      {
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: [
        {id: uuidv4(), name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'}]
      }
    ],
    'Martes': [{
      id: uuidv4(),
      name: 'Comida', 
      time: '14:00',
      ingredientes: []
    }],
    'Miercoles': [{
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: []
    }],    
    'Jueves': [{
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: []
    }],
    'Viernes': [{
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: [
        {id: uuidv4(), name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'},      
        {id: uuidv4(), name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', prot: '7', gras: '15'}]
    }],
    'Sábado': [{
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: []
    }],
    'Domingo': [
      {
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: []
      }
    ]
    })

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
    const nuevaComida = {id: uuidv4(), name: nombreNuevaComida, time: horaNuevaComida, ingredientes: []}
    const comidasActualizadas = [...menu[activeWeekDay], nuevaComida]

    const comidasOrdenadas = comidasActualizadas.sort((a,b) => {
      if(a.time > b.time) return 1
      else if(a.time < b.time) return -1
      else return 0
    })

    setMenu(prevMenu => ({
    ...prevMenu,
    [activeWeekDay]: comidasOrdenadas
  }));

    setDisplay()
  }  

  const eliminarComida = (id) => {
    const nuevasComidas = menu[activeWeekDay].filter(comida => comida.id !== id )
    setMenu(prevMenu => ({...prevMenu, [activeWeekDay]: nuevasComidas}))
  }

  const calculateTotal = (comida, macroNutriente) => {
    let total = 0;
    comida.ingredientes.forEach(ingrediente => total += +ingrediente[macroNutriente])

    return total
  }
  
  const añadirIngrediente = (name= 'Nuevo ingrediente', cantidad, kcal, hc, prot, gras) => {
    const nuevoIngrediente = {name: name, cantidad: cantidad, kcal: cantidad * kcal, hc: cantidad * hc, prot: cantidad * prot, gras: cantidad * gras}
    const ingredientesActualizados = [...ingredientes, nuevoIngrediente]

    setIngredientes(ingredientesActualizados)
    setDisplay()
  } 

  const añadirIngrediente = (comida, name, cantidad, kcal, hc, prot, gras) => {
    const nuevoIngrediente = {id: uuidv4(), name: name, cantidad: cantidad, kcal: cantidad * kcal, hc: cantidad * hc, prot: cantidad * prot, gras: cantidad * gras}

    setMenu(prevMenu => {
      const comidasActualizadas = prevMenu[activeWeekDay].map(item => {
        if (item.id === comida) {
          return {
            ...item,
            ingredientes: [...item.ingredientes, nuevoIngrediente],
          };
        }
        return item
      });

      return {
        ...prevMenu,
        [activeWeekDay]: comidasActualizadas,
      };
    });
    setDisplay()
  } 

  const quitarIngrediente = (comidaId, ingredienteId) => {

    setMenu(prevMenu => {
      const comidaModificada = prevMenu[activeWeekDay].map(item => {
        if(item.id === comidaId) {
          return {
            ...item,
            ingredientes: item.ingredientes.filter(item => item.id !== ingredienteId)
          }
        } 
        return item       
      })

      return {
        ...prevMenu,
        [activeWeekDay]: comidaModificada
      }
    })
  }

  return (
    <AppContext.Provider value={{ 
      changeActiveButton,
      chooseVariant,
      activeWeekDay, 
      setActiveWeekDay, 
      menu, 
      setMenu, 
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
      activeFood,
      setActiveFood,
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

