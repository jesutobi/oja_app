import { ref } from 'vue'
import moment from 'moment'

export function useFormatDate() {
  const formatDate = (value) => {
    return moment(value).format('MMMM Do YYYY')
  }
  const formatTime = (value) => {
    return moment(value).format('h:mm')
  }
  return { formatTime, formatDate }
}
