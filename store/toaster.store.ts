import { defineStore } from 'pinia'
import { visible } from 'ansi-colors'

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
    contentClass: 'top-0'
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
      this.toast(message, 'mdi-check', timeout, 'success', 'top-0 bg-green')
    },
    error(message: string, timeout: number) {
      this.toast(message, 'mdi-cancel', timeout, 'success', 'top-0 bg-red')
    }

  }
})