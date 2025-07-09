import { useState, useEffect, createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

const AppContext = createContext()

const AppProvider = ({ children }) => {

  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || [
    {id: uuidv4(), url:'', name: 'Queso', kcal: '210', hc: '2', p: '15', g: '18'},
    {id: uuidv4(), url:'', name: 'Espaguetis', kcal: '120', hc: '50', p: '7', g: '11'},
    {id: uuidv4(), url:'', name: 'Bacon', kcal: '250', hc: '0', p: '12', g: '22'},
    {id: uuidv4(), url:'', name: 'Huevo', kcal: '56', hc: '0', p: '7', g: '15'},
    {id: uuidv4(), url:'', name: 'Tomate', kcal: '56', hc: '0', p: '7', g: '15'},
    {id: uuidv4(), url:'', name: 'Arroz', kcal: '56', hc: '0', p: '7', g: '15'},
    {id: uuidv4(), url:'', name: 'Melon', kcal: '56', hc: '0', p: '7', g: '15'},
    {id: uuidv4(), url:'', name: 'Melocoton', kcal: '56', hc: '0', p: '7', g: '15'},
  ])
  const [activeWeekDay, setActiveWeekDay] = useState('Lunes')
  const [activeColor, setActiveColor] = useState({name: 'primary', oscuro: '#1976D2', claro: '#ADD8E6', suave: '#D6ECFA'})  
  const [perfiles, setPerfiles] = useState(JSON.parse(localStorage.getItem('perfiles')) || [])
  const [perfilActivo, setPerfilActivo] = useState('')
  const [esNuevoPerfil, setEsNuevoPerfil] = useState(true)
  const [esPerfilGuardado, setEsPerfilGuardado] = useState(true)
  const [modal, setModal] = useState('none')
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

  const añadirIngrediente = (comida, name, cantidad, kcal, hc, p, g) => {

    const nuevoIngrediente = {
      id: uuidv4(), 
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

  // useEffect(() => {
  //   let isMounted = true
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://es.openfoodfacts.net/api/v2/search?categories_tags=pollo')
  //       const data = await response.json()

  //       const products = data.products
  //         let productInfo = []
  //         for(let i = 0; i < data.products.length; i++) {
  //           const { brands, product_name, image_thumb_url, nutriments, generic_name_es } = products[i]
  //           productInfo.push({brands, product_name, generic_name_es, image_thumb_url, nutriments, generic_name_es})
  //         }
  //       if(isMounted) console.log(productInfo)
  //     } catch(err) {
  //         console.error(err)
  //     }
  //   }
  //   fetchData()
  //   return () => (isMounted = false)
  // }, [])


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
  }, [perfilActivo])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
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
      setMostrarMenuIngredientes
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export default AppProvider

