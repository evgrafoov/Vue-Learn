import axios from 'axios'
import { urlToBack } from '@/shared/environment'

export async function getData () {
  const { data } = await axios.get(urlToBack + '.json')
  if (data) {
    return Object.keys(data).map(key => {
      return {
        idTaskInDb: key,
        id: data[key].id,
        title: data[key].title,
        status: data[key].status,
        deadLine: data[key].deadLine,
        description: data[key].description
      }
    })
  }
  return null
}

export async function pushTask (data) {
  await axios.post(urlToBack + '.json', data)
    .catch(error => console.error(error))
}

export async function putData (task) {
  await axios.put(urlToBack + '/' + task.idTaskInDb + '.json', task)
    .catch(error => console.error(error))
}
