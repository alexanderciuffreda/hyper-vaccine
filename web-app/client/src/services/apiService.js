import Api from '@/services/api'
export default{
    queryAll() {
        return Api().get('queryAll')
      },
}