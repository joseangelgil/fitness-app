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
  const [cantidadObjetivo, setCantidadObjetivo] = useState({kcal: 2680, hc: 415, p: 120, g: 60})
  const [sumaDiariaTotal, setSumaDiariaTotal] = useState(
    {
      'Lunes': {kcal: 1200, hc: 100, p: 35, g: 75},
      'Martes': {kcal: 1200, hc: 100, p: 35, g: 75},
      'Miercoles': {kcal: 1200, hc: 100, p: 35, g: 75},
      'Jueves': {kcal: 1200, hc: 100, p: 35, g: 75},
      'Viernes': {kcal: 1200, hc: 100, p: 35, g: 75},
      'Sábado': {kcal: 1200, hc: 100, p: 35, g: 75},
      'Domingo': {kcal: 1200, hc: 100, p: 35, g: 75},
    })
  const [menu, setMenu] = useState(
    {
    'Lunes': [
      {      
      id: uuidv4(),  
      name: 'Almuerzo', 
      time: '10:00', 
      ingredientes: [
        {id: uuidv4(), name: 'Queso', cantidad: '80', kcal: '750', hc: '20', p: '7', g: '15'},
        {id: uuidv4(), name: 'Espaguetis', cantidad: '80', kcal: '750', hc: '20', p: '7', g: '15'},
        {id: uuidv4(), name: 'Bacon', cantidad: '80', kcal: '750', hc: '20', p: '7', g: '15'},
        {id: uuidv4(), name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', p: '7', g: '15'}
      ],
      macros: {}
      },
      {
      id: uuidv4(),
      name: 'Comida', 
      time: '14:00',
      ingredientes: [],
      macros: {}
      },
      {
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: [
        {id: uuidv4(), name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', p: '7', g: '15'}
      ],
      macros: {}
      }
    ],
    'Martes': [{
      id: uuidv4(),
      name: 'Comida', 
      time: '14:00',
      ingredientes: [],
      macros: {}
    }],
    'Miercoles': [{
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: [
        {id: uuidv4(), name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', p: '7', g: '15'}
      ],
      macros: {}
    }],    
    'Jueves': [{
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: [],
      macros: {}
    }],
    'Viernes': [{
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: [
        {id: uuidv4(), name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', p: '7', g: '15'},      
        {id: uuidv4(), name: 'Huevo', cantidad: '80', kcal: '750', hc: '20', p: '7', g: '15'}
      ],
      macros: {}
    }],
    'Sábado': [{
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: [],
      macros: {}
    }],
    'Domingo': [
      {
      id: uuidv4(),
      name: 'Cena', 
      time: '21:00',
      ingredientes: [],
      macros: {}
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

  const calculateTotal = (comida) => {

    const macrosTotales = {
        kcal: comida.ingredientes.reduce((total, ingrediente) => total + Number(ingrediente.kcal), 0),
        hc: comida.ingredientes.reduce((total, ingrediente) => total + Number(ingrediente.hc), 0),
        p: comida.ingredientes.reduce((total, ingrediente) => total + Number(ingrediente.p), 0),
        g: comida.ingredientes.reduce((total, ingrediente) => total + Number(ingrediente.g), 0) 
      }

    return macrosTotales
  }

  const añadirIngrediente = (comida, name, cantidad, kcal, hc, p, g) => {
    const nuevoIngrediente = {id: uuidv4(), name: name, cantidad: cantidad, kcal: cantidad * kcal, hc: cantidad * hc, p: cantidad * p, g: cantidad * g}

    setMenu(prevMenu => {
      const comidasActualizadas = prevMenu[activeWeekDay].map(item => {
        if (item.id === comida) {
          const ingredientesActualizados = [...item.ingredientes, nuevoIngrediente]
          return {
            ...item,
            ingredientes: ingredientesActualizados,
            macros: calculateTotal({...item, ingredientes: ingredientesActualizados})
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
          const ingredientesActualizados = item.ingredientes.filter(item => item.id !== ingredienteId)
          return {
            ...item,
            ingredientes: ingredientesActualizados,
            macros: calculateTotal({...item, ingredientes: ingredientesActualizados})
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

  useEffect(() => {
    setMenu(prevMenu => {    
      const nuevoMenu = {}  
      for(const key in prevMenu) {
        const comidasActualizadas = prevMenu[key].map(comida => {
          const nuevosMacros = calculateTotal(comida)
          return {
          ...comida,
          macros: nuevosMacros
          }
        }) 
        nuevoMenu[key] = comidasActualizadas
      }
      return nuevoMenu
    })

  }, [])

  useEffect(() => {
    setSumaDiariaTotal(prevSum => {
      const nuevaSuma = {kcal: 0, hc: 0, p: 0, g: 0}
      menu[activeWeekDay].forEach(comida => {
        nuevaSuma.kcal += Number(comida.macros?.kcal) || 0
        nuevaSuma.hc += Number(comida.macros?.hc) || 0
        nuevaSuma.p += Number(comida.macros?.p) || 0
        nuevaSuma.g += Number(comida.macros?.g) || 0
      })
      return {
        ...prevSum,
        [activeWeekDay]: nuevaSuma
      }
    })
  }, [menu, activeWeekDay])

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
      cantidadObjetivo,
      setCantidadObjetivo,
      sumaDiariaTotal,
      setSumaDiariaTotal
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export default AppProvider

