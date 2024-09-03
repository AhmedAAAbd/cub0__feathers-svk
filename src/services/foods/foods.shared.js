export const foodPath = 'foods'

export const foodMethods = ['find', 'get', 'create', 'patch', 'remove']

export const foodClient = (client) => {
  const connection = client.get('connection')

  client.use(foodPath, connection.service(foodPath), {
    methods: foodMethods
  })
}
