export default (pascalName: string) => `
import { action, makeAutoObservable } from 'mobx'
import api from 'src/api/cost'

export default class ${pascalName}Store {
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this)
  }

  // 获取订单
  // @action
  // getOrders = () => {
  //   this.loading = true;
  //   api.getOrders().then(res => {
  //   }).finally(() => {
  //     this.loading = false;
  //   })
  // }
}
`;
