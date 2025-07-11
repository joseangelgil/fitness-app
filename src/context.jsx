import { useState, useEffect, createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { fitnessAppData } from './utils/fitnessAppData'

const AppContext = createContext()

const AppProvider = ({ children }) => {

  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || fitnessAppData)  
  const [openFoodFactsData, setOpenFoodFactsData] = useState([])
  const [activeWeekDay, setActiveWeekDay] = useState('Lunes')
  const [activeColor, setActiveColor] = useState({name: 'primary', oscuro: '#1976D2', claro: '#ADD8E6', suave: '#D6ECFA'})  
  const [perfiles, setPerfiles] = useState(JSON.parse(localStorage.getItem('perfiles')) || [])
  const [perfilActivo, setPerfilActivo] = useState('')
  const [esNuevoPerfil, setEsNuevoPerfil] = useState(true)
  const [esPerfilGuardado, setEsPerfilGuardado] = useState(true)
  const [modal, setModal] = useState('none')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('Hay campos vacíos o con errores')
  const [nombreNuevaComida, setNombreNuevaComida] = useState('')
  const [mostrarMenuIngredientes, setMostrarMenuIngredientes] = useState(false)
  const [horaNuevaComida, setHoraNuevaComida] = useState('')
  const [comidaOIngrediente, setComidaOIngrediente] = useState('')
  const [cantidadNuevoIngrediente, setCantidadNuevoIngrediente] = useState('')
  const [comidaSeleccionada, setComidaSeleccionada] = useState('')
  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState('')
  const [cantidadObjetivo, setCantidadObjetivo] = useState(JSON.parse(localStorage.getItem(`${perfilActivo}-cantidad`)) || {kcal: 0, hc: 0, p: 0, g: 0})
  const [sumaDiariaTotal, setSumaDiariaTotal] = useState(
    {
      'Lunes': {},
      'Martes': {},
      'Miercoles': {},
      'Jueves': {},
      'Viernes': {},
      'Sabado': {},
      'Domingo': {},
    })
  const [menu, setMenu] = useState(JSON.parse(localStorage.getItem(`${perfilActivo}-menu`)) || {'Lunes': [], 'Martes': [], 'Miercoles': [], 'Jueves': [], 'Viernes': [], 'Sabado': [], 'Domingo': []})
  
  const changeActiveButton = (weekDay) => {
  setActiveWeekDay(weekDay)
  }

  const chooseVariant = (weekDay) => {
  return activeWeekDay === weekDay ? 'contained' : 'outlined'
  }

  const setDisplay = () => {
    if(modal === 'none') setModal('block')
    else setModal('none')
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
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

  const modificarComida = (comidaSel, name, time) => {

    const comidasActualizadas = menu[activeWeekDay].map(comida => {
      if(comida.id === comidaSel) {
        return {
          ...comida,
          name: name,
          time: time
        }
      }
      return comida
    })    

    const comidasOrdenadas = comidasActualizadas.sort((a,b) => {
      if(a.time > b.time) return 1
      else if(a.time < b.time) return -1
      else return 0
    })

    setMenu(prevMenu => ({
      ...prevMenu,
      [activeWeekDay]: comidasOrdenadas
    }));

    setDisplay();
  }

  const eliminarComida = (id) => {
    const nuevasComidas = menu[activeWeekDay].filter(comida => comida.id !== id )
    setMenu(prevMenu => ({...prevMenu, [activeWeekDay]: nuevasComidas}))
    
    setNombreNuevaComida('')
    setHoraNuevaComida('')
    setDisplay()
  }

  const calculateTotal = (comida) => {
    const macrosTotales = {
        kcal: Number((comida.ingredientes.reduce((total, ingrediente) => total + Number(ingrediente.kcal), 0)).toFixed(1)),
        hc: Number((comida.ingredientes.reduce((total, ingrediente) => total + Number(ingrediente.hc), 0)).toFixed(1)),
        p: Number((comida.ingredientes.reduce((total, ingrediente) => total + Number(ingrediente.p), 0)).toFixed(1)),
        g: Number((comida.ingredientes.reduce((total, ingrediente) => total + Number(ingrediente.g), 0)).toFixed(1)) 
      }
    return macrosTotales
  }

  const añadirIngrediente = (comida, id, name, cantidad, kcal, hc, p, g) => {

    const nuevoIngrediente = {
      id: `${comidaSeleccionada}-${id}`, 
      name: name, 
      cantidad: cantidad, 
      kcal: Number((cantidad * kcal/100).toFixed(1)), 
      hc: Number((cantidad * hc/100).toFixed(1)), 
      p: Number((cantidad * p/100).toFixed(1)), 
      g: Number((cantidad * g/100).toFixed(1)), 
    }

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
    setCantidadNuevoIngrediente('')
    setDisplay()
  } 

  const modificarIngrediente = (comida, ingredienteSel, cantidad, kcal, hc, p, g) => {

    setMenu(prevMenu => {
      const comidasActualizadas = prevMenu[activeWeekDay].map(item => {
        if (item.id === comida) {
          const ingredientesActualizados = item.ingredientes.map(ingrediente => {
            if(ingrediente.id === ingredienteSel) {
              return {
                ...ingrediente,
                cantidad: cantidad,
                kcal: Number((cantidad * kcal/100).toFixed(1)), 
                hc: Number((cantidad * hc/100).toFixed(1)), 
                p: Number((cantidad * p/100).toFixed(1)), 
                g: Number((cantidad * g/100).toFixed(1))
              }
            }
            return ingrediente            
          })
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
    setCantidadNuevoIngrediente('')
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
    setCantidadNuevoIngrediente('')
    setIngredienteSeleccionado('')
    setDisplay()
  }


  // Para cada comida del menu, calcular el total al iniciar
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


  // Al cambiar el menu o el dia activo, calcular la suma total de macros
  useEffect(() => {
    setSumaDiariaTotal(prevSum => {
      const nuevaSuma = {kcal: 0, hc: 0, p: 0, g: 0}
      menu[activeWeekDay].forEach(comida => {
        nuevaSuma.kcal += Number(comida.macros?.kcal) || 0
        nuevaSuma.hc += Number(comida.macros?.hc) || 0
        nuevaSuma.p += Number(comida.macros?.p) || 0
        nuevaSuma.g += Number(comida.macros?.g) || 0
      })

      for(const key in nuevaSuma) {
        nuevaSuma[key] = Number(nuevaSuma[key].toFixed(1))
      }

      return {
        ...prevSum,
        [activeWeekDay]: nuevaSuma
      }
    })
  }, [menu, activeWeekDay])


  // Cuando cambie el menu, guardar los cambios en el storage del perfil activo
  useEffect(() => {
    if(perfilActivo) {      
      localStorage.setItem(`${perfilActivo}-menu`, JSON.stringify(menu))
    }
  }, [menu])

  // Cuando cambie el color, guardar los cambios en el storage del perfil activo
  useEffect(() => {
    if(perfilActivo) {      
      localStorage.setItem(`${perfilActivo}-color`, JSON.stringify(activeColor))
    }
  }, [activeColor])

  // Cuando cambie el perfil, devolver los datos de menu y color de ese perfil
  useEffect(() => {
    setMenu(JSON.parse(localStorage.getItem(`${perfilActivo}-menu`)) || {'Lunes': [], 'Martes': [], 'Miercoles': [], 'Jueves': [], 'Viernes': [], 'Sabado': [], 'Domingo': []})
    setActiveColor(JSON.parse(localStorage.getItem(`${perfilActivo}-color`)) || {name: 'primary', oscuro: '#1976d2', claro: '#ADD8E6', suave: '#D6ECFA'})
    setCantidadObjetivo(JSON.parse(localStorage.getItem(`${perfilActivo}-cantidad`)) || {kcal: 0, hc: 0, p: 0, g: 0})
    setData(JSON.parse(localStorage.getItem('data')))
  }, [perfilActivo])

  useEffect(() => {
    const sortedData = [...data].sort((a,b) => {
      if(a.name > b.name) return 1
      if(a.name < b.name) return -1
      return 0
    })
    localStorage.setItem('data', JSON.stringify(sortedData))
  }, [data])

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
      comidaSeleccionada,
      setComidaSeleccionada,
      ingredienteSeleccionado,
      setIngredienteSeleccionado,
      setDisplay,
      añadirComida,
      eliminarComida,
      calculateTotal,
      añadirIngrediente,
      quitarIngrediente,
      cantidadObjetivo,
      setCantidadObjetivo,
      sumaDiariaTotal,
      setSumaDiariaTotal,
      modificarIngrediente,
      modificarComida,
      data,
      setData,
      perfiles,
      setPerfiles,
      esNuevoPerfil,
      setEsNuevoPerfil,
      esPerfilGuardado,
      setEsPerfilGuardado,
      perfilActivo,
      setPerfilActivo,
      activeColor,
      setActiveColor,
      mostrarMenuIngredientes,
      setMostrarMenuIngredientes,
      openSnackbar,
      setOpenSnackbar,
      snackbarMessage,
      setSnackbarMessage,
      handleSnackbarClose,
      openFoodFactsData,
      setOpenFoodFactsData
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export default AppProvider

