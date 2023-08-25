// Aqui se pueden definir variables que se cargan solo cuando se ejecuta el proyecto compilado con el comando buildpdn
export const enviroment = {
  // indica si el ambiente es productivo, cuando es true se habilita la configuracion de angular para aplicaciones en producción
  production: true,
  context_path: 'productos',
  days_for_review: 365,
  urlBase: 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros',
  path: 'bp',
  context: 'products',
  idVerify: '/verification',
  authorId: '2'
}