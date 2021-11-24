const Router = require("express");
const Event = require("../models/event");

const router = Router();

router.post("/event", (req, res) => {
  Event.findOne({ name: req.body.name }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("Event Already Exists");
    if (!doc) {
      const newEvent = new Event({
        name: req.body.name,
        location: req.body.location,
        info: req.body.info,
        event_pay: req.body.event_pay,
        date: req.body.date,
        user: req.body.user,
      });
      await newEvent.save();
      res.send("Event Created");
    }
  });
});

router.get("/event", (req, res) => {
  Event.findOne({ name: req.body.name }, (err, doc) => {
    if (err) throw err;
    res.send(doc);
  });
});

router.get("/eventsAll", async (req,res)=> {
  var parametro = req.body.parametro; 
  var nombre, lugar, info; 
  var response = await Event.find(); //Aqui se piden todos los datos de la base de datos

  //Aqui se compara el paremetro de busqueda con los tres principales parametros de cada evento con el fin de encontrar lo que le cliente busca
  nombre = response.filter(evento => {return evento.name.includes(parametro)}); 
  lugar = response.filter(evento => {return evento.location.includes(parametro)}); 
  info = response.filter(evento => {if (evento.info && evento.info.description)return evento.info.description.includes(parametro)})

  var resultado = nombre.concat(lugar.concat(info)); 

  function removeDuplicates(inArray){ // esta función elimina los duplicados
    var arr = inArray.concat() 
    for(var i=0; i<arr.length; ++i) { 
        for(var j=i+1; j<arr.length; ++j) { 
            if(arr[i].id === arr[j].id) {
                arr.splice(j, 1); 
            }
        }
    }
    return arr;
}

  resultado = removeDuplicates(resultado); 
  if (resultado.length === 0) res.status(400).send("Evento no encontrado") // Si no se encontro nada devuelve un status 400, no se si es el mas indicado, corrigan si se saben el indicado. 
  else res.json(resultado)
})

module.exports = router;
