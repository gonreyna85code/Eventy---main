const styles ={
  containerStyle:{
    display:'grid',
    position: 'relative',  
    width: '100%',
    height: '50vh',
    'justifyItems': 'center'
  },
  mapStyle:{
    margin:'auto'
  },
  placesStyle:{
    containerStyle:{
      marginBlock: '10px'
    },
    labelStyle:{
    'fontFamily': 'Open Sans , sans-serif',
    'fontSize': '17px',
    'fontWeight': '500',
    'marginBottom': '5px',
    'display': 'block',
    'textAlign': 'left',
    },
    inputStyle:{
      'border': '1px solid #adadad',
      'height': '34px',
      'padding': '2px 7px',
      'borderRadius': '3px',
      'width': 'calc( 100% - 17px )'
    },
    suggestionStyle:{
      backgroundColor: '#ffffff', 
      cursor: 'pointer',
      width:'50%' ,
      'fontFamily': 'Open Sans , sans-serif',
      'fontSize': '17px',
      'fontWeight': '500',
    },
    suggestionActiveStyle:{
      backgroundColor: '#fafafa', 
      cursor: 'pointer',
      width:'50%',
      'fontFamily': 'Open Sans , sans-serif',
      'fontSize': '17px',
      'fontWeight': '500',
    },
    suggestionContainer:{
      display: 'grid',
      'justifyItems':'center'
    }
  }
}

export default styles