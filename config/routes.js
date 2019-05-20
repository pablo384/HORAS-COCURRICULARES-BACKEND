/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //USER
  'DELETE /api/v1/user': { action: 'user/delete' },
  'GET /api/v1/user/getall': { action: 'user/getall' },
  'GET /api/v1/user/getbyid': { action: 'user/getbyid' },
  'PATCH /api/v1/user': { action: 'user/update' },
  'POST /api/v1/user/signin': { action: 'user/register' },
  'POST /api/v1/user/login': { action: 'user/login' },
  // CUATRIMESTRES
  'POST /api/v1/cuatrimestre': { action: 'cuatrimestre/create' },
  'PATCH /api/v1/cuatrimestre': { action: 'cuatrimestre/update' },
  'DELETE /api/v1/cuatrimestre': { action: 'cuatrimestre/delete' },
  'GET /api/v1/cuatrimestre': { action: 'cuatrimestre/getall' },
  'GET /api/v1/cuatrimestre/byId': { action: 'cuatrimestre/getbyid' },
  // CARRERAS
  'POST /api/v1/carrera': { action: 'carrera/create' },
  'PATCH /api/v1/carrera': { action: 'carrera/update' },
  'DELETE /api/v1/carrera': { action: 'carrera/delete' },
  'GET /api/v1/carrera': { action: 'carrera/getall' },
  // CONFERENCIA 
  'GET /api/v1/conferencia/getbycuatrimestre': { action: 'conferencia/getbycuatrimestre' },
  'GET /api/v1/conferencia/para_hoy': { action: 'conferencia/gettoday' },
  'POST /api/v1/conferencia': { action: 'conferencia/create' },
  'PATCH /api/v1/conferencia': { action: 'conferencia/update' },
  'DELETE /api/v1/conferencia': { action: 'conferencia/delete' },
  'DELETE /api/v1/conferencia/finalizar': { action: 'conferencia/finalize' },
  'GET /api/v1/conferencia': { action: 'conferencia/getall' },
  'GET /api/v1/conferencia/byId': { action: 'conferencia/getbyid' },
  'GET /api/v1/conferencia/report-asistencia-por-conferencia': { action: 'conferencia/report-asistencia-por-conferencia' },

  // ASISTENCIA
  'GET /api/v1/asistencia/verificarParticipacion': { action: 'asistencia/verificarparticipacion' },
  'GET /api/v1/asistencia/ponche': { action: 'asistencia/ponche' },
  // REPORTE
  'GET /api/v1/reporte/reporte-estudiantes': { action: 'reporte/reporte-estudiantes' },
  // 'GET /api/v1/asistencia/ponche': { action: 'asistencia/ponche' },

  // PERSONA
  'POST /api/v1/persona': { action: 'persona/create' },
  'PATCH /api/v1/persona': { action: 'persona/update' },
  'DELETE /api/v1/persona': { action: 'persona/delete' },
  'GET /api/v1/persona': { action: 'persona/getall' },
  'GET /api/v1/persona/getbyconferencia': { action: 'persona/getbyconferencia' },
  'GET /api/v1/persona/byId': { action: 'persona/getbyid' },
  'GET /api/v1/persona/getconferenciasparticipadas': { action: 'persona/getconferenciasparticipadas' },
};
