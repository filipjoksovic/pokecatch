import { defineStore } from 'pinia'

export type ToastMessageType = 'success' | 'error' | 'warning' | 'info'

export interface IToasterStore {
  visible: boolean;
  message: string;
  icon: string;
  timeout: number;
  type: ToastMessageType,
  contentClass: string // fix for content-class and :content-class clashing bindings
}


export const useToasterStore = defineStore('toaster', {
  state: (): IToasterStore => ({
    visible: false,
    message: '',
    icon: '',
    timeout: 0,
    type: 'info',
    contentClass: 'position-top'
  }),

  actions: {
    toast(message: string, icon: string, timeout: number, type: ToastMessageType, contentClass: string) {
      this.message = message
      this.icon = icon
      this.timeout = timeout
      this.type = type
      this.visible = true
      this.contentClass = contentClass
    },
    success(message: string, timeout: number) {
      this.toast(message, 'mdi-check', timeout, 'success', 'position-top bg-green')
    },
    error(message: string, timeout: number) {
      this.toast(message, 'mdi-cancel', timeout, 'error', 'position-top bg-red')
    }

  }
})