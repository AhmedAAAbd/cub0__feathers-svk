export const logRuntime = async (context, next) => {
  console.log('Ahmed is here', context)
  console.log(`Running hook log-runtime on ${context.path}.${context.method}`)
  await next()
}
