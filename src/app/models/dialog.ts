export interface Dialog {
  title: string,
  content: string,
}

export interface DialogConfirm extends Dialog {
  cancelLabel: string,
  confirmLabel: string
}
